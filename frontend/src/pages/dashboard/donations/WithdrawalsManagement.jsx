import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getFundMovements,
  updateFundMovement,
  printFundMovement,
} from "../../../api/donations/donationApi";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return `GH₵ ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDateTime = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString();
};

const WithdrawalsManagement = () => {
  const queryClient = useQueryClient();

  const { data: movementsData, isLoading, error } = useQuery({
    queryKey: ["fundMovements"],
    queryFn: getFundMovements,
    staleTime: 1000,
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ amount: "", reason: "" });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateFundMovement(id, data),
    onSuccess: () => {
      toast.success("Withdrawal updated.");
      queryClient.invalidateQueries({ queryKey: ["fundMovements"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Unable to update withdrawal.");
    },
  });

  const handleEdit = (movement) => {
    setEditingId(movement.id);
    setEditForm({ amount: movement.amount, reason: movement.reason || "" });
  };

  const handleSave = (id) => {
    updateMutation.mutate({ id, data: { amount: Number(editForm.amount), reason: editForm.reason } });
    setEditingId(null);
  };

  const handlePrint = async (id) => {
    try {
      const res = await printFundMovement(id);
      const pos = res?.data?.pos || res?.data?.pos || res?.pos;
      const w = window.open('', '_blank');
      if (w) {
        w.document.write('<pre>' + (pos || '') + '</pre>');
        w.document.close();
        w.focus();
        w.print();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to print withdrawal.');
    }
  };

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorMessage message="Failed to load withdrawals." />;

  const movements = movementsData?.data || [];

  const now = Date.now();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Withdrawals</h1>
        <p className="text-sm text-gray-500">All withdrawal records. Edits allowed within 5 minutes.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Reason</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Recorded By</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {movements.map((m) => {
                const occurred = m.occurredAt || m.createdAt;
                const age = now - new Date(occurred).getTime();
                const editable = age <= 5 * 60 * 1000; // 5 minutes

                return (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-semibold text-red-600">
                      {editingId === m.id ? (
                        <input type="number" step="0.01" value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} className="w-24 border rounded px-2 py-1" />
                      ) : (
                        formatCurrency(m.amount)
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {editingId === m.id ? (
                        <input value={editForm.reason} onChange={(e) => setEditForm({ ...editForm, reason: e.target.value })} className="w-full border rounded px-2 py-1" />
                      ) : (
                        m.reason
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div>{m.initiatedBy || '—'}</div>
                      <div className="text-xs text-gray-500">{m.user?.email || ''}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{formatDateTime(occurred)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        {editingId === m.id ? (
                          <>
                            <button onClick={() => handleSave(m.id)} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
                            <button onClick={() => setEditingId(null)} className="px-3 py-1 border rounded">Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handlePrint(m.id)} className="px-3 py-1 border rounded">Print</button>
                            {editable ? (
                              <button onClick={() => handleEdit(m)} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
                            ) : (
                              <span className="text-xs text-gray-400">Locked</span>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalsManagement;

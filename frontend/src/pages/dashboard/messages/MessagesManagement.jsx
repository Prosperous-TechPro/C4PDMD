import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MessagesManagement = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Messages</h1>
            <p className="text-sm text-slate-500">Message management is ready for the next dashboard workflow.</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-lg font-medium text-slate-800">This page is ready for incoming messages and contact management.</p>
        <p className="mt-3 text-sm text-slate-500">The card action now routes here correctly from the dashboard overview.</p>
      </div>
    </div>
  );
};

export default MessagesManagement;

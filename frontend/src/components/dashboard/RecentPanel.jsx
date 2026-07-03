const RecentPanel = ({ title, items = [], loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 h-48 animate-pulse" />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border">
      <div className="px-6 py-4 border-b">
        <h3 className="font-semibold">{title}</h3>
      </div>

      <div className="p-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">No items found.</p>
        ) : (
          items.slice(0,5).map((it, idx) => (
            <div key={`${it.type}-${idx}`} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">{it.title}</p>
                <p className="text-xs text-gray-500">{it.type}</p>
              </div>
              <div className="text-xs text-gray-400">{new Date(it.createdAt).toLocaleDateString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentPanel;

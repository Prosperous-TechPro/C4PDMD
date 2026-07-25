import { useEffect, useState } from "react";

const OfflineNotice = () => {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!offline) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-[#111827] text-white shadow-lg">
      <div className="app-container flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
        <p className="font-semibold">Offline Mode</p>
        <span className="text-slate-300">You are currently offline. Some content may be unavailable, but cached pages will still work.</span>
      </div>
    </div>
  );
};

export default OfflineNotice;

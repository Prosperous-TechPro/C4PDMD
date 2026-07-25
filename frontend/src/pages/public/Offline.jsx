import { Link } from "react-router-dom";

const Offline = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="app-container flex min-h-screen flex-col items-center justify-center text-center py-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/40">
          <h1 className="mb-4 text-4xl font-semibold text-white">You are offline</h1>
          <p className="mb-6 max-w-xl text-slate-300">
            The app is currently unavailable because your network connection is lost. Cached pages and assets may still work.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="rounded-full bg-[#0057B8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#003f8a]"
            >
              Return home
            </Link>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full border border-slate-700 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offline;

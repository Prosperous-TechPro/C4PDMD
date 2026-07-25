import { usePWAInstall } from "../../hooks/usePWAInstall";

const InstallAppButton = () => {
  const {
    isInstallable,
    isInstalled,
    promptInstall,
    showIosInstructions,
    showGenericInstructions,
    hideInstallInstructions,
  } = usePWAInstall();

  if (!isInstallable || isInstalled) {
    return null;
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={promptInstall}
        className="inline-flex items-center justify-center rounded-full bg-[#0057B8] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#003f8a]"
      >
        Install App
      </button>

      {showIosInstructions && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 shadow-sm">
          <p className="font-semibold">Install on iOS</p>
          <p className="mt-2 text-slate-600">
            Tap the share button, then select <span className="font-semibold">Add to Home Screen</span>.
          </p>
          <button
            type="button"
            onClick={hideInstallInstructions}
            className="mt-3 inline-flex rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Dismiss
          </button>
        </div>
      )}

      {showGenericInstructions && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 shadow-sm">
          <p className="font-semibold">Install the app</p>
          <p className="mt-2 text-slate-600">
            Use your browser menu and choose <span className="font-semibold">Install</span> or <span className="font-semibold">Add to Home Screen</span>.
          </p>
          <button
            type="button"
            onClick={hideInstallInstructions}
            className="mt-3 inline-flex rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default InstallAppButton;

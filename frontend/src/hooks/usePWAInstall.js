import { useEffect, useState } from "react";

const isIos = () => {
  if (typeof window === "undefined") return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
};

const isInStandaloneMode = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
};

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);
  const [showGenericInstructions, setShowGenericInstructions] = useState(false);

  useEffect(() => {
    const standaloneMode = isInStandaloneMode();
    const safariIos = isIos();

    if (standaloneMode) {
      setIsInstalled(true);
      setIsInstallable(false);
      return;
    }

    if (safariIos) {
      setIsInstallable(true);
    } else if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      setIsInstallable(true);
    }

    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    const onAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowIosInstructions(false);
      setShowGenericInstructions(false);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (isInstalled) {
      return { status: "already-installed" };
    }

    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
          setIsInstalled(true);
          setIsInstallable(false);
          setDeferredPrompt(null);
          setShowIosInstructions(false);
          setShowGenericInstructions(false);
          return { status: "accepted" };
        }

        setDeferredPrompt(null);
        return { status: "dismissed" };
      } catch (err) {
        setDeferredPrompt(null);
        return { status: "error", error: err };
      }
    }

    if (isIos()) {
      setShowIosInstructions(true);
      return { status: "ios" };
    }

    setShowGenericInstructions(true);
    return { status: "no-prompt" };
  };

  const hideInstallInstructions = () => {
    setShowIosInstructions(false);
    setShowGenericInstructions(false);
  };

  return {
    isInstallable,
    isInstalled,
    promptInstall,
    showIosInstructions,
    showGenericInstructions,
    hideInstallInstructions,
  };
};

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Gift, HandHeart, X } from "lucide-react";

const STORAGE_KEY = "floatingDonateWidgetDismissed";

const FloatingDonateWidget = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoDisabled, setAutoDisabled] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY) === "true";
    setAutoDisabled(dismissed);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || autoDisabled) return;

    const handleScroll = () => {
      if (isExpanded) return;

      const scrollPosition = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = totalHeight > 0 ? scrollPosition / totalHeight : 0;

      if (percent > 0.25) {
        setIsExpanded(true);
      }
    };

    const timer = window.setTimeout(() => {
      setIsExpanded(true);
    }, 10000);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [autoDisabled, isExpanded, isReady]);

  const handleMaybeLater = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setAutoDisabled(true);
    setIsExpanded(false);
  };

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const hidePanelOnDonate = location.pathname === "/donate";
  const showPanel = isExpanded && !hidePanelOnDonate;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-end justify-end">
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="hidden md:block max-w-sm w-full bg-blue-700 border border-white/15 shadow-2xl shadow-black/20 rounded-3xl overflow-hidden"
            role="region"
            aria-label="Donation prompt"
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-yellow-200 font-semibold mb-3">
                    Support our mission
                  </p>
                  <h2 className="text-xl text-white font-bold leading-tight">
                    Help us transform lives. Donate today.
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleMaybeLater}
                  className="text-white/70 hover:text-white transition rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Dismiss donation prompt"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="mt-4 text-sm text-blue-100 leading-6">
                Your contribution helps fund education, research, and community development.
              </p>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center justify-center text-yellow-300">
                    <Heart size={18} />
                    <span className="text-xs mt-2">Care</span>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center justify-center text-yellow-300">
                    <Gift size={18} />
                    <span className="text-xs mt-2">Impact</span>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 flex flex-col items-center justify-center text-yellow-300">
                    <HandHeart size={18} />
                    <span className="text-xs mt-2">Hope</span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    to="/donate"
                    className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 text-blue-900 font-semibold px-4 py-3 shadow-lg shadow-yellow-400/20 hover:bg-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-yellow-200"
                    aria-label="Donate now"
                  >
                    Donate Now
                  </Link>
                  <button
                    type="button"
                    onClick={handleMaybeLater}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white px-4 py-3 font-medium hover:bg-white/15 transition focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Maybe later"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleToggle}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex items-center gap-3 bg-blue-700 text-white rounded-full shadow-2xl shadow-black/20 border border-white/20 px-4 py-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-blue-700"
        aria-label={isExpanded ? "Collapse donation widget" : "Open donation widget"}
        aria-expanded={isExpanded}
      >
        <Heart size={20} className="text-yellow-300" />
        <span className="hidden sm:inline-flex font-semibold">Donate</span>
      </motion.button>
    </div>
  );
};

export default FloatingDonateWidget;

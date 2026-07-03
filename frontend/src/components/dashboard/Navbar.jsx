/**
 * =====================================================
 * DASHBOARD NAVBAR
 * =====================================================
 */

import { useAuth } from "../../contexts/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,39,71,0.08)]">
      <div className="app-container h-20 flex items-center gap-4">
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-full border border-[var(--border)] p-2 text-[var(--text)] transition hover:border-[var(--primary)] hover:bg-[rgba(17,77,134,0.06)]"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex items-center gap-3">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-12 h-12 rounded-2xl object-cover border border-[var(--border)]"
            />
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[rgba(17,77,134,0.2)]">
              {user?.initials || "U"}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--text)]">{user?.displayName || "C4PDMD NGO Admin"}</p>
            <p className="text-xs text-[var(--text-muted)] truncate">
              {user?.role || "Administrator"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

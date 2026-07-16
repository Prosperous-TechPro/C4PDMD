/**
 * =====================================================
 * PROFESSIONAL C4PDMD NAVBAR
 * =====================================================
 */

import {
  Link,
} from "react-router-dom";

import {
  Menu,
  X,
  User,
} from "lucide-react";

const Navbar = ({ toggleMenu, mobileOpen }) => {

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">

      <div className="app-container h-20 flex items-center justify-between gap-4">

          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logos/logo.jpeg"
              alt="C4PDMD Logo"
              className="w-12 h-12 rounded-2xl object-cover border border-[var(--border)]"
            />

            <div>
              <h1 className="font-bold text-xl text-[var(--text)]">C4PDMD</h1>
              <p className="text-xs text-[var(--text-muted)]">Center for Prim-Data Measurement & Development</p>
            </div>
          </Link>

          {/* Menu Button */}

          <button
            aria-label={mobileOpen ? "Close navigation drawer" : "Open navigation drawer"}
            aria-expanded={mobileOpen}
            onClick={toggleMenu}
            className="rounded-full border border-[var(--border)] p-2 text-[var(--text)] transition hover:border-[var(--primary)] hover:bg-[rgba(17,77,134,0.06)]"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

      </div>

    </header>
  );
};

export default Navbar;
/**
 * =====================================================
 * PUBLIC LAYOUT
 * =====================================================
 * Professional Public Website Layout
 * =====================================================
 */

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MobileMenu from "../components/layout/MobileMenu";
import FloatingDonateWidget from "../components/layout/FloatingDonateWidget";

const PublicLayout = () => {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow =
      menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (

    <div className="app-page flex min-h-screen flex-col overflow-x-hidden text-[var(--text)]">

      {/* Navbar */}

      <Navbar
        toggleMenu={toggleMenu}
        mobileOpen={menuOpen}
      />

      {/* Mobile Navigation */}

      <MobileMenu
        isOpen={menuOpen}
        closeMenu={closeMenu}
      />

      {/* Main Content */}

      <main className="app-shell flex-1 pt-20">

        <Outlet />

      </main>

      <FloatingDonateWidget />

      {/* Footer */}

      <Footer />

    </div>

  );

};

export default PublicLayout;
/**
 * =====================================================
 * MOBILE MENU
 * =====================================================
 * Professional NGO Mobile Navigation
 * =====================================================
 */

import { Link } from "react-router-dom";

import {
  X,
  Home,
  Info,
  Briefcase,
  FolderKanban,
  Users,
  Newspaper,
  Image,
  Mail,
  HeartHandshake,
  CircleDollarSign,
  User,
  Handshake,
  MessageCircle,
  Heart,
  Phone,
} from "lucide-react";

const menuItems = [
  {
    title: "About",
    path: "/about",
    icon: Info,
  },
  {
    title: "Blog",
    path: "/blog",
    icon: Newspaper,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: Mail,
  },
  {
    title: "Gallery",
    path: "/gallery",
    icon: Image,
  },
  {
    title: "Home",
    path: "/",
    icon: Home,
  },
  {
    title: "Login",
    path: "/login",
    icon: User,
  },
  {
    title: "Partners",
    path: "/partners",
    icon: Handshake,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Services",
    path: "/services",
    icon: Briefcase,
  },
  {
    title: "Team",
    path: "/team",
    icon: Users,
  },
  {
    title: "Testimonials",
    path: "/testimonials",
    icon: MessageCircle,
  },
  {
    title: "Volunteer",
    path: "/volunteer",
    icon: HeartHandshake,
  },
];

const MobileMenu = ({
  isOpen,
  closeMenu,
}) => {

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}

      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeMenu}
      />

      {/* Sidebar */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="
          fixed
          top-0
          right-0
          w-full
          max-w-xs
          h-screen
          bg-[var(--surface)]
          shadow-[var(--shadow-strong)]
          z-50
          flex
          flex-col
          overflow-hidden
        "
      >

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">

          <div>

            <h2 className="text-xl font-bold text-[var(--primary)]">
              C4PDMD
            </h2>

            <p className="text-sm text-[var(--text-muted)]">
              Navigation
            </p>

          </div>

          <button
            onClick={closeMenu}
            className="rounded-full p-2 text-[var(--text)] hover:bg-[rgba(17,77,134,0.08)]"
          >
            <X size={28} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 py-5 overflow-y-auto">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className="
                  flex
                  items-center
                  gap-4
                  px-6
                  py-4
                  text-[var(--text)]
                  hover:bg-[rgba(17,77,134,0.06)]
                  hover:text-[var(--primary)]
                  transition
                "
              >

                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>

              </Link>

            );

          })}

        </nav>

        {/* Action Buttons */}

        <div className="border-t border-[var(--border)] p-6 space-y-3">

          {/* Donate Button */}
          <Link
            to="/donate"
            onClick={closeMenu}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              bg-[var(--primary)]
              text-white
              px-4
              py-3
              rounded-lg
              font-semibold
              hover:bg-[rgba(17,77,134,0.9)]
              transition
            "
          >
            <Heart size={18} />
            Donate Now
          </Link>

          {/* Contact Button */}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              border-2
              border-[var(--primary)]
              text-[var(--primary)]
              px-4
              py-3
              rounded-lg
              font-semibold
              hover:bg-[rgba(17,77,134,0.06)]
              transition
            "
          >
            <Phone size={18} />
            Get in Touch
          </Link>

        </div>


      </aside>

    </>
  );

};

export default MobileMenu;

/**
 * =====================================================
 * DASHBOARD SIDEBAR
 * =====================================================
 */

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import {
  LayoutDashboard,
  Users,
  Briefcase,
  FolderKanban,
  Newspaper,
  Image,
  Handshake,
  MessageSquareQuote,
  HeartHandshake,
  CircleDollarSign,
  Mail,
  UserCog,
  Building2,
  LogOut,
} from "lucide-react";

const menuSections = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        icon: Users,
        path: "/dashboard/users",
        roles: ["Admin"],
      },
      {
        title: "Team",
        icon: Users,
        path: "/dashboard/team",
        roles: ["Admin", "Editor"],
      },
      {
        title: "Services",
        icon: Briefcase,
        path: "/dashboard/services",
        roles: ["Admin", "Editor"],
      },
      {
        title: "Projects",
        icon: FolderKanban,
        path: "/dashboard/projects",
        roles: ["Admin", "Editor"],
      },
      {
        title: "Blog",
        icon: Newspaper,
        path: "/dashboard/blogs",
        roles: ["Admin", "Editor"],
      },
      {
        title: "Gallery",
        icon: Image,
        path: "/dashboard/gallery",
        roles: ["Admin", "Editor"],
      },
      {
        title: "Partners",
        icon: Handshake,
        path: "/dashboard/partners",
        roles: ["Admin", "Editor"],
      },
      {
        title: "Testimonials",
        icon: MessageSquareQuote,
        path: "/dashboard/testimonials",
        roles: ["Admin", "Editor"],
      },
      {
        title: "Volunteers",
        icon: HeartHandshake,
        path: "/dashboard/volunteers",
        roles: ["Admin", "Editor"],
      },
      {
        title: "Donations",
        icon: CircleDollarSign,
        path: "/dashboard/donations",
        roles: ["Admin", "Editor"],
      },
      {
        title: "Contact Messages",
        icon: Mail,
        path: "/dashboard/contacts",
        roles: ["Admin", "Editor"],
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Account Settings",
        icon: UserCog,
        path: "/dashboard/account",
      },
      {
        title: "Organization",
        icon: Building2,
        path: "/dashboard/organization-settings",
        roles: ["Admin"],
      },
    ],
  },
];

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isSidebarOpen = sidebarOpen ?? false;
  const closeSidebar = setSidebarOpen || (() => {});

  const filteredSections = menuSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (!item.roles || item.roles.length === 0) {
          return true;
        }

        if (user?.role === "SUPER_ADMIN") {
          return true;
        }

        return item.roles.includes(user?.role);
      }),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <aside
            className={`
              fixed
              top-0
              left-0
              z-40
              h-screen
              w-full
              max-w-xs
              md:w-[260px]
              bg-[var(--surface-strong)]
              text-white
              shadow-[var(--shadow-strong)]
              flex
              flex-col
              transform
              transition-all
              duration-300
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            aria-hidden={!isSidebarOpen}
          >

        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">

          <div>

            <h1 className="text-2xl font-bold">
              C4PDMD
            </h1>

            <p className="text-xs text-white/65">
              Admin Panel
            </p>

          </div>

        </div>

        <div className="px-6 py-6 border-b border-white/10">

          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border border-white/20"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[var(--primary)] flex items-center justify-center text-xl font-bold shadow-lg shadow-black/10">
              {user?.initials || "U"}
            </div>
          )}

          <h3 className="mt-4 font-semibold">
            {user?.displayName || "Administrator"}
          </h3>

          <p className="text-sm text-white/65">
            {user?.email || "admin@c4pdmd.org"}
          </p>

        </div>

        <nav className="py-4 overflow-y-auto flex-1">

          {filteredSections.map((section) => (
            <div
              key={section.title}
              className="mb-6"
            >
              <p className="px-6 mb-3 text-xs uppercase tracking-[0.24em] text-white/50">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => closeSidebar(false)}
                      className={({ isActive }) =>
                        `
                        flex
                        items-center
                        gap-3
                        px-6
                        py-3
                        rounded-r-full
                        transition-all
                        duration-200
                        ${
                          isActive
                            ? "bg-[var(--primary)] text-white shadow-lg"
                            : "text-white/75 hover:bg-white/10 hover:text-white"
                        }
                      `
                      }
                    >
                      <Icon size={18} />
                      <span className="font-medium truncate">
                        {item.title}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}

        </nav>

        <div className="p-6 border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              logout();
              closeSidebar(false);
              navigate("/login");
            }}
            className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>


      </aside>

    </>

  );

};

export default Sidebar;
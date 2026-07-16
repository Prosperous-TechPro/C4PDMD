import {
  Link,
} from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">

      <h2 className="text-xl font-bold mb-6">
        C4PDMD Admin
      </h2>

      <nav className="space-y-3">

        <Link
          to="/dashboard/blogs"
          className="block"
        >
          Blog
        </Link>

        <Link
          to="/dashboard/blogs/categories"
          className="block"
        >
          Blog Categories
        </Link>

        <Link
          to="/dashboard/contacts"
          className="block"
        >
          Contacts
        </Link>

        <Link
          to="/dashboard"
          className="block"
        >
          Dashboard
        </Link>

        <Link
          to="/dashboard/donations"
          className="block"
        >
          Donations
        </Link>

        <Link
          to="/dashboard/gallery"
          className="block"
        >
          Gallery
        </Link>

        <Link
          to="/dashboard/partners"
          className="block"
        >
          Partners
        </Link>

        <Link
          to="/dashboard/projects"
          className="block"
        >
          Projects
        </Link>

        <Link
          to="/dashboard/services"
          className="block"
        >
          Services
        </Link>

        <Link
          to="/dashboard/settings"
          className="block"
        >
          Settings
        </Link>

        <Link
          to="/dashboard/organization-settings"
          className="block"
        >
          Organization Settings
        </Link>

        <Link
          to="/dashboard/team"
          className="block"
        >
          Team
        </Link>

        <Link
          to="/dashboard/testimonials"
          className="block"
        >
          Testimonials
        </Link>

        <Link
          to="/dashboard/users"
          className="block"
        >
          Users
        </Link>

        <Link
          to="/dashboard/volunteers"
          className="block"
        >
          Volunteers
        </Link>

      </nav>

    </aside>
  );
};

export default Sidebar;
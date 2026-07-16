import {
  useAuth,
} from "../../contexts/AuthContext";

const DashboardNavbar = () => {

  const {
    user,
    logout,
  } = useAuth();

  return (
    <div className="bg-white shadow p-4 flex justify-between">

      <h2>
        Admin Dashboard
      </h2>

      <div>

        <span className="mr-4">
          {user?.name}
        </span>

        <button
          onClick={() => {
            const confirmed = window.confirm(
              "Do you want to logout?"
            );
            if (confirmed) {
              logout();
              window.location.href = "/login";
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default DashboardNavbar;
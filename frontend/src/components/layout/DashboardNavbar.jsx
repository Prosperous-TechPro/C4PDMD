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
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default DashboardNavbar;
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyRegistrationOtp } from "../../api/auth/authApi";
import { useAuth } from "../../contexts/AuthContext";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: initialEmail,
    otp: "",
  });

  const mutation = useMutation({
    mutationFn: verifyRegistrationOtp,
    onSuccess: (data) => {
      toast.success("Account verified successfully.");

      if (data?.accessToken && data?.user) {
        login(data.user, data.accessToken, data.refreshToken);
        navigate("/dashboard");
        return;
      }

      navigate("/login");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Unable to verify account.");
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">
        <h1 className="text-3xl font-bold text-center">Verify Account</h1>
        <p className="text-gray-500 mt-2 text-center">Enter the OTP sent to your Hubtel phone number.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border rounded-lg p-3"
            required
          />
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="Verification Code"
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {mutation.isPending ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          Back to <Link to="/login" className="text-blue-600 hover:underline">login</Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyAccount;
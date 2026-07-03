import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resetPassword } from "../../api/auth/authApi";
import { strongPasswordMessage, validateStrongPassword } from "../../utils/passwordRules";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    email: emailFromUrl,
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success("Password reset successfully.");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Unable to reset password.");
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.otp) {
      toast.error("Email and OTP are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const passwordCheck = validateStrongPassword(formData.password);
    if (passwordCheck !== true) {
      toast.error(passwordCheck || strongPasswordMessage);
      return;
    }

    mutation.mutate({ email: formData.email, otp: formData.otp, password: formData.password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">
        <h1 className="text-3xl font-bold text-center">Reset Password</h1>
        <p className="text-gray-500 mt-2 text-center">Enter the SMS code sent to your registered phone number before changing your password.</p>

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
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full border rounded-lg p-3"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm New Password"
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {mutation.isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">Passwords must be at least 8 characters and include uppercase, lowercase, number, and special character.</p>
        <p className="text-sm text-center mt-6 text-gray-500">
          Back to <Link to="/login" className="text-blue-600 hover:underline">login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
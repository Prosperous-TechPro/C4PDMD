import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { forgotPassword } from "../../api/auth/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast.success("Verification code sent.");
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Unable to start password reset.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">
        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
        <p className="text-gray-500 mt-2 text-center">Enter your email to receive an SMS verification code.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {mutation.isPending ? "Sending..." : "Send Code"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          Remember your password? 
          <Link to="/login" className="text-blue-600 hover:underline bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-cyan-500"> 
           Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
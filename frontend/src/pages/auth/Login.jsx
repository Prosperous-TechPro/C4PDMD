/**
 * =====================================================
 * LOGIN PAGE
 * =====================================================
 */

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { loginUser } from "../../api/auth/authApi";

import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [passwordError, setPasswordError] =
    useState("");

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      setPasswordError("");

      login(
        response.user,
        response.accessToken,
        response.refreshToken
      );

      toast.success(
        "Login successful."
      );

      // Handle role/status-based redirects
      const user = response.user || {};
      const role = user.role;
      const status = user.status || "ACTIVE";
      const isVerified = user.isVerified || false;

      if (status === "PENDING") {
        toast("Your account is pending approval or verification.");
        return navigate("/verify-account");
      }

      if (["SUSPENDED", "REJECTED", "INACTIVE"].includes(status)) {
        toast.error("Your account is not active. Contact the administrator.");
        return navigate("/");
      }

      if (status === "ACTIVE" && role === "SUPER_ADMIN") {
        return navigate("/dashboard");
      }

      if (isVerified && ["Admin", "Editor"].includes(role)) {
        return navigate("/dashboard");
      }

      // Default: non-dashboard users go to homepage
      return navigate("/");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Invalid email or password."
;

      if (
        message
          .toLowerCase()
          .includes("incorrect password")
      ) {
        setPasswordError(
          "Incorrect password. Please enter the correct password and try again."
        );
        return;
      }

      toast.error(message);
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation.mutate({
      ...formData,
      rememberMe,
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_35%),linear-gradient(135deg,_#0f4c81_0%,_#0b2a4a_100%)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/20 bg-white/95 shadow-[0_30px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl lg:grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.25),_transparent_45%)]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-slate-100">
              <ShieldCheck size={16} />
              Secure NGO Administration
            </div>
            <h1 className="mt-8 text-4xl font-semibold leading-tight">
              Manage programs, people, and impact from one elegant workspace.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              Access dashboards, content, donors, and community operations in a unified admin experience built for C4PDMD.
            </p>
          </div>
          <div className="relative z-10 rounded-3xl border border-white/10 bg-white/10 p-5 text-sm text-slate-200">
            <p className="font-semibold text-white">Trusted by teams</p>
            <p className="mt-2 leading-6">From project oversight to volunteer coordination, everything stays in sync with live updates.</p>
          </div>
        </div>

        <div className="p-8 sm:p-10 lg:p-12">
          <div className="text-center">
            <Link 
              to="/"
              className="mx-auto inline-block hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logos/logo.jpeg" 
                alt="C4PDMD Logo" 
                className="h-16 w-16 rounded-2xl object-cover shadow-lg shadow-blue-500/30"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-semibold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">Sign in to continue to your dashboard.</p>
          </div>

          

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">Email address</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded-2xl border bg-white py-3 pl-11 pr-12 text-sm text-slate-700 outline-none transition focus:ring-4 ${passwordError ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {passwordError ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert" aria-live="polite">
                {passwordError}
              </p>
            ) : null}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>

              <Link to="/forgot-password" className="font-medium text-blue-500 hover:text-blue-700 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-cyan-500">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-800 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </button>

          </form>
          <div className="mt-8 rounded-2xl px-4 py-3 text-center text-sm text-slate-600">
            New here?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-cyan-500">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerUser } from "../../api/auth/authApi";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { strongPasswordMessage, validateStrongPassword } from "../../utils/passwordRules";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload) => registerUser(payload),
    onSuccess: (data) => {
      toast.success("Account created. Enter the OTP to activate your account.");
      navigate(`/verify-account?email=${encodeURIComponent(data?.user?.email || "")}`);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Registration failed");
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_35%),linear-gradient(135deg,_#0f4c81_0%,_#0b2a4a_100%)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/20 bg-white/95 shadow-[0_30px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl lg:grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.25),_transparent_45%)]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-slate-100">
              <ShieldCheck size={16} />
              Secure onboarding
            </div>
            <h1 className="mt-8 text-4xl font-semibold leading-tight">
              Create your admin account and start managing operations.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              Sign up quickly and gain access to the dashboard for users, content, projects, and communication workflows.
            </p>
          </div>
          <div className="relative z-10 rounded-3xl border border-white/10 bg-white/10 p-5 text-sm text-slate-200">
            <p className="font-semibold text-white">Fast, guided setup</p>
            <p className="mt-2 leading-6">Your account will be verified through OTP before full access is granted.</p>
          </div>
        </div>

        <div className="p-8 sm:p-10 lg:p-12">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-bold text-white shadow-lg shadow-blue-500/30">
              C4
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-slate-900">Create account</h2>
            <p className="mt-2 text-sm text-slate-500">Set up your administrator profile to access the system.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input {...register("firstName")} placeholder="First name" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              </div>
              <div>
                <input {...register("lastName")} placeholder="Last name" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              </div>
            </div>

            <div>
              <input {...register("phoneNumber", { required: "Phone number is required" })} placeholder="Phone number" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <input {...register("email", { required: "Email is required", pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email" } })} placeholder="Email address" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <input type={showPassword ? "text" : "password"} {...register("password", { required: "Password required", validate: validateStrongPassword })} placeholder="Password" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

           <div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    {...register("confirmPassword", {
      required: "Please confirm password",
      validate: (v) => v === watch("password") || "Passwords do not match",
    })}
    placeholder="Confirm password"
   className={`w-full rounded-2xl bg-white px-4 py-3 pr-12 text-sm text-slate-700 outline-none transition focus:ring-4 ${
  errors.confirmPassword
    ? "border border-red-500 focus:border-red-500 focus:ring-red-100"
    : "border border-slate-200 focus:border-blue-500 focus:ring-blue-100"
}`}
  />

  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
  >
    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>

  {errors.confirmPassword && (
    <p className="mt-1 text-sm text-red-600">
      {errors.confirmPassword.message}
    </p>
  )}
</div>

            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-500">{strongPasswordMessage}</p>

            <button type="submit" disabled={mutation.isPending} className="w-full rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-800 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-70">
              {mutation.isPending ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-cyan-500">
            Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

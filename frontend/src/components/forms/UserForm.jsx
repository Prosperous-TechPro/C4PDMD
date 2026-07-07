import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";

import { getRoles } from "../../api/users/userApi";
import { strongPasswordMessage, validateStrongPassword } from "../../utils/passwordRules";

const UserForm = ({ onSubmit = () => {}, initialData = null, loading = false }) => {
  const isEdit = Boolean(initialData && initialData.id);
  const [showPassword, setShowPassword] = useState(false);

  const { data: rolesData } = useQuery({ queryKey: ["roles"], queryFn: getRoles, enabled: true });

  const roles = rolesData?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        password: "",
        roleId: initialData.role?.id || initialData.roleId || "",
        status: initialData.status || "ACTIVE",
      });
    }
  }, [initialData, reset]);

  const submit = (values) => {
    // For edit: omit empty password
    if (isEdit && (!values.password || values.password.trim() === "")) {
      const rest = { ...values };
      delete rest.password;
      onSubmit(rest);
    } else {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="bg-white p-6 rounded-xl shadow border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input {...register("firstName", { required: "First name is required" })} className="mt-1 w-full border rounded p-2" />
          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input {...register("lastName", { required: "Last name is required" })} className="mt-1 w-full border rounded p-2" />
          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })} className="mt-1 w-full border rounded p-2" />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password {isEdit && <span className="text-gray-500 text-sm">(leave blank to keep current)</span>}</label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { validate: validateStrongPassword })}
              className="w-full border rounded p-2 pr-10"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          <p className="text-xs text-gray-500 mt-1">{strongPasswordMessage}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select {...register("roleId", { required: "Role is required" })} className="mt-1 w-full border rounded p-2">
            <option value="">Select role</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          {errors.roleId && <p className="text-red-600 text-sm mt-1">{errors.roleId.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select {...register("status")} className="mt-1 w-full border rounded p-2">
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? "Saving..." : isEdit ? "Update User" : "Create User"}</button>
        <button type="button" onClick={() => reset()} className="bg-gray-100 px-4 py-2 rounded">Reset</button>
      </div>
    </form>
  );
};

export default UserForm;

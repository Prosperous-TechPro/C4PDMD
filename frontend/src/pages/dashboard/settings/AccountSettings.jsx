/**
 * =====================================================
 * ACCOUNT SETTINGS
 * =====================================================
 * Manage Administrator Account
 * =====================================================
 */

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useAuth } from "../../../contexts/AuthContext";
import { updateCurrentUser } from "../../../api/auth/authApi";
import ImageUpload from "../../../components/forms/ImageUpload";
import { strongPasswordMessage, validateStrongPassword } from "../../../utils/passwordRules";

const AccountSettings = () => {

  const { user, logout, setUser, refreshUser } =
    useAuth();

  const [profile, setProfile] =
    useState({
      firstName:
        user?.firstName || "",

      lastName:
        user?.lastName || "",

      email:
        user?.email || "",

      phoneNumber:
        user?.phoneNumber || "",

      profileImageUrl:
        user?.profileImageUrl || "",

      coverImageUrl:
        user?.coverImageUrl || "",
    });

  useEffect(() => {
    setProfile({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      profileImageUrl: user?.profileImageUrl || "",
      coverImageUrl: user?.coverImageUrl || "",
    });
  }, [user]);

  const [passwordData,
    setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  /**
   * ======================================
   * PROFILE
   * ======================================
   */

  const handleProfileChange = (
    e
  ) => {

    setProfile({

      ...profile,

      [e.target.name]:
        e.target.value,

    });

  };

  const profileMutation = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: async (response) => {
      const updatedUser = response?.data?.data || response?.data || response?.user || null;

      if (updatedUser) {
        const mergedUser = {
          ...(user || {}),
          ...updatedUser,
        };

        setUser(mergedUser);
      }

      try {
        const refreshedUser = await refreshUser();
        if (refreshedUser) {
          setUser(refreshedUser);
        }
      } catch (error) {
        // ignore refresh failures and keep the latest local update
      }

      if (response?.accessToken) {
        localStorage.setItem("token", response.accessToken);
      }

      if (response?.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }

      toast.success("Profile updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile.");
    },
  });

  /**
   * ======================================
   * PASSWORD
   * ======================================
   */

  const handlePasswordChange = (
    e
  ) => {

    setPasswordData({

      ...passwordData,

      [e.target.name]:
        e.target.value,

    });

  };

  /**
   * ======================================
   * SAVE PROFILE
   * ======================================
   */

  const updateProfile = (
    e
  ) => {

    e.preventDefault();

    profileMutation.mutate(profile);

  };

  /**
   * ======================================
   * CHANGE PASSWORD
   * ======================================
   */

  const changePassword = (
    e
  ) => {

    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {

      toast.error(
        "Passwords do not match."
      );

      return;

    }

    const passwordCheck = validateStrongPassword(passwordData.newPassword);
    if (passwordCheck !== true) {
      toast.error(passwordCheck || strongPasswordMessage);
      return;
    }

    if (!passwordData.currentPassword) {
      toast.error("Current password is required.");
      return;
    }

    profileMutation.mutate({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    setPasswordData({

      currentPassword: "",

      newPassword: "",

      confirmPassword: "",

    });

  };

  /**
   * ======================================
   * LOGOUT
   * ======================================
   */

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Do you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    logout();

    toast.success(
      "Logged out successfully."
    );

    window.location.href =
      "/login";
  };

  return (

    <div className="max-w-5xl mx-auto p-6 space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Account Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your administrator account.
        </p>

      </div>

      {/* Profile */}

      <div className="bg-white rounded-xl shadow border p-6">

        <h2 className="text-xl font-semibold mb-6">
          Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <div className="rounded-2xl border bg-slate-50 p-4 space-y-3">

            <p className="text-sm font-medium text-slate-700">Profile Picture</p>

            <ImageUpload
              onUploadSuccess={(url) =>
                setProfile({
                  ...profile,
                  profileImageUrl: url,
                })
              }
            />

            {profile.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-slate-800 text-white flex items-center justify-center text-3xl font-semibold border">
                {user?.initials || "U"}
              </div>
            )}

          </div>

          <div className="rounded-2xl border bg-slate-50 p-4 space-y-3">

            <p className="text-sm font-medium text-slate-700">Cover Picture</p>

            <ImageUpload
              onUploadSuccess={(url) =>
                setProfile({
                  ...profile,
                  coverImageUrl: url,
                })
              }
            />

            {profile.coverImageUrl && (
              <img
                src={profile.coverImageUrl}
                alt="Cover"
                className="w-full h-32 rounded-xl object-cover border"
              />
            )}

          </div>

        </div>

        <form
          onSubmit={updateProfile}
          className="space-y-5"
        >

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={
                handleProfileChange
              }
              placeholder="First Name"
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={
                handleProfileChange
              }
              placeholder="Last Name"
              className="border rounded-lg p-3"
            />

          </div>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={
              handleProfileChange
            }
            placeholder="Email"
            className="border rounded-lg p-3 w-full"
          />

          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleProfileChange}
            placeholder="Phone Number"
            className="border rounded-lg p-3 w-full"
          />

          <input
            type="hidden"
            name="profileImageUrl"
            value={profile.profileImageUrl}
          />

          <input
            type="hidden"
            name="coverImageUrl"
            value={profile.coverImageUrl}
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            disabled={profileMutation.isPending}
          >
            {profileMutation.isPending ? "Saving..." : "Save Profile"}
          </button>

        </form>

      </div>

      {/* Password */}

      <div className="bg-white rounded-xl shadow border p-6">

        <h2 className="text-xl font-semibold mb-6">
          Change Password
        </h2>

        <form
          onSubmit={
            changePassword
          }
          className="space-y-5"
        >

          <input
            type="password"
            name="currentPassword"
            value={
              passwordData.currentPassword
            }
            onChange={
              handlePasswordChange
            }
            placeholder="Current Password"
            className="border rounded-lg p-3 w-full"
          />

          <input
            type="password"
            name="newPassword"
            value={
              passwordData.newPassword
            }
            onChange={
              handlePasswordChange
            }
            placeholder="New Password"
            className="border rounded-lg p-3 w-full"
          />

          <p className="text-xs text-gray-500">{strongPasswordMessage}</p>

          <input
            type="password"
            name="confirmPassword"
            value={
              passwordData.confirmPassword
            }
            onChange={
              handlePasswordChange
            }
            placeholder="Confirm Password"
            className="border rounded-lg p-3 w-full"
          />

          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Change Password
          </button>

        </form>

      </div>

      {/* Account */}

      <div className="bg-white rounded-xl shadow border p-6">

        <h2 className="text-xl font-semibold mb-4">
          Account
        </h2>

        <button
          onClick={
            handleLogout
          }
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>

  );

};

export default AccountSettings;
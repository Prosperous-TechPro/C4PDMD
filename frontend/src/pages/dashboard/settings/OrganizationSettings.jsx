/**
 * =====================================================
 * ORGANIZATION SETTINGS
 * =====================================================
 * Manage Organization Information
 
 * =====================================================
 */

import { useEffect, useState } from "react";

import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import ImageUpload from "../../../components/forms/ImageUpload";

import {
  getSettings,
  updateSettings,
} from "../../../api/settings/settingsApi";

const OrganizationSettings = () => {

  /**
   * ======================================
   * STATE
   * ======================================
   */

  const [formData, setFormData] =
    useState({
      organizationName: "",
      shortName: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      logo: "",
      favicon: "",
      heroImage: "",
      aboutImage: "",
      heroTitle: "",
      heroSubtitle: "",
      aboutTitle: "",
      aboutText: "",
      storyTitle: "",
      storySubtitle: "",
      storyVideoOne: "",
      storyVideoTwo: "",
      storyVideoThree: "",
      mission: "",
      vision: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      youtube: "",
      footerText: "",
      projectsCompleted: "",
      livesImpacted: "",
      communitiesReached: "",
      activeVolunteers: "",
      yearsOfExperience: "",
    });

  /**
   * ======================================
   * LOAD SETTINGS
   * ======================================
   */

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  /**
   * ======================================
   * LOAD DATA INTO FORM
   * ======================================
   */

  useEffect(() => {

    if (data?.data) {

      // avoid synchronous setState in effect
      setTimeout(() => {
        setFormData({
        organizationName:
          data.data.organizationName || "",

        shortName:
          data.data.shortName || "",

        email:
          data.data.email || "",

        phone:
          data.data.phone || "",

        address:
          data.data.address || "",

        website:
          data.data.website || "",

        logo:
          data.data.logo || "",

        favicon:
          data.data.favicon || "",

        heroImage:
          data.data.heroImage || "",

        aboutImage:
          data.data.aboutImage || "",

        heroTitle:
          data.data.heroTitle || "",

        heroSubtitle:
          data.data.heroSubtitle || "",

        aboutTitle:
          data.data.aboutTitle || "",

        aboutText:
          data.data.aboutText || "",

        storyTitle:
          data.data.storyTitle || "",

        storySubtitle:
          data.data.storySubtitle || "",

        storyVideoOne:
          data.data.storyVideoOne || "",

        storyVideoTwo:
          data.data.storyVideoTwo || "",

        storyVideoThree:
          data.data.storyVideoThree || "",

        mission:
          data.data.mission || "",

        vision:
          data.data.vision || "",

        facebook:
          data.data.facebook || "",

        linkedin:
          data.data.linkedin || "",

        twitter:
          data.data.twitter || "",

        instagram:
          data.data.instagram || "",

        youtube:
          data.data.youtube || "",

        footerText:
          data.data.footerText || "",

        projectsCompleted:
          data.data.projectsCompleted || "",

        livesImpacted:
          data.data.livesImpacted || "",

        communitiesReached:
          data.data.communitiesReached || "",

        activeVolunteers:
          data.data.activeVolunteers || "",

        yearsOfExperience:
          data.data.yearsOfExperience || "",
        });
      }, 0);

    }

  }, [data]);

  /**
   * ======================================
   * UPDATE SETTINGS
   * ======================================
   */

  const mutation =
    useMutation({

      mutationFn:
        updateSettings,

      onSuccess: () => {

        toast.success(
          "Organization settings updated successfully."
        );

      },

      onError: (error) => {

        toast.error(
          error?.response?.data?.message ||
          "Unable to update settings."
        );

      },

    });

  /**
   * ======================================
   * HANDLE INPUT CHANGE
   * ======================================
   */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  /**
   * ======================================
   * HANDLE SUBMIT
   * ======================================
   */

  const handleSubmit = (e) => {

    e.preventDefault();

    mutation.mutate(formData);

  };

  /**
   * ======================================
   * LOADING
   * ======================================
   */

  if (isLoading) {

    return (

      <div className="flex items-center justify-center h-screen">

        <h2 className="text-xl font-semibold">

          Loading Organization Settings...

        </h2>

      </div>

    );

  }
    /**
   * ======================================
   * UI
   * ======================================
   */

  return (

    <div className="max-w-7xl mx-auto p-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Organization Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your organization's information,
          branding and contact details.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* ========================================= */}
        {/* ORGANIZATION DETAILS */}
        {/* ========================================= */}

        <div className="bg-white rounded-xl shadow border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Organization Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-medium">
                Organization Name
              </label>

              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Short Name
              </label>

              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* CONTACT DETAILS */}
        {/* ========================================= */}

        <div className="bg-white rounded-xl shadow border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="block mb-2 font-medium">
                Address
              </label>

              <textarea
                rows="3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="block mb-2 font-medium">
                Website
              </label>

              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* BRANDING */}
        {/* ========================================= */}

        <div className="bg-white rounded-xl shadow border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Branding
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            <div>

              <h3 className="font-semibold mb-4">
                Organization Logo
              </h3>

              <ImageUpload
                onUploadSuccess={(url) =>
                  setFormData({
                    ...formData,
                    logo: url,
                  })
                }
              />

              {formData.logo && (

                <img
                  src={formData.logo}
                  alt="Logo"
                  className="w-36 h-36 mt-5 object-contain border rounded-lg"
                />

              )}

            </div>

            <div>

              <h3 className="font-semibold mb-4">
                Favicon
              </h3>

              <ImageUpload
                onUploadSuccess={(url) =>
                  setFormData({
                    ...formData,
                    favicon: url,
                  })
                }
              />

              {formData.favicon && (

                <img
                  src={formData.favicon}
                  alt="Favicon"
                  className="w-20 h-20 mt-5 object-contain border rounded-lg"
                />

              )}

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* HOME PAGE IMAGES */}
        {/* ========================================= */}

        <div className="bg-white rounded-xl shadow border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Home Page Images
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            <div>

              <h3 className="font-semibold mb-4">
                Hero Banner Image
              </h3>

              <ImageUpload
                onUploadSuccess={(url) =>
                  setFormData({
                    ...formData,
                    heroImage: url,
                  })
                }
              />

              {formData.heroImage && (

                <img
                  src={formData.heroImage}
                  alt="Hero banner"
                  className="w-full h-48 mt-5 object-cover border rounded-lg"
                />

              )}

            </div>

            <div>

              <h3 className="font-semibold mb-4">
                About Section Image
              </h3>

              <ImageUpload
                onUploadSuccess={(url) =>
                  setFormData({
                    ...formData,
                    aboutImage: url,
                  })
                }
              />

              {formData.aboutImage && (

                <img
                  src={formData.aboutImage}
                  alt="About section"
                  className="w-full h-48 mt-5 object-cover border rounded-lg"
                />

              )}

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* HOME PAGE CONTENT */}
        {/* ========================================= */}

        <div className="bg-white rounded-xl shadow border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Home Page Content
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Hero Title
              </label>
              <input
                type="text"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Enter hero title"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Hero Subtitle
              </label>
              <input
                type="text"
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Enter hero subtitle"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                About Section Title
              </label>
              <input
                type="text"
                name="aboutTitle"
                value={formData.aboutTitle}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Enter about title"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Stories Section Title
              </label>
              <input
                type="text"
                name="storyTitle"
                value={formData.storyTitle}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Enter stories heading"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                About Section Text
              </label>
              <textarea
                rows="4"
                name="aboutText"
                value={formData.aboutText}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Enter about description"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Stories Section Subtitle
              </label>
              <textarea
                rows="3"
                name="storySubtitle"
                value={formData.storySubtitle}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Enter stories description"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Story Video 1 URL
              </label>
              <input
                type="text"
                name="storyVideoOne"
                value={formData.storyVideoOne}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Story Video 2 URL
              </label>
              <input
                type="text"
                name="storyVideoTwo"
                value={formData.storyVideoTwo}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Story Video 3 URL
              </label>
              <input
                type="text"
                name="storyVideoThree"
                value={formData.storyVideoThree}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* MISSION & VISION */}
        {/* ========================================= */}

        <div className="bg-white rounded-xl shadow border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Mission & Vision
          </h2>

          <div className="space-y-6">

            <div>

              <label className="block mb-2 font-medium">
                Mission
              </label>

              <textarea
                rows="5"
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Vision
              </label>

              <textarea
                rows="5"
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

          </div>

        </div>
                {/* ========================================= */}
        {/* SOCIAL MEDIA */}
        {/* ========================================= */}

        <div className="bg-white rounded-xl shadow border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Social Media
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-medium">
                Facebook
              </label>

              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                LinkedIn
              </label>

              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Twitter / X
              </label>

              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Instagram
              </label>

              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div className="md:col-span-2">

              <label className="block mb-2 font-medium">
                YouTube
              </label>

              <input
                type="text"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* IMPACT STATISTICS */}
        {/* ========================================= */}

        <div className="bg-white rounded-xl shadow border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Home Page Impact Statistics
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Projects Completed
              </label>
              <input
                type="text"
                name="projectsCompleted"
                value={formData.projectsCompleted}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="250+"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Lives Impacted
              </label>
              <input
                type="text"
                name="livesImpacted"
                value={formData.livesImpacted}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="25,000+"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Communities Reached
              </label>
              <input
                type="text"
                name="communitiesReached"
                value={formData.communitiesReached}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="50+"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Active Volunteers
              </label>
              <input
                type="text"
                name="activeVolunteers"
                value={formData.activeVolunteers}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="98"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Years of Experience
              </label>
              <input
                type="text"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="15+"
              />
            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* FOOTER */}
        {/* ========================================= */}

        <div className="bg-white rounded-xl shadow border p-6">

          <h2 className="text-xl font-semibold mb-6">
            Footer
          </h2>

          <textarea
            rows="4"
            name="footerText"
            value={formData.footerText}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Footer text..."
          />

        </div>

        {/* ========================================= */}
        {/* SAVE BUTTON */}
        {/* ========================================= */}

        <div className="flex justify-end">

          <button
            type="submit"
            disabled={mutation.isPending}
            className="
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-gray-400
              text-white
              px-8
              py-3
              rounded-lg
              font-semibold
              transition-all
            "
          >

            {mutation.isPending
              ? "Saving..."
              : "Save Organization Settings"}

          </button>

        </div>

      </form>

    </div>

  );

};

export default OrganizationSettings;
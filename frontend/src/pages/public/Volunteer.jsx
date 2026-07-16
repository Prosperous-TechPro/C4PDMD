/**
 * =====================================================
 * VOLUNTEER PAGE
 * =====================================================
 * Public Volunteer Registration Page
 * =====================================================
 */

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { HeartHandshake } from "lucide-react";

import ImageUpload from "../../components/forms/ImageUpload";

import { createVolunteer } from "../../api/volunteers/volunteerApi";

const Volunteer = () => {
  /**
   * =====================================================
   * STATE
   * =====================================================
   */

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      skills: "",
      resume: "",
    });

  /**
   * =====================================================
   * MUTATION
   * =====================================================
   */

  const volunteerMutation =
    useMutation({
      mutationFn: createVolunteer,

      onSuccess: () => {
        toast.success(
          "Application submitted successfully."
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: "",
          resume: "",
        });
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            "Submission failed."
        );
      },
    });

  /**
   * =====================================================
   * HANDLERS
   * =====================================================
   */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    volunteerMutation.mutate(
      formData
    );
  };

  return (
    <div>

      {/* ====================================== */}
      {/* HERO */}
      {/* ====================================== */}

      <section
        className="text-white py-24"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(22, 78, 99, 0.94), rgba(14, 116, 144, 0.76)), url('https://source.unsplash.com/featured/1600x900?ghana,volunteer')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="container mx-auto px-6 text-center">

          <HeartHandshake
            size={60}
            className="mx-auto mb-6 text-yellow-400"
          />

          <h1 className="text-5xl font-bold">
            Become a Volunteer
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg">
            Join our mission of creating
            sustainable impact through
            education, research,
            innovation and community
            development.
          </p>

        </div>

      </section>

      {/* ====================================== */}
      {/* FORM */}
      {/* ====================================== */}

      <section className="py-20">

        <div className="container mx-auto px-6">

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-10">

            <h2 className="text-3xl font-bold mb-8 text-center">
              Volunteer Application
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-6"
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border rounded-lg p-3"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border rounded-lg p-3"
              />

              <textarea
                name="skills"
                rows="5"
                placeholder="Tell us about your skills and experience..."
                value={
                  formData.skills
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border rounded-lg p-3"
              />

              {/* Resume Upload */}

              <div>

                <label className="block font-semibold mb-3">

                  Upload Resume (PDF/Image)

                </label>

                <ImageUpload
                  onUploadSuccess={(
                    url
                  ) =>
                    setFormData({
                      ...formData,
                      resume:
                        url,
                    })
                  }
                />

                {formData.resume && (

                  <p className="mt-3 text-green-600">

                    Resume uploaded
                    successfully.

                  </p>

                )}

              </div>

              <button
                type="submit"
                disabled={
                  volunteerMutation.isPending
                }
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  py-4
                  rounded-lg
                  font-semibold
                  transition
                "
              >
                {volunteerMutation.isPending
                  ? "Submitting..."
                  : "Submit Application"}
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Volunteer;
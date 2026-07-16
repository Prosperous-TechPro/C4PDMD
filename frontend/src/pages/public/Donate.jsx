/**
 * =====================================================
 * DONATE PAGE
 * =====================================================
 * Public Donation Page
 * =====================================================
 */

import { useEffect, useRef, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  Heart,
  CreditCard,
  Landmark,
} from "lucide-react";

import {
  initiateDonationCheckout,
  verifyDonationPayment,
} from "../../api/donations/donationApi";

const Donate = () => {
  /**
   * =====================================================
   * STATE
   * =====================================================
   */

  const [formData, setFormData] =
    useState({
      donorName: "",
      email: "",
      amount: "",
    });

  const [searchParams, setSearchParams] =
    useSearchParams();

  const verifiedReferenceRef = useRef("");

  /**
   * =====================================================
   * DONATION MUTATION
   * =====================================================
   */

  const donationMutation =
    useMutation({
      mutationFn:
        initiateDonationCheckout,

      onSuccess: (response) => {
        const authorizationUrl =
          response?.data?.authorizationUrl;

        if (!authorizationUrl) {
          toast.error(
            "Unable to start donation checkout."
          );
          return;
        }

        window.location.assign(
          authorizationUrl
        );
      },

      onError: (error) => {
        toast.error(
          error?.response?.data
            ?.message ||
            "Unable to process donation."
        );
      },
    });

  const verificationMutation =
    useMutation({
      mutationFn:
        verifyDonationPayment,

      onSuccess: (response) => {
        const donation =
          response?.data;

        toast.success(
          "Thank you for supporting C4PDMD! God bless you"
        );

        setFormData({
          donorName: "",
          email: "",
          amount: "",
        });

        setSearchParams({}, { replace: true });
      },

      onError: (error) => {
        toast.error(
          error?.response?.data
            ?.message ||
            "Unable to verify donation payment."
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

    donationMutation.mutate({
      ...formData,
      callbackUrl: `${window.location.origin}/donate`,
    });
  };

  useEffect(() => {
    const reference =
      searchParams.get("reference");

    if (
      reference &&
      verifiedReferenceRef.current !== reference &&
      !verificationMutation.isPending
    ) {
      verifiedReferenceRef.current = reference;
      verificationMutation.mutate(reference);
    }
  }, [searchParams, verificationMutation]);

  return (
    <div>

      {/* ====================================== */}
      {/* HERO */}
      {/* ====================================== */}

      <section
        className="text-white py-24"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(3, 37, 76, 0.94), rgba(29, 78, 216, 0.76)), url('https://source.unsplash.com/featured/1600x900?ghana,donation')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="container mx-auto px-6 text-center">

          <Heart
            size={60}
            className="mx-auto mb-6 text-yellow-400"
          />

          <h1 className="text-5xl font-bold">
            Support Our Mission
          </h1>

          <p className="mt-6 text-lg max-w-3xl mx-auto">
            Every contribution helps us
            improve lives through
            education, innovation,
            research and sustainable
            community development.
          </p>

        </div>

      </section>

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <section className="py-20">

        <div className="container mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Donation Form */}

            <div className="bg-white rounded-xl shadow-lg p-10">

              <h2 className="text-3xl font-bold mb-8">
                Make a Donation
              </h2>

              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-6"
              >

                <input
                  type="text"
                  name="donorName"
                  placeholder="Full Name"
                  required
                  value={
                    formData.donorName
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Donation Amount (GH₵)"
                  min="1"
                  required
                  value={
                    formData.amount
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg p-3"
                />

                <button
                  type="submit"
                  disabled={
                    donationMutation.isPending ||
                    verificationMutation.isPending
                  }
                  className="
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-4
                    rounded-lg
                    font-semibold
                  "
                >
                  {donationMutation.isPending
                    ? "Starting checkout..."
                    : verificationMutation.isPending
                    ? "Verifying payment..."
                    : "Donate Now"}
                </button>

              </form>

            </div>

            {/* Information */}

            <div className="space-y-8">

              <div className="bg-white rounded-xl shadow-lg p-8">

                <CreditCard
                  className="text-blue-600 mb-4"
                  size={40}
                />

                <h3 className="text-2xl font-bold mb-4">
                  Online Checkout
                </h3>

                <p className="text-gray-600 leading-8">
                  Secure donations are processed through a live Paystack checkout and confirmed on return to this page.
                </p>

              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">

                <Landmark
                  className="text-blue-600 mb-4"
                  size={40}
                />

                <h3 className="text-2xl font-bold mb-4">
                  Bank Transfer
                </h3>

                <div className="space-y-2 text-gray-700">

                  <p>
                    <strong>
                      Bank:
                    </strong>{" "}
                    GCB Bank
                  </p>

                  <p>
                    <strong>
                      Account Name:
                    </strong>{" "}
                    C4PDMD
                  </p>

                  <p>
                    <strong>
                      Account Number:
                    </strong>{" "}
                    000000000000
                  </p>

                  <p>
                    <strong>
                      Branch:
                    </strong>{" "}
                    Ho
                  </p>

                </div>

              </div>

              <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">

                <h3 className="text-2xl font-bold text-blue-700 mb-4">
                  Your Impact
                </h3>

                <ul className="space-y-3 list-disc ml-6 text-gray-700">

                  <li>
                    Support education
                    programmes.
                  </li>

                  <li>
                    Fund community
                    development.
                  </li>

                  <li>
                    Promote research
                    and innovation.
                  </li>

                  <li>
                    Empower vulnerable
                    communities.
                  </li>

                  <li>
                    Improve healthcare
                    and livelihoods.
                  </li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Donate;
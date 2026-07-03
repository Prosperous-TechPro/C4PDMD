/**
 * =====================================================
 * CONTACT PAGE
 * =====================================================
 * Professional contact page with form and information
 * =====================================================
 */

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

import { createMessage } from "../../api/contact/contactApi";
import { useOrganization } from "../../contexts/OrganizationContext";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Contact = () => {
  // SEO Meta Tags
  useEffect(() => {
    document.title = "Contact Us — C4PDMD NGO";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Get in touch with C4PDMD. Contact us for partnerships, inquiries, or questions about our work in sustainable development."
      );
    }
  }, []);

  // Get organization data
  const { organization } = useOrganization();

  // State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Send message mutation
  const messageMutation = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
      setTimeout(() => setSubmitted(false), 3000);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Unable to send message. Please try again."
      );
    },
  });

  // Form handlers
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    messageMutation.mutate(formData);
  };

  return (
    <div className="overflow-hidden">
      {/* ========================================= */}
      {/* HERO BANNER */}
      {/* ========================================= */}

      <motion.section
        className="relative text-white py-32 md:py-48 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(127, 29, 29, 0.92), rgba(220, 38, 38, 0.72)), url('https://source.unsplash.com/featured/1600x900?ghana,contact')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Cg%20fill=%22white%22%20fill-opacity=%220.05%22%20%3E%3Crect%20width=%22100%22%20height=%22100%22/%3E%3C/g%3E")',
            }}
          />
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Get in Touch
            </h1>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-red-100 leading-relaxed">
              Have a question? We'd love to hear from you. Reach out and connect with us.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* CONTACT SECTION */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                Contact Information
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <motion.div className="flex gap-5" whileHover={{ x: 8 }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-100 text-red-700">
                      <MapPin size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Office Address
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {organization?.address ||
                        "Ho, Volta Region, Ghana"}
                    </p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div className="flex gap-5" whileHover={{ x: 8 }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-100 text-red-700">
                      <Phone size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Phone
                    </h3>
                    <a
                      href={`tel:${organization?.phone || "+233 242406733"}`}
                      className="text-gray-600 hover:text-red-700 transition mt-1 inline-block"
                    >
                      {organization?.phone || "+233 242406733"}
                    </a>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div className="flex gap-5" whileHover={{ x: 8 }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-100 text-red-700">
                      <Mail size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Email
                    </h3>
                    <a
                      href={`mailto:${organization?.email || "c4pdmd@gmail.com"}`}
                      className="text-gray-600 hover:text-red-700 transition mt-1 inline-block"
                    >
                      {organization?.email || "c4pdmd@gmail.com"}
                    </a>
                  </div>
                </motion.div>

                {/* Working Hours */}
                <motion.div className="flex gap-5" whileHover={{ x: 8 }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-100 text-red-700">
                      <Clock size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Working Hours
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Monday - Friday
                      <br />
                      8:00 AM - 5:00 PM (GMT)
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-12 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <motion.a
                    href="#"
                    className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 text-gray-700 hover:bg-red-700 hover:text-white transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaFacebook size={20} />
                  </motion.a>

                  <motion.a
                    href="#"
                    className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin size={20} />
                  </motion.a>

                  <motion.a
                    href="#"
                    className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTwitter size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>

              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <CheckCircle
                      size={64}
                      className="text-green-500 mb-4 mx-auto"
                    />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    We've received your message and will get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none ${
                        errors.name
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-200 focus:border-red-500"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none ${
                        errors.email
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-200 focus:border-red-500"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none ${
                        errors.subject
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-200 focus:border-red-500"
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none resize-none ${
                        errors.message
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-200 focus:border-red-500"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={messageMutation.isPending}
                    className="w-full bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-3 transition"
                    whileHover={{ scale: messageMutation.isPending ? 1 : 1.02 }}
                    whileTap={{ scale: messageMutation.isPending ? 1 : 0.98 }}
                  >
                    <Send size={20} />
                    {messageMutation.isPending ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* MAP SECTION */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Find Us On The Map
          </h2>

          <motion.div
            className="rounded-2xl overflow-hidden shadow-xl"
            whileHover={{ shadow: "0 20px 25px rgba(0,0,0,0.1)" }}
          >
            <iframe
              title="C4PDMD Location"
              src="https://www.google.com/maps?q=Ho,Ghana&output=embed"
              width="100%"
              height="500"
              loading="lazy"
              className="border-0"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
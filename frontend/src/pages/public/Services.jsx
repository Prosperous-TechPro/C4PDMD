/**
 * =====================================================
 * SERVICES PAGE
 * =====================================================
 * Display all professional services offered by C4PDMD
 * =====================================================
 */

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

import { getServices } from "../../api/services/serviceApi";

import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import LazyImage from "../../components/common/LazyImage";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Services = () => {
  // SEO Meta Tags
  useEffect(() => {
    document.title = "Services — C4PDMD NGO";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Explore C4PDMD's range of professional services in research, innovation, education, health, and community development."
      );
    }
  }, []);

  // Fetch services
  const { data, isLoading, error } = useQuery({
    queryKey: ["public-services"],
    queryFn: getServices,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load services." />;
  }

  const services = data?.data || [];

  // Services statistics
  const stats = [
    { label: "Services Offered", value: services.length },
    { label: "Communities Served", value: "50" },
    { label: "Expert Teams", value: "25" },
  ];

  return (
    <div className="overflow-hidden">
      {/* ========================================= */}
      {/* HERO BANNER */}
      {/* ========================================= */}

      <motion.section
        className="relative text-white py-16 md:py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(59, 130, 246, 0.78)), url('https://source.unsplash.com/featured/1600x900?ghana,services')",
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
              Our Professional Services
            </h1>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 leading-relaxed">
              Comprehensive, research-driven solutions designed to create
              sustainable community impact
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* STATISTICS */}
      {/* ========================================= */}

      <motion.section
        className="py-12 md:py-16 bg-white border-b border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* INTRODUCTION */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At C4PDMD, we deliver innovative, evidence-based services across
              multiple sectors. Our team of expert researchers, development
              professionals, and community facilitators work collaboratively to
              ensure that every service we provide creates meaningful, lasting
              impact.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you're a community organization, government agency, or
              development partner, our services are tailored to meet your unique
              needs and drive sustainable development.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* SERVICES GRID */}
      {/* ========================================= */}

      {services.length === 0 ? (
        <motion.section
          className="py-20 md:py-32 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-6">
            <div className="text-center text-gray-500">
              <p className="text-lg">No services available at this time.</p>
            </div>
          </div>
        </motion.section>
      ) : (
        <motion.section
          className="py-20 md:py-32 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  {/* Service Image */}
                  {service.image && (
                    <div className="h-56 w-full overflow-hidden">
                      <LazyImage
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Service Content */}
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-start mb-4">
                      <Star className="text-blue-700 mr-3 flex-shrink-0 mt-1" />
                      <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* Service Details */}
                    {service.features && (
                      <div className="mb-6 pb-6 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-3">
                          Key Focus Areas:
                        </p>
                        <div className="space-y-2">
                          {Array.isArray(service.features)
                            ? service.features.slice(0, 3).map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="text-sm text-gray-600 flex items-start"
                                >
                                  <span className="text-blue-700 mr-2">•</span>
                                  <span>{feature}</span>
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <Link
                      to="/contact"
                      className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition"
                    >
                      Learn More
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ========================================= */}
      {/* SERVICE DELIVERY */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Deliver Impact
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our proven approach to creating sustainable change
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Assessment",
                  description:
                    "We conduct thorough assessments to understand your needs",
                },
                {
                  step: "2",
                  title: "Design",
                  description: "Custom solutions tailored to your context",
                },
                {
                  step: "3",
                  title: "Implementation",
                  description:
                    "Expert execution with community engagement",
                },
                {
                  step: "4",
                  title: "Evaluation",
                  description:
                    "Measure impact and inform continuous improvement",
                },
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-700 text-white rounded-full font-bold text-2xl mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* WHY CHOOSE US */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Partner With Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              What sets our services apart
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Evidence-Based",
                description:
                  "All our services are grounded in research and proven best practices",
              },
              {
                title: "Community-Focused",
                description:
                  "We place communities at the center of every solution",
              },
              {
                title: "Expert Team",
                description:
                  "Years of experience delivering results across diverse contexts",
              },
              {
                title: "Sustainable",
                description:
                  "Solutions built for long-term impact and local ownership",
              },
              {
                title: "Flexible",
                description:
                  "Services tailored to your specific context and needs",
              },
              {
                title: "Accountable",
                description:
                  "Transparent reporting and commitment to measurable outcomes",
              },
            ].map((reason, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* CTA SECTION */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 bg-gradient-to-r from-blue-700 to-blue-800 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 text-blue-100">
              Let's discuss how our services can help your organization create
              lasting impact
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-pink text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;
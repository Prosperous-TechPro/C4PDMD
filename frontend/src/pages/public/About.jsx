/**
 * =====================================================
 * ABOUT PAGE
 * =====================================================
 * Organization background, mission, vision, values,
 * objectives, and team information
 * =====================================================
 */

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Heart,
  Users,
  Zap,
  Award,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import { getTeamMembers } from "../../api/team/teamApi";

import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import LazyImage from "../../components/common/LazyImage";
import { useOrganization } from "../../contexts/OrganizationContext";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const About = () => {
  const { organization } = useOrganization();

  const { data, isLoading, error } = useQuery({
    queryKey: ["about-team"],
    queryFn: getTeamMembers,
  });

  useEffect(() => {
    document.title = "About C4PDMD - Mission & Values";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Learn about C4PDMD's mission to empower communities through research, innovation, and sustainable development."
      );
    }
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load page." />;
  }

  const team = data?.data || [];

  // Core values
  const coreValues = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Integrity",
      description: "Upholding the highest ethical standards in all our work",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Continuously seeking new and better ways to create impact",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description:
        "Working together with partners and communities for greater good",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "Striving for the highest quality in everything we do",
    },
  ];

  // Organizational objectives
  const objectives = [
    "Conduct quality research to inform policy and practice",
    "Build capacity of individuals and institutions",
    "Promote innovative solutions to development challenges",
    "Foster community participation and ownership",
    "Advocate for evidence-based decision making",
    "Promote sustainable and inclusive development",
  ];

  // Why we exist
  const whyWeExist = [
    {
      title: "Data Gap",
      description:
        "Many communities lack reliable data to make informed decisions",
    },
    {
      title: "Limited Innovation",
      description:
        "Traditional approaches often fail to address complex challenges",
    },
    {
      title: "Capacity Needs",
      description:
        "Organizations and communities need skills and knowledge to drive change",
    },
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
            "linear-gradient(135deg, rgba(3, 37, 76, 0.92), rgba(37, 99, 235, 0.78)), url('https://thispersondoesnotexist.com/image')",
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
              About C4PDMD
            </h1>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 leading-relaxed">
              Dedicated to research, innovation, capacity building, and
              sustainable community transformation
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* ORGANIZATION HISTORY */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Our Story
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {organization?.description ||
                  "The Center for Prim-Data Measurement and Development (C4PDMD) was founded on the belief that reliable data and evidence-based approaches can transform communities. With over 15 years of experience, we have worked with thousands of individuals, organizations, and communities across Africa."}
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Today, we continue our mission to empower communities through
                research, innovation, and sustainable development initiatives.
                Our work spans education, health, livelihoods, environment, and
                community development.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition"
              >
                Get in Touch
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-8 border border-blue-200"
            >
              <div className="space-y-6">
                <div className="flex items-start">
                  <Award className="text-blue-700 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      15+ Years of Experience
                    </h3>
                    <p className="text-gray-600">
                      Serving communities across Africa with dedication and impact
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="text-blue-700 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      50+ Communities
                    </h3>
                    <p className="text-gray-600">
                      Making a difference in the lives of thousands
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Target className="text-blue-700 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Evidence-Based Approach
                    </h3>
                    <p className="text-gray-600">
                      Using data and research to drive sustainable change
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* MISSION & VISION */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              className="bg-white rounded-xl p-12 shadow-lg border-l-4 border-blue-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <Target className="text-blue-700 mr-4" size={32} />
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {organization?.mission ||
                  "To empower individuals, institutions and communities through quality research, innovation, technology, education and sustainable development initiatives."}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="bg-white rounded-xl p-12 shadow-lg border-l-4 border-green-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <Eye className="text-green-700 mr-4" size={32} />
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {organization?.vision ||
                  "A world where communities are empowered with reliable data and innovative solutions for sustainable development."}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* CORE VALUES */}
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
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These principles guide our work and relationships
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-700 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* WHY WE EXIST */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white"
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
              Why We Exist
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The challenges we address and the opportunities we pursue
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyWeExist.map((reason, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-700 text-white">
                      <CheckCircle size={24} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 ml-4">
                    {reason.title}
                  </h3>
                </div>
                <p className="text-gray-600 ml-16">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* ORGANIZATIONAL OBJECTIVES */}
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
              Our Objectives
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              What we aim to achieve through our work
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  className="flex items-start p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle
                    className="text-blue-700 mr-4 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <p className="text-gray-700 font-medium">{objective}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* LEADERSHIP TEAM */}
      {/* ========================================= */}

      {team.length > 0 && (
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
                Leadership Team
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Dedicated professionals driving our mission forward
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  {member.photo && (
                    <div className="w-full h-72 overflow-hidden">
                      <LazyImage
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-700 font-medium mb-3">
                      {member.position}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {member.biography}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

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
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 text-blue-100">
              Whether you want to volunteer, partner with us, or support our
              work, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/volunteer"
                className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                <Users className="mr-2" size={20} />
                Volunteer
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-blue-700 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-transparent transition-all duration-300"
              >
                Get in Touch
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
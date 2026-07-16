/**
 * =====================================================
 * HOME PAGE
 * =====================================================
 * Main landing page for C4PDMD NGO
 * Features all key sections to communicate the
 * organization's mission, impact, and calls-to-action
 * =====================================================
 */

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


// Icons
import {
  ChevronRight,
  Heart,
  Users,
  Target,
  Zap,
  Award,
  ArrowRight,
  Mail,
  PlayCircle,
} from "lucide-react";

import { getServices } from "../../api/services/serviceApi";
import { getProjects } from "../../api/projects/projectApi";
import { getTestimonials } from "../../api/testimonials/testimonialApi";
import { getPartners } from "../../api/partners/partnerApi";
import { getTeamMembers } from "../../api/team/teamApi";
import { getGalleryItems } from "../../api/gallery/galleryApi";
import { getBlogs } from "../../api/blog/blogApi";

import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import LazyImage from "../../components/common/LazyImage";
import { useOrganization } from "../../contexts/OrganizationContext";
import heroBg from "../../assets/blue.jpeg";
import heroUser from "../../assets/blue.jpeg";
import volunteerBg from "../../assets/images/green.jpeg";
import donationBg from "../../assets/images/red.jpeg";
import blueBg from "../../assets/images/blue.jpeg";
import educationBg from "../../assets/images/research.jpeg";
import healthBg from "../../assets/images/health.jpeg";
import livelihoodBg from "../../assets/images/livelihood.jpeg";
import environmentBg from "../../assets/images/environment.jpeg";
import waterBg from "../../assets/images/water.jpeg";
import communityBg from "../../assets/images/community.jpeg";
import visionMissionBg from "../../assets/images/visionMission.jpeg";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const Home = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  // SEO Meta Tags
  useEffect(() => {
    document.title =
      "C4PDMD - Center for Prim-Data Measurement & Development";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Empowering communities through research, innovation, technology, education and sustainable development. Discover our projects, services, and impact."
      );
    }
  }, []);

  // Fetch organization settings
  const { organization } = useOrganization();

  // Fetch all data
  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ["home-services"],
    queryFn: getServices,
  });

  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ["home-projects"],
    queryFn: getProjects,
  });

  const { data: testimonialsData, isLoading: testimonialsLoading } = useQuery({
    queryKey: ["home-testimonials"],
    queryFn: getTestimonials,
  });

  const { data: partnersData, isLoading: partnersLoading } = useQuery({
    queryKey: ["home-partners"],
    queryFn: getPartners,
  });

  const { data: teamData, isLoading: teamLoading } = useQuery({
    queryKey: ["home-team"],
    queryFn: getTeamMembers,
  });

  const { data: galleryData, isLoading: galleryLoading } = useQuery({
    queryKey: ["home-gallery"],
    queryFn: getGalleryItems,
  });

  const { data: blogData, isLoading: blogLoading } = useQuery({
    queryKey: ["home-blog"],
    queryFn: getBlogs,
  });

  const isLoading =
    servicesLoading ||
    projectsLoading ||
    testimonialsLoading ||
    partnersLoading ||
    teamLoading ||
    galleryLoading ||
    blogLoading;

  if (isLoading) {
    return <PageLoader />;
  }

  const services = servicesData?.data || [];
  const projects = projectsData?.data || [];
  const testimonials = testimonialsData?.data || [];
  const partners = partnersData?.data || [];
  const team = teamData?.data || [];
  const gallery = galleryData?.data || [];
  const blogs = blogData?.data || [];

  

  const heroBackgroundImage = `linear-gradient(135deg, rgba(3, 37, 76, 0.36), rgba(30, 64, 175, 0.22)), url('${heroUser}')`;

  // Impact statistics
  const stats = [
    {
      label: "Projects Completed",
      value: organization?.projectsCompleted || "250+",
    },
    {
      label: "Lives Impacted",
      value: organization?.livesImpacted || "25,000+",
    },
    {
      label: "Communities Reached",
      value: organization?.communitiesReached || "50+",
    },
    {
      label: "Active Volunteers",
      value: organization?.activeVolunteers || "98",
    },
    {
      label: "Years of Experience",
      value: organization?.yearsOfExperience || "15+",
    },
  ];

  const serviceFallbackImages = [
    "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
    "https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
  ];

  // Focus areas
  const focusAreas = [
    {
      icon: "🎓",
      title: "Education",
      description:
        "Empowering youth through quality learning opportunities",
      image: educationBg,
    },
    {
      icon: "❤️",
      title: "Health",
      description:
        "Providing accessible healthcare services to underserved communities",
      image: healthBg,
    },
    {
      icon: "🏠",
      title: "Livelihood",
      description:
        "Creating economic opportunities for sustainable living",
      image: livelihoodBg,
    },
    {
      icon: "🌍",
      title: "Environment",
      description:
        "Protecting natural resources for future generations",
      image: environmentBg,
    },
    {
      icon: "💧",
      title: "Water & Sanitation",
      description: "Ensuring clean water and sanitation for all",
      image: waterBg,
    },
    {
      icon: "🤝",
      title: "Community Development",
      description:
        "Building stronger, more resilient communities",
      image: communityBg,
    },
  ];

  const isHostedVideoUrl = (value) =>
    /\.(mp4|mov|webm|ogg|m4v)$/i.test(value || "") || /\/video\//i.test(value || "") || /cloudinary.*\/video\//i.test(value || "");

  const ghanaStories = [
    {
      title: organization?.storyTitle || "Stories from Ghana",
      summary: organization?.storySubtitle || "Short visual stories from communities we serve across Ghana.",
      image: "https://images.pexels.com/photos/7974372/pexels-photo-7974372.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
      videoUrl: organization?.storyVideoOne || "https://www.youtube.com/embed/ScMzIvxBSi4",
    },
    {
      title: "Learning Beyond the Classroom",
      summary:
        "Watch how literacy programmes and school support are helping children thrive in Ghana.",
      image: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
      videoUrl: organization?.storyVideoTwo || "https://www.youtube.com/embed/2Vv-BfVoq4g",
    },
    {
      title: "Women Building Livelihoods",
      summary:
        "Discover how women’s cooperatives are creating businesses and stronger futures across Ghana.",
      image: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
      videoUrl: organization?.storyVideoThree || "https://www.youtube.com/embed/aqz-KE-bpKQ",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* ========================================= */}
      {/* HERO BANNER */}
      {/* ========================================= */}

      <motion.section
        className="relative text-white py-8 md:py-12 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: heroBackgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          height: "95.5vh",
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

        <div className="relative container mx-auto px-6 text-left md:text-center">
          <motion.div variants={containerVariants} animate="animate" className="max-w-4xl mx-auto">
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {organization?.heroTitle || organization?.name ||
                "Center for Prim-Data Measurement & Development"}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-blue-100 leading-relaxed"
            >
              {organization?.heroSubtitle || organization?.mission ||
                "We collect, analyze and use reliable data and innovative solutions to empower communities for sustainable development and improved quality of life."}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/donate"
                className="inline-flex items-center justify-center bg-yellow-500 text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Heart className="mr-2 text-yellow-400" size={20} />
                Donate Now
              </Link>
              <Link
                to="/volunteer"
                className="inline-flex items-center justify-center bg-blue-700 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-transparent transition-all duration-300"
              >
                <Users className="mr-2" size={20} />
                Volunteer With Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* IMPACT STATISTICS */}
      {/* ========================================= */}

      <motion.section
        className="py-16 md:py-24 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* ABOUT SECTION */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url('${blueBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
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
                {organization?.aboutTitle || "About C4PDMD"}
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {organization?.aboutText || organization?.description ||
                  "The Center for Prim-Data Measurement and Development (C4PDMD) is dedicated to research, innovation, capacity building, and sustainable community transformation. We leverage data-driven insights to create meaningful change."}
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Target className="text-blue-700 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Our Mission
                    </h3>
                    <p className="text-gray-600">
                      {organization?.mission ||
                        "To empower individuals, institutions and communities through quality research, innovation and sustainable development."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Zap className="text-blue-700 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Our Vision
                    </h3>
                    <p className="text-gray-600">
                      {organization?.vision ||
                        "A world where communities are empowered with reliable data and innovative solutions for sustainable development."}
                    </p>
                  </div>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition"
              >
                Learn More About Us
                <ChevronRight className="ml-2" size={20} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden h-96 shadow-xl"
            >
              <LazyImage
                src={organization?.aboutImage || visionMissionBg}
                alt="Community development and outreach work"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* FOCUS AREAS */}
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
              Our Focus Areas
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We work across multiple sectors to create sustainable impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                className="overflow-hidden border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="h-44 w-full overflow-hidden">
                  <LazyImage
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <div className="text-4xl mb-3">{area.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600">{area.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* FEATURED SERVICES */}
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
              Our Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Professional services designed to create lasting impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 w-full rounded-lg overflow-hidden mb-6">
                  <LazyImage
                    src={service.image || serviceFallbackImages[index % serviceFallbackImages.length]}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition"
                >
                  Read More
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/services"
              className="inline-flex items-center bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              View All Services
              <ChevronRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* FEATURED PROJECTS */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('${heroBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
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
              Featured Projects
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Showcasing our impactful work across communities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {projects.slice(0, 5).map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {project.image && (
                  <div className="h-56 w-full overflow-hidden">
                    <LazyImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition"
                  >
                    View Details
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              View All Projects
              <ChevronRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* LATEST NEWS & BLOG */}
      {/* ========================================= */}

      {blogs.length > 0 && (
        <motion.section
          className="py-20 md:py-32 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(248, 250, 252, 0.96), rgba(239, 246, 255, 0.92)), url('${blueBg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
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
                Latest News & Articles
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Insights and updates from our work
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {blogs.slice(0, 3).map((blog, index) => (
                <motion.div
                  key={blog.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  {blog.coverImage && (
                    <div className="h-48 w-full overflow-hidden">
                      <LazyImage
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <p className="text-sm text-blue-700 font-semibold mb-2">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {blog.excerpt ||
                        blog.content?.substring(0, 100)}
                    </p>
                    <Link
                      to={`/blog/${blog.id}`}
                      className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition text-sm"
                    >
                      Read More
                      <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                View All Articles
                <ChevronRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* ========================================= */}
      {/* GHANA STORIES VIDEOS */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50"
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
              {organization?.storyTitle || "Stories from Ghana"}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {organization?.storySubtitle || "Short visual stories from communities we serve across Ghana."}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {ghanaStories.map((story, index) => (
              <motion.div
                key={story.title}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video bg-gray-100">
                  {isHostedVideoUrl(story.videoUrl) ? (
                    <video
                      controls
                      src={story.videoUrl}
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                  ) : (
                    <iframe
                      src={story.videoUrl}
                      title={story.title}
                      className="w-full h-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
                <div className="p-8">
                  <div className="flex items-center text-sm text-emerald-700 font-semibold mb-3">
                    <PlayCircle className="mr-2" size={16} />
                    Featured video story
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{story.summary}</p>
                  <Link
                    to="/blog"
                    className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition"
                  >
                    Read more stories
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* GALLERY PREVIEW */}
      {/* ========================================= */}

      {gallery.length > 0 && (
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
                Photo Gallery
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Visual stories from our work
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {gallery.slice(0, 8).map((image, index) => (
                <motion.div
                  key={image.id}
                  className="h-56 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <LazyImage
                    src={image.image || image.imageUrl || image.url || ""}
                    alt={image.title || "Gallery image"}
                    className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                to="/gallery"
                className="inline-flex items-center bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                View Full Gallery
                <ChevronRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* ========================================= */}
      {/* MEET OUR TEAM PREVIEW */}
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
                Meet Our Team
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Dedicated professionals driving impact
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {team.slice(0, 4).map((member, index) => (
                <motion.div
                  key={member.id}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {member.image && (
                    <div className="h-56 w-full rounded-lg overflow-hidden mb-4">
                      <LazyImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-700 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {member.biography}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                to="/team"
                className="inline-flex items-center bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                View Full Team
                <ChevronRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* ========================================= */}
      {/* TESTIMONIALS CAROUSEL */}
      {/* ========================================= */}

      {testimonials.length > 0 && (
        <motion.section
          className="py-20 md:py-32 bg-gradient-to-r from-blue-700 to-blue-800 text-white"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What People Say
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Testimonials from those whose lives have been touched
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-blue-600 rounded-xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {testimonial.photo && (
                    <div className="h-16 w-16 rounded-full mb-4 overflow-hidden">
                      <LazyImage
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>
                  <h3 className="text-lg font-bold mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-blue-200 text-sm">
                    {testimonial.position}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ========================================= */}
      {/* PARTNERS */}
      {/* ========================================= */}

      {partners.length > 0 && (
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
                Our Partners
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Organizations we collaborate with
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {partners.slice(0, 5).map((partner, index) => (
                <motion.div
                  key={partner.id}
                  className="flex flex-col items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  {partner.logo ? (
                    <LazyImage
                      src={partner.logo}
                      alt={partner.name}
                      className="h-16 object-contain group-hover:scale-110 transition-transform mb-4"
                    />
                  ) : (
                    <span className="text-center text-gray-600 font-semibold mb-4">
                      {partner.name}
                    </span>
                  )}

                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                    {partner.description && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{partner.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {partners.length > 5 && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/partners"
                  className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-800 transition"
                >
                  View All Partners
                  <ChevronRight className="ml-2" size={20} />
                </Link>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ========================================= */}
      {/* VOLUNTEER CTA */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(4, 120, 87, 0.95), rgba(34, 197, 94, 0.8)), url('${volunteerBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want to Make a Difference?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 text-green-100">
              Join our team of dedicated volunteers and help us create positive
              change in communities
            </p>
            <Link
              to="/volunteer"
              className="inline-flex items-center bg-green-900 text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Users className="mr-2" size={20} />
              Become a Volunteer
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* DONATE CTA */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(127, 29, 29, 0.95), rgba(239, 68, 68, 0.8)), url('${donationBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Support Our Mission
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 text-red-100">
              Your donation helps us continue our work and reach more communities
            </p>
            <Link
              to="/donate"
              className="inline-flex items-center bg-purple-500 text-red-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Heart className="mr-2 text-yellow-400" size={20} />
              Make a Donation
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* NEWSLETTER SUBSCRIPTION */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
                Stay Updated
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Subscribe to our newsletter to get the latest updates and news
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsNewsletterOpen(false);
                  // Handle newsletter signup here
                }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 flex items-center justify-center"
                >
                  <Mail className="mr-2" size={20} />
                  Subscribe
                </button>
              </form>

              <p className="text-gray-500 text-sm text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* CONTACT PREVIEW */}
      {/* ========================================= */}

      <motion.section
        className="py-20 md:py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(240, 249, 255, 0.92)), url('${blueBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
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
              Get In Touch
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Have a question? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-blue-700" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">
                {organization?.email || " c4pdmd@gmail.com"}
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-700" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">
                {organization?.phone || "+233 24 240 6733"}
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-blue-700" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Location
              </h3>
              <p className="text-gray-600">
                {organization?.address ||
                  "Ho, Volta Region, Ghana"}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Send us a Message
              <ChevronRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
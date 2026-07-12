/**
 * =====================================================
 * PROJECTS PAGE
 * =====================================================
 * Display projects with search, filtering, and pagination
 * =====================================================
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, MapPin, Calendar } from "lucide-react";

import { getProjects } from "../../api/projects/projectApi";

import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import LazyImage from "../../components/common/LazyImage";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Projects = () => {
  // SEO Meta Tags
  useEffect(() => {
    document.title = "Projects — C4PDMD NGO";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Explore C4PDMD's impactful development projects across multiple sectors. Search by status, category, and location."
      );
    }
  }, []);

  // State
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch projects
  const { data, isLoading, error } = useQuery({
    queryKey: ["public-projects"],
    queryFn: getProjects,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load projects." />;
  }

  const projects = data?.data || [];

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(search.toLowerCase()) ||
      project.description?.toLowerCase().includes(search.toLowerCase()) ||
      project.location?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      !selectedStatus || project.status === selectedStatus;

    const matchesCategory =
      !selectedCategory ||
      project.category?.name === selectedCategory ||
      project.category?.id === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredProjects.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get unique statuses and categories
  const statuses = [
    ...new Set(
      projects.map((p) => p.status).filter(Boolean)
    ),
  ];
  const categories = [
    ...new Set(
      projects.map((p) => p.category?.name).filter(Boolean)
    ),
  ];

  // Status color mapping
  const statusColors = {
    COMPLETED: "bg-green-100 text-green-700",
    ONGOING: "bg-yellow-100 text-yellow-700",
    PLANNED: "bg-blue-100 text-blue-700",
  };

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
            "linear-gradient(135deg, rgba(4, 47, 46, 0.9), rgba(6, 95, 70, 0.72)), url('https://source.unsplash.com/featured/1600x900?ghana,project')",
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
              Our Projects
            </h1>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 leading-relaxed">
              Exploring our impactful development initiatives across communities
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* SEARCH & FILTERS */}
      {/* ========================================= */}

      <motion.section
        className="py-12 md:py-16 bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="container mx-auto px-6">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by project name, location, or description..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Status Filter */}
            {statuses.length > 0 && (
              <div>
                <div className="flex items-center mb-3">
                  <Filter size={18} className="text-gray-700 mr-2" />
                  <label className="font-semibold text-gray-900">
                    Filter by Status
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedStatus("");
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedStatus === ""
                        ? "bg-blue-700 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedStatus === status
                          ? "bg-blue-700 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter */}
            {categories.length > 0 && (
              <div>
                <div className="flex items-center mb-3">
                  <Filter size={18} className="text-gray-700 mr-2" />
                  <label className="font-semibold text-gray-900">
                    Filter by Category
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedCategory === ""
                        ? "bg-blue-700 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedCategory === category
                          ? "bg-blue-700 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-8 text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold">{paginatedProjects.length}</span> of{" "}
            <span className="font-semibold">{filteredProjects.length}</span>{" "}
            project{filteredProjects.length !== 1 ? "s" : ""}
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* PROJECTS GRID */}
      {/* ========================================= */}

      {paginatedProjects.length === 0 ? (
        <motion.section
          className="py-20 md:py-32 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-6">No projects found.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedStatus("");
                  setSelectedCategory("");
                  setCurrentPage(1);
                }}
                className="text-blue-700 font-semibold hover:text-blue-800 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </motion.section>
      ) : (
        <motion.section
          className="py-20 md:py-32 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Project Image */}
                  {project.image && (
                    <div className="h-56 w-full overflow-hidden">
                      <LazyImage
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="p-6 flex flex-col h-full">
                    {/* Category & Status Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.category && (
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {project.category.name}
                        </span>
                      )}
                      {project.status && (
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            statusColors[project.status] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {project.status}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    {/* Meta Information */}
                    <div className="space-y-2 mb-6 pb-6 border-t border-gray-200">
                      {project.location && (
                        <div className="flex items-start text-sm text-gray-600">
                          <MapPin
                            size={16}
                            className="mr-2 flex-shrink-0 mt-0.5"
                          />
                          <span>{project.location}</span>
                        </div>
                      )}
                      {project.startDate && (
                        <div className="flex items-start text-sm text-gray-600">
                          <Calendar
                            size={16}
                            className="mr-2 flex-shrink-0 mt-0.5"
                          />
                          <span>
                            {new Date(
                              project.startDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center gap-4 mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:border-blue-500 hover:text-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          currentPage === page
                            ? "bg-blue-700 text-white"
                            : "border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-700"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:border-blue-500 hover:text-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default Projects;
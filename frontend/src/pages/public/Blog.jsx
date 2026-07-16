/**
 * =====================================================
 * BLOG PAGE
 * =====================================================
 * Professional blog listing with categories and search
 * =====================================================
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, Calendar, User, Clock } from "lucide-react";

import { getBlogs } from "../../api/blog/blogApi";
import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import LazyImage from "../../components/common/LazyImage";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Blog = () => {
  // SEO Meta Tags
  useEffect(() => {
    document.title = "Blog — C4PDMD NGO";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Read the latest news, insights, and stories from C4PDMD. Explore our blog covering development, social impact, and community initiatives."
      );
    }
  }, []);

  // State
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch blogs
  const { data, isLoading, error } = useQuery({
    queryKey: ["public-blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load blog posts." />;
  }

  const blogs =
    data?.data?.filter((blog) => blog.status === "PUBLISHED") || [];

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.content?.toLowerCase().includes(search.toLowerCase()) ||
      blog.category?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !selectedCategory || blog.category?.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get unique categories
  const categories = [
    ...new Set(blogs.map((b) => b.category?.name).filter(Boolean)),
  ];

  // Calculate reading time
  const calculateReadingTime = (content) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const stripHtml = (html = "") =>
    html
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

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
            "linear-gradient(135deg, rgba(4, 120, 87, 0.92), rgba(6, 78, 59, 0.82)), url('https://source.unsplash.com/featured/1600x900?ghana,blog')",
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
              News & Blog
            </h1>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-green-100 leading-relaxed">
              Stay informed with our latest insights, stories, and updates from the field
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
                placeholder="Search by title, author, or content..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
              />
            </div>
          </div>

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
                      ? "bg-green-700 text-white"
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
                        ? "bg-green-700 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-8 text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold">{paginatedBlogs.length}</span> of{" "}
            <span className="font-semibold">{filteredBlogs.length}</span> article
            {filteredBlogs.length !== 1 ? "s" : ""}
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* BLOG GRID */}
      {/* ========================================= */}

      {paginatedBlogs.length === 0 ? (
        <motion.section
          className="py-20 md:py-32 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-6">No articles found.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("");
                  setCurrentPage(1);
                }}
                className="text-green-700 font-semibold hover:text-green-800 transition"
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
              {paginatedBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Blog Image */}
                  {blog.image && (
                    <div className="h-56 w-full overflow-hidden">
                      <LazyImage
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Blog Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Category Tag */}
                    {blog.category && (
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-4 w-fit">
                        {blog.category.name}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-700 transition">
                      {blog.title}
                    </h3>

                    {/* Description/Excerpt */}
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                      {stripHtml(blog.content)}
                    </p>

                    {/* Meta Information */}
                    <div className="space-y-3 mb-6 pb-6 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-2" />
                          <span>
                            {new Date(blog.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-2" />
                          <span>{calculateReadingTime(blog.content)}</span>
                        </div>
                      </div>
                      {blog.author && (
                        <div className="flex items-center text-xs text-gray-600">
                          <User size={14} className="mr-2" />
                          <span>By {blog.author}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/blog/${blog.id}`}
                      className="inline-flex items-center text-green-700 font-semibold hover:text-green-800 transition"
                    >
                      Read Article
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </div>
                </motion.article>
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
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:border-green-500 hover:text-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                            ? "bg-green-700 text-white"
                            : "border border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-700"
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
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:border-green-500 hover:text-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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

export default Blog;
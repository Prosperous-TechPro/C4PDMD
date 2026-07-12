/**
 * =====================================================
 * GALLERY PAGE
 * =====================================================
 * Professional gallery with masonry and lightbox
 * =====================================================
 */

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, ChevronLeft, ChevronRight } from "lucide-react";

import { getGalleryItems } from "../../api/gallery/galleryApi";
import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import LazyImage from "../../components/common/LazyImage";

const Gallery = () => {
  // SEO Meta Tags
  useEffect(() => {
    document.title = "Gallery — C4PDMD NGO";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Explore our photo gallery showcasing community projects, training programs, events, and social impact initiatives from C4PDMD."
      );
    }
  }, []);

  // State
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch gallery
  const { data, isLoading, error } = useQuery({
    queryKey: ["public-gallery"],
    queryFn: getGalleryItems,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load gallery." />;
  }

  const gallery = data?.data || [];

  // Get unique categories
  const categories = [
    ...new Set(
      gallery.map((item) => item.category?.name).filter(Boolean)
    ),
  ];

  // Filter gallery
  const filteredGallery = gallery.filter((item) => {
    const matchesSearch = item.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      !selectedCategory || item.category?.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle lightbox navigation
  const handlePrevImage = () => {
    const newIndex =
      currentIndex === 0 ? filteredGallery.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredGallery[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex =
      currentIndex === filteredGallery.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredGallery[newIndex]);
  };

  const openImage = (item) => {
    setSelectedImage(item);
    setCurrentIndex(filteredGallery.indexOf(item));
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
            "linear-gradient(135deg, rgba(88, 28, 135, 0.92), rgba(147, 51, 234, 0.72)), url('https://source.unsplash.com/featured/1600x900?ghana,gallery')",
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
              Photo Gallery
            </h1>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-purple-100 leading-relaxed">
              Discover moments from our projects, events, training programs, and community engagement
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
                placeholder="Search by image title..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
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
                  onClick={() => setSelectedCategory("")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === ""
                      ? "bg-purple-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedCategory === category
                        ? "bg-purple-700 text-white"
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
            <span className="font-semibold">{filteredGallery.length}</span> image
            {filteredGallery.length !== 1 ? "s" : ""}
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* MASONRY GALLERY */}
      {/* ========================================= */}

      {filteredGallery.length === 0 ? (
        <motion.section
          className="py-20 md:py-32 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-6">No gallery items found.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("");
                }}
                className="text-purple-700 font-semibold hover:text-purple-800 transition"
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
            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
              {filteredGallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="break-inside-avoid mb-6 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  onClick={() => openImage(item)}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                    <LazyImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <p className="text-sm font-semibold">Click to View</p>
                        <p className="text-xs mt-1">{item.title}</p>
                      </div>
                    </div>

                    {/* Category Badge */}
                    {item.category && (
                      <div className="absolute top-3 right-3 bg-purple-700 text-white text-xs px-3 py-1 rounded-full">
                        {item.category.name}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ========================================= */}
      {/* LIGHTBOX MODAL */}
      {/* ========================================= */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:bg-white/10 p-2 rounded-full transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={32} />
            </motion.button>

            {/* Main Image Container */}
            <motion.div
              className="flex-1 flex items-center justify-center max-w-4xl w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <LazyImage
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />

              {/* Navigation Buttons */}
              {filteredGallery.length > 1 && (
                <>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 p-3 rounded-full transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft size={28} />
                  </motion.button>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 p-3 rounded-full transition"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight size={28} />
                  </motion.button>
                </>
              )}
            </motion.div>

            {/* Image Info */}
            <motion.div
              className="w-full max-w-4xl mt-8 bg-black/50 rounded-lg p-6 text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              {selectedImage.category && (
                <p className="text-purple-300 mb-3">
                  Category: {selectedImage.category.name}
                </p>
              )}
              <p className="text-sm text-gray-300">
                Image {currentIndex + 1} of {filteredGallery.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
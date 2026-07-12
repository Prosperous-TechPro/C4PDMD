/**
 * =====================================================
 * TEAM PAGE
 * =====================================================
 * Professional team directory with member profiles
 * =====================================================
 */

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Mail,
  Phone,
  Globe,
  MapPin,
  Briefcase,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";

import { getTeamMembers } from "../../api/team/teamApi";
import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";
import LazyImage from "../../components/common/LazyImage";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Team = () => {
  // SEO Meta Tags
  useEffect(() => {
    document.title = "Team — C4PDMD NGO";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Meet the experienced team behind C4PDMD. Professionals committed to development, innovation, and sustainable impact."
      );
    }
  }, []);

  // State
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  // Fetch team
  const { data, isLoading, error } = useQuery({
    queryKey: ["public-team"],
    queryFn: getTeamMembers,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorMessage message="Unable to load team members." />;
  }

  const members = data?.data || [];

  const filteredMembers = members.filter((member) => {
    const biography = member.biography || member.bio || "";

    return (
      member.name?.toLowerCase().includes(search.toLowerCase()) ||
      member.position?.toLowerCase().includes(search.toLowerCase()) ||
      member.department?.toLowerCase().includes(search.toLowerCase()) ||
      biography.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Get unique departments
  const departments = [
    ...new Set(
      members.map((m) => m.department).filter(Boolean)
    ),
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
            "linear-gradient(135deg, rgba(67, 56, 202, 0.94), rgba(99, 102, 241, 0.74)), url('https://source.unsplash.com/featured/1600x900?ghana,team')",
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
              Meet Our Team
            </h1>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-indigo-100 leading-relaxed">
              Experienced professionals dedicated to development, innovation, and sustainable impact
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
                placeholder="Search by name, position, or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredMembers.length}</span> team
            member{filteredMembers.length !== 1 ? "s" : ""}
          </div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* TEAM GRID */}
      {/* ========================================= */}

      {filteredMembers.length === 0 ? (
        <motion.section
          className="py-20 md:py-32 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-6">No team members found.</p>
              <button
                onClick={() => setSearch("")}
                className="text-indigo-700 font-semibold hover:text-indigo-800 transition"
              >
                Clear Search
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedMember(member)}
                >
                  {/* Member Image */}
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-indigo-200 to-indigo-100">
                    {member.image ? (
                      <LazyImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-indigo-400">
                        <Briefcase size={64} />
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded-lg font-medium transition">
                        View Full Profile
                      </button>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {member.name}
                    </h3>

                    <p className="text-indigo-700 font-semibold text-sm mt-2">
                      {member.position}
                    </p>

                    {member.department && (
                      <p className="text-gray-600 text-sm mt-1">
                        {member.department}
                      </p>
                    )}

                    {member.biography || member.bio ? (
                      <p className="text-gray-600 text-xs mt-3 line-clamp-2">
                        {member.biography || member.bio}
                      </p>
                    ) : null}

                    {/* Social Links Preview */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {member.email && (
                        <motion.a
                          href={`mailto:${member.email}`}
                          className="inline-flex items-center gap-1 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700 transition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Mail size={12} />
                          Email
                        </motion.a>
                      )}
                      {member.linkedin && (
                        <motion.a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700 transition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaLinkedin size={12} />
                          LinkedIn
                        </motion.a>
                      )}
                      {member.twitter && (
                        <motion.a
                          href={member.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-700 transition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaTwitter size={12} />
                          X
                        </motion.a>
                      )}
                      {member.facebook && (
                        <motion.a
                          href={member.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700 transition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaFacebook size={12} />
                          Facebook
                        </motion.a>
                      )}
                      {member.whatsapp && (
                        <motion.a
                          href={member.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-green-100 bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700 transition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaWhatsapp size={12} />
                          WhatsApp
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ========================================= */}
      {/* PROFILE MODAL */}
      {/* ========================================= */}

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedMember(null)}
                className="sticky top-0 right-0 ml-auto p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} />
              </motion.button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Member Image */}
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-indigo-200 to-indigo-100 mb-4">
                    {selectedMember.image ? (
                      <LazyImage
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-indigo-400">
                        <Briefcase size={96} />
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 w-full justify-center">
                    {selectedMember.email && (
                      <motion.a
                        href={`mailto:${selectedMember.email}`}
                        className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 rounded-full transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail size={20} />
                      </motion.a>
                    )}
                    {selectedMember.linkedin && (
                      <motion.a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-full transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaLinkedin size={20} />
                      </motion.a>
                    )}
                    {selectedMember.twitter && (
                      <motion.a
                        href={selectedMember.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-400 rounded-full transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTwitter size={20} />
                      </motion.a>
                    )}
                    {selectedMember.facebook && (
                      <motion.a
                        href={selectedMember.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-700 rounded-full transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaFacebook size={20} />
                      </motion.a>
                    )}
                    {selectedMember.whatsapp && (
                      <motion.a
                        href={selectedMember.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 rounded-full transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaWhatsapp size={20} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Member Details */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedMember.name}
                  </h2>

                  <p className="text-indigo-700 text-lg font-semibold mb-4">
                    {selectedMember.position}
                  </p>

                  {selectedMember.department && (
                    <div className="flex items-center text-gray-600 mb-4">
                      <Briefcase size={18} className="mr-2" />
                      <span>{selectedMember.department}</span>
                    </div>
                  )}

                  {(selectedMember.biography || selectedMember.bio) && (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {selectedMember.biography || selectedMember.bio}
                      </p>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="space-y-3">
                    {selectedMember.email && (
                      <div className="flex items-center text-gray-700">
                        <Mail size={18} className="mr-3 text-indigo-600" />
                        <a
                          href={`mailto:${selectedMember.email}`}
                          className="hover:text-indigo-700 transition"
                        >
                          {selectedMember.email}
                        </a>
                      </div>
                    )}

                    {selectedMember.phone && (
                      <div className="flex items-center text-gray-700">
                        <Phone size={18} className="mr-3 text-indigo-600" />
                        <a
                          href={`tel:${selectedMember.phone}`}
                          className="hover:text-indigo-700 transition"
                        >
                          {selectedMember.phone}
                        </a>
                      </div>
                    )}

                    {selectedMember.location && (
                      <div className="flex items-center text-gray-700">
                        <MapPin size={18} className="mr-3 text-indigo-600" />
                        <span>{selectedMember.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;
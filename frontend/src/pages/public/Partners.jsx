/**
 * =====================================================
 * PARTNERS PAGE
 * =====================================================
 * Public Partners Page
 * =====================================================
 */

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Search, Globe } from "lucide-react";

import { getPartners } from "../../api/partners/partnerApi";

import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";

const Partners = () => {
  const socialLinks = (partner) => [
    { label: "LinkedIn", url: partner.linkedin },
    { label: "Facebook", url: partner.facebook },
    { label: "X", url: partner.twitter },
    { label: "WhatsApp", url: partner.whatsapp },
  ].filter((item) => item.url);
  /**
   * =====================================================
   * STATE
   * =====================================================
   */

  const [search, setSearch] =
    useState("");

  /**
   * =====================================================
   * FETCH PARTNERS
   * =====================================================
   */

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["public-partners"],
    queryFn: getPartners,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <ErrorMessage message="Failed to load partners." />
    );
  }

  const partners =
    data?.data || [];

  const filteredPartners =
    partners.filter((partner) =>
      partner.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div>

      {/* ====================================== */}
      {/* HERO */}
      {/* ====================================== */}

      <section
        className="text-white py-24"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(30, 64, 175, 0.94), rgba(59, 130, 246, 0.76)), url('https://source.unsplash.com/featured/1600x900?ghana,partnership')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="container mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            Our Partners
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg">
            We collaborate with
            organizations that share our
            commitment to research,
            innovation, education and
            sustainable development.
          </p>

        </div>

      </section>

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <section className="py-20">

        <div className="container mx-auto px-6">

          {/* Search */}

          <div className="relative mb-10">

            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search partners..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full border rounded-lg py-3 pl-12 pr-4"
            />

          </div>

          {filteredPartners.length ===
          0 ? (

            <div className="text-center py-20 text-gray-500">

              No partners found.

            </div>

          ) : (

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

              {filteredPartners.map(
                (partner) => (

                  <div
                    key={partner.id}
                    className="
                      bg-white
                      rounded-xl
                      shadow
                      hover:shadow-xl
                      hover:-translate-y-1
                      transition-all
                      duration-300
                      p-6
                      flex
                      flex-col
                      items-center
                      text-center
                    "
                  >

                    {partner.logo ? (

                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-28 object-contain mb-6"
                      />

                    ) : (

                      <div className="h-28 w-full bg-gray-100 rounded-lg flex items-center justify-center mb-6">

                        <span className="text-gray-400">
                          No Logo
                        </span>

                      </div>

                    )}

                    <h3 className="text-xl font-bold">

                      {partner.name}

                    </h3>

                    {partner.description && (
                      <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                        {partner.description}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          <Globe size={18} />
                          Visit Website
                        </a>
                      )}
                    </div>

                    {socialLinks(partner).length > 0 && (
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {socialLinks(partner).map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default Partners;
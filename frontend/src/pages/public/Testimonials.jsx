/**
 * =====================================================
 * TESTIMONIALS PAGE
 * =====================================================
 * Public Testimonials Page
 * =====================================================
 */

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Search, Quote } from "lucide-react";

import { getTestimonials } from "../../api/testimonials/testimonialApi";

import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";

const Testimonials = () => {
  /**
   * =====================================================
   * STATE
   * =====================================================
   */

  const [search, setSearch] =
    useState("");

  /**
   * =====================================================
   * FETCH TESTIMONIALS
   * =====================================================
   */

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["public-testimonials"],
    queryFn: getTestimonials,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <ErrorMessage message="Failed to load testimonials." />
    );
  }

  const testimonials =
    data?.data || [];

  const filteredTestimonials =
    testimonials.filter((testimonial) => {
      return (
        testimonial.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        testimonial.message
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    });

  return (
    <div>

      {/* ====================================== */}
      {/* HERO */}
      {/* ====================================== */}

      <section className="bg-blue-700 text-white py-24">

        <div className="container mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            Testimonials
          </h1>

          <p className="mt-6 text-lg max-w-3xl mx-auto">
            Hear from our partners,
            beneficiaries and clients about
            their experiences working with
            the Center for Prim-Data
            Measurement and Development.
          </p>

        </div>

      </section>

      {/* ====================================== */}
      {/* SEARCH */}
      {/* ====================================== */}

      <section className="py-12">

        <div className="container mx-auto px-6">

          <div className="relative mb-10">

            <Search
              size={20}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search testimonials..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full border rounded-lg py-3 pl-12 pr-4"
            />

          </div>

          {filteredTestimonials.length ===
          0 ? (

            <div className="text-center py-20 text-gray-500">

              No testimonials found.

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredTestimonials.map(
                (testimonial) => (

                  <div
                    key={testimonial.id}
                    className="
                      bg-white
                      rounded-xl
                      shadow
                      hover:shadow-xl
                      transition-all
                      duration-300
                      p-8
                      relative
                    "
                  >

                    <div className="absolute top-6 right-6 text-blue-100">

                      <Quote size={50} />

                    </div>

                    <div className="flex flex-col items-center">

                      {testimonial.image ? (

                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          loading="lazy"
                          decoding="async"
                          className="
                            w-24
                            h-24
                            rounded-full
                            object-cover
                            border-4
                            border-blue-100
                          "
                        />

                      ) : (

                        <div
                          className="
                            w-24
                            h-24
                            rounded-full
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            text-3xl
                            font-bold
                            text-blue-700
                          "
                        >
                          {testimonial.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                      )}

                      <h3 className="mt-6 text-xl font-bold text-center">

                        {testimonial.name}

                      </h3>

                    </div>

                    <p className="mt-6 text-gray-600 leading-8 text-center italic">

                      "{testimonial.message}"

                    </p>

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

export default Testimonials;
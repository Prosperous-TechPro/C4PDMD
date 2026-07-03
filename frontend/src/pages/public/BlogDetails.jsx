/**
 * =====================================================
 * BLOG DETAILS PAGE
 * =====================================================
 * Public Blog Details Page
 * =====================================================
 */

import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  Calendar,
  ArrowLeft,
  Share2,
  Tag,
} from "lucide-react";

import {
  getBlogById,
  getBlogs,
} from "../../api/blog/blogApi";

import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";

const BlogDetails = () => {
  /**
   * =====================================================
   * PARAMS
   * =====================================================
   */

  const { id } = useParams();

  /**
   * =====================================================
   * FETCH BLOG
   * =====================================================
   */

  const {
    data: blogData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });

  /**
   * =====================================================
   * FETCH RELATED POSTS
   * =====================================================
   */

  const { data: blogsData } =
    useQuery({
      queryKey: ["blogs"],
      queryFn: getBlogs,
    });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <ErrorMessage message="Unable to load blog post." />
    );
  }

  const blog = blogData?.data;

  const relatedBlogs =
    blogsData?.data
      ?.filter(
        (item) =>
          item.id !== blog?.id &&
          item.status ===
            "PUBLISHED"
      )
      ?.slice(0, 3) || [];

  /**
   * =====================================================
   * SHARE
   * =====================================================
   */

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.title,
          url: window.location.href,
        });
      } catch (e) {
        console.warn("Share failed", e);
      }
    } else {
      await navigator.clipboard.writeText(
        window.location.href
      );

      alert(
        "Blog link copied to clipboard."
      );
    }
  };

  return (
    <div>

      {/* ====================================== */}
      {/* HERO IMAGE */}
      {/* ====================================== */}

      {blog?.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[500px] object-cover"
        />
      )}

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <section className="py-16">

        <div className="container mx-auto px-6 max-w-5xl">

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft size={18} />

            Back to Blog
          </Link>

          <div className="flex flex-col lg:flex-row justify-between gap-8">

            <div>

              <h1 className="text-4xl font-bold">
                {blog?.title}
              </h1>

              <div className="flex flex-wrap gap-5 mt-5 text-gray-500">

                <div className="flex items-center gap-2">

                  <Calendar size={18} />

                  {blog?.createdAt
                    ? new Date(
                        blog.createdAt
                      ).toLocaleDateString()
                    : "-"}

                </div>

                {blog?.category && (
                  <div className="flex items-center gap-2">

                    <Tag size={18} />

                    {
                      blog.category
                        .name
                    }

                  </div>
                )}

              </div>

            </div>

            <button
              onClick={handleShare}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 h-fit"
            >
              <Share2 size={18} />

              Share
            </button>

          </div>

          <article className="mt-12">

            <div className="prose max-w-none prose-lg">

              <p className="whitespace-pre-line leading-8 text-gray-700">

                {blog?.content}

              </p>

            </div>

          </article>

          {/* ====================================== */}
          {/* RELATED POSTS */}
          {/* ====================================== */}

          {relatedBlogs.length >
            0 && (

            <section className="mt-20">

              <h2 className="text-3xl font-bold mb-8">
                Related Posts
              </h2>

              <div className="grid md:grid-cols-3 gap-8">

                {relatedBlogs.map(
                  (
                    related
                  ) => (

                    <Link
                      key={
                        related.id
                      }
                      to={`/blog/${related.id}`}
                      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                    >

                      {related.image && (

                        <img
                          src={
                            related.image
                          }
                          alt={
                            related.title
                          }
                          className="w-full h-52 object-cover"
                        />

                      )}

                      <div className="p-5">

                        <h3 className="font-bold text-xl">

                          {
                            related.title
                          }

                        </h3>

                        <p className="mt-3 text-gray-600 line-clamp-3">

                          {
                            related.content
                          }

                        </p>

                      </div>

                    </Link>

                  )
                )}

              </div>

            </section>

          )}

        </div>

      </section>

    </div>
  );
};

export default BlogDetails;
import { Link } from "react-router-dom";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaGlobe,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[var(--surface-strong)] text-white">

      <div className="app-container py-10">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Organization */}

          <div>

            <h2 className="text-2xl font-bold mb-4">
              C4PDMD
            </h2>

            <p className="text-white/75 leading-7">

              Center for Prim-Data Measurement
              and Development. Empowering
              communities through research,
              innovation and sustainable
              development.

            </p>

          </div>

          {/* Quick Links */}

          <details className="group">
            <summary className="flex items-center justify-between font-semibold text-lg mb-4 cursor-pointer list-none">
              Quick Links
              <span className="text-[var(--accent)] group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <div className="space-y-2 pl-2">

                <Link to="/" className="block hover:text-[var(--accent)]">
                Home
              </Link>

                <Link to="/about" className="block hover:text-[var(--accent)]">
                About
              </Link>

                <Link to="/services" className="block hover:text-[var(--accent)]">
                Services
              </Link>

                <Link to="/projects" className="block hover:text-[var(--accent)]">
                Projects
              </Link>

                <Link to="/blog" className="block hover:text-[var(--accent)]">
                Blog
              </Link>

                <Link to="/contact" className="block hover:text-[var(--accent)]">
                Contact
              </Link>

            </div>

          </details>

          {/* Get Involved */}

          <details className="group">
            <summary className="flex items-center justify-between font-semibold text-lg mb-4 cursor-pointer list-none">
              Get Involved
              <span className="text-[var(--accent)] group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <div className="space-y-2 pl-2">

                <Link to="/volunteer" className="block hover:text-[var(--accent)]">
                Volunteer
              </Link>

                <Link to="/donate" className="block hover:text-[var(--accent)]">
                Donate
              </Link>

                <Link to="/partners" className="block hover:text-[var(--accent)]">
                Partners
              </Link>

                <Link to="/team" className="block hover:text-[var(--accent)]">
                Our Team
              </Link>

                <Link to="/gallery" className="block hover:text-[var(--accent)]">
                Gallery
              </Link>

            </div>

          </details>

          {/* Contact */}

          <details className="group">
            <summary className="flex items-center justify-between font-semibold text-lg mb-4 cursor-pointer list-none">
              Contact
              <span className="text-[var(--accent)] group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <div className="space-y-4 pl-2">

              <div className="flex gap-3">

                <FaMapMarkerAlt className="text-[var(--accent)] mt-1" />

                <span>Ho, Ghana</span>

              </div>

              <div className="flex gap-3 items-center">

                <FaPhone className="text-[var(--accent)] mt-1" />

                <a
                  href="tel:+233242406733"
                  className="hover:text-[var(--accent)] transition"
                >
                  +233 242 406 733
                </a>

              </div>

              <div className="flex gap-3 items-center">

                <FaEnvelope className="text-[var(--accent)] mt-1" />

                <a
                  href="mailto:c4pdmd@gmail.com"
                  className="hover:text-[var(--accent)] transition"
                >
                  c4pdmd@gmail.com
                </a>

              </div>

              <div className="flex gap-4 pt-2">

                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-[var(--accent)] transition"
                >
                  <FaFacebook />
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="hover:text-yellow-400 transition"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="#"
                  aria-label="Website"
                  className="hover:text-yellow-400 transition"
                >
                  <FaGlobe />
                </a>

              </div>

            </div>

          </details>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-white/10">

        <div className="app-container py-5 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">

          <p className="text-white/65 text-sm">

            © {new Date().getFullYear()} C4PDMD.
            All Rights Reserved.

          </p>

          <p className="text-white/65 text-sm">

            Designed & Developed by
            <span className="font-semibold text-white">
              {" "}Prosperous TechPro
            </span>

          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
              className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] p-3 rounded-full transition"
          >

            <FaArrowUp />

          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
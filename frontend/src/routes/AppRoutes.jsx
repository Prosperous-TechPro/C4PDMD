/**
 * =====================================================
 * APPLICATION ROUTES
 * =====================================================
 * Handles all application routing.
 * =====================================================
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

/* =====================================================
  LAYOUTS (lazy)
===================================================== */

const PublicLayout = lazy(() => import("../layouts/PublicLayout"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));

/* =====================================================
   ROUTE GUARDS
===================================================== */

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

/* =====================================================
   AUTH
===================================================== */

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const VerifyAccount = lazy(() => import("../pages/auth/VerifyAccount"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));

/* =====================================================
   PUBLIC PAGES
===================================================== */

const Home = lazy(() => import("../pages/public/Home"));
const About = lazy(() => import("../pages/public/About"));
const Services = lazy(() => import("../pages/public/Services"));
const Projects = lazy(() => import("../pages/public/Projects"));
const ProjectDetails = lazy(() => import("../pages/public/ProjectDetails"));
const Blog = lazy(() => import("../pages/public/Blog"));
const BlogDetails = lazy(() => import("../pages/public/BlogDetails"));
const Gallery = lazy(() => import("../pages/public/Gallery"));
const Team = lazy(() => import("../pages/public/Team"));
const Partners = lazy(() => import("../pages/public/Partners"));
const Testimonials = lazy(() => import("../pages/public/Testimonials"));
const Volunteer = lazy(() => import("../pages/public/Volunteer"));
const Donate = lazy(() => import("../pages/public/Donate"));
const Contact = lazy(() => import("../pages/public/Contact"));
const NotFound = lazy(() => import("../pages/public/not-found/NotFound"));

/* =====================================================
   DASHBOARD
===================================================== */

const DashboardHome = lazy(() => import("../pages/dashboard/DashboardHome"));

/* ================= USERS ================= */

const UsersManagement = lazy(() => import("../pages/dashboard/users/UsersManagement"));
const EditUser = lazy(() => import("../pages/dashboard/users/EditUser"));

/* ================= TEAM ================= */

const TeamManagement = lazy(() => import("../pages/dashboard/team/TeamManagement"));
const EditTeam = lazy(() => import("../pages/dashboard/team/EditTeam"));

/* ================= SERVICES ================= */

const ServicesManagement = lazy(() => import("../pages/dashboard/services/ServicesManagement"));
const EditService = lazy(() => import("../pages/dashboard/services/EditService"));

/* ================= PROJECTS ================= */

const ProjectsManagement = lazy(() => import("../pages/dashboard/projects/ProjectsManagement"));
const EditProject = lazy(() => import("../pages/dashboard/projects/EditProject"));

/* ================= BLOG ================= */

const BlogManagement = lazy(() => import("../pages/dashboard/blog/BlogManagement"));
const EditBlog = lazy(() => import("../pages/dashboard/blog/EditBlog"));
const BlogCategoriesManagement = lazy(() => import("../pages/dashboard/blog/BlogCategoriesManagement"));

/* ================= GALLERY ================= */

const GalleryManagement = lazy(() => import("../pages/dashboard/gallery/GalleryManagement"));
const EditGallery = lazy(() => import("../pages/dashboard/gallery/EditGallery"));

/* ================= PARTNERS ================= */

const PartnersManagement = lazy(() => import("../pages/dashboard/partners/PartnersManagement"));
const EditPartner = lazy(() => import("../pages/dashboard/partners/EditPartner"));

/* ================= TESTIMONIALS ================= */

const TestimonialsManagement = lazy(() => import("../pages/dashboard/testimonials/TestimonialsManagement"));
const EditTestimonial = lazy(() => import("../pages/dashboard/testimonials/EditTestimonial"));

/* ================= VOLUNTEERS ================= */

const VolunteersManagement = lazy(() => import("../pages/dashboard/volunteers/VolunteersManagement"));
const EditVolunteer = lazy(() => import("../pages/dashboard/volunteers/EditVolunteer"));

/* ================= DONATIONS ================= */

const DonationsManagement = lazy(() => import("../pages/dashboard/donations/DonationsManagement"));
const EditDonation = lazy(() => import("../pages/dashboard/donations/EditDonation"));
const WithdrawalsManagement = lazy(() => import("../pages/dashboard/donations/WithdrawalsManagement"));

/* ================= CONTACTS ================= */

const ContactsManagement = lazy(() => import("../pages/dashboard/contacts/ContactsManagement"));
const EditContact = lazy(() => import("../pages/dashboard/contacts/EditContact"));

/* ================= MESSAGES ================= */

const MessagesManagement = lazy(() => import("../pages/dashboard/messages/MessagesManagement"));

/* ================= SETTINGS ================= */

const AccountSettings = lazy(() => import("../pages/dashboard/settings/AccountSettings"));
const OrganizationSettings = lazy(() => import("../pages/dashboard/settings/OrganizationSettings"));

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-slate-500">Loading...</div>}>

      <Routes>

        {/* ==========================================
            PUBLIC WEBSITE
        ========================================== */}

        <Route element={<PublicLayout />}>

          <Route
            index
            element={<Home />}
          />

          <Route
            path="about"
            element={<About />}
          />

          <Route
            path="services"
            element={<Services />}
          />

          <Route
            path="projects"
            element={<Projects />}
          />

          <Route
            path="projects/:id"
            element={<ProjectDetails />}
          />

          <Route
            path="blog"
            element={<Blog />}
          />

          <Route
            path="blog/:id"
            element={<BlogDetails />}
          />

          <Route
            path="gallery"
            element={<Gallery />}
          />

          <Route
            path="team"
            element={<Team />}
          />

          <Route
            path="partners"
            element={<Partners />}
          />

          <Route
            path="testimonials"
            element={<Testimonials />}
          />

          <Route
            path="volunteer"
            element={<Volunteer />}
          />

          <Route
            path="donate"
            element={<Donate />}
          />

          <Route
            path="contact"
            element={<Contact />}
          />

        </Route>

        {/* ==========================================
            LOGIN
        ========================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route path="/register" element={<Register />} />

        <Route path="/verify-account" element={<VerifyAccount />} />
        
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
        
          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

        {/* ==========================================
            DASHBOARD
        ========================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<DashboardHome />}
          />

          {/* USERS */}

          <Route
            path="users"
            element={
              <RoleProtectedRoute roles={["Admin", "SUPER_ADMIN"]}>
                <UsersManagement />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="users/edit/:id"
            element={
              <RoleProtectedRoute roles={["Admin", "SUPER_ADMIN"]}>
                <EditUser />
              </RoleProtectedRoute>
            }
          />

          {/* TEAM */}

          <Route
            path="team"
            element={<TeamManagement />}
          />

          <Route
            path="team/edit/:id"
            element={<EditTeam />}
          />

          {/* SERVICES */}

          <Route
            path="services"
            element={<ServicesManagement />}
          />

          <Route
            path="services/edit/:id"
            element={<EditService />}
          />

          {/* PROJECTS */}

          <Route
            path="projects"
            element={<ProjectsManagement />}
          />

          <Route
            path="projects/edit/:id"
            element={<EditProject />}
          />

          {/* BLOG */}

          <Route
            path="blogs"
            element={<BlogManagement />}
          />

          <Route
            path="blogs/categories"
            element={<BlogCategoriesManagement />}
          />

          <Route
            path="blogs/edit/:id"
            element={<EditBlog />}
          />

          {/* GALLERY */}

          <Route
            path="gallery"
            element={<GalleryManagement />}
          />

          <Route
            path="gallery/edit/:id"
            element={<EditGallery />}
          />

          {/* PARTNERS */}

          <Route
            path="partners"
            element={<PartnersManagement />}
          />

          <Route
            path="partners/edit/:id"
            element={<EditPartner />}
          />

          {/* TESTIMONIALS */}

          <Route
            path="testimonials"
            element={<TestimonialsManagement />}
          />

          <Route
            path="testimonials/edit/:id"
            element={<EditTestimonial />}
          />

          {/* VOLUNTEERS */}

          <Route
            path="volunteers"
            element={<VolunteersManagement />}
          />

          <Route
            path="volunteers/edit/:id"
            element={<EditVolunteer />}
          />

          {/* DONATIONS */}

          <Route
            path="donations"
            element={<DonationsManagement />}
          />

          <Route
            path="donations/withdrawals"
            element={
              <RoleProtectedRoute roles={["Admin", "SUPER_ADMIN"]}>
                <WithdrawalsManagement />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="donations/edit/:id"
            element={<EditDonation />}
          />

          {/* CONTACTS */}

          <Route
            path="contacts"
            element={<ContactsManagement />}
          />

          <Route
            path="contacts/edit/:id"
            element={<EditContact />}
          />

          {/* MESSAGES */}

          <Route
            path="messages"
            element={<MessagesManagement />}
          />

          {/* ================= ACCOUNT SETTINGS ================= */}

          <Route
             path="account"
             element={
                <ProtectedRoute>
                <AccountSettings />
                </ProtectedRoute>}
          />

          {/* ================= ORGANIZATION SETTINGS ================= */}

          <Route
            path="organization-settings"
            element={
               <RoleProtectedRoute roles={["Admin", "SUPER_ADMIN"]}>
               <OrganizationSettings />
               </RoleProtectedRoute> }
          />

</Route>

        {/* ==========================================
            404
        ========================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      </Suspense>

    </BrowserRouter>
  );
};

export default AppRoutes;
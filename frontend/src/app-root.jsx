import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import WishlistPage from "@/pages/wishlist-page";
import { useAuthStore } from "@/store/auth-store";
import { ErrorBoundary } from "@/components/error-boundary";
import { RoutePreloader } from "@/components/route-preloader";
import { ProtectedRoute } from "@/components/protected-route";
import { PackagesPageSkeleton, DashboardPageSkeleton, DetailPageSkeleton, AuthPageSkeleton, GenericPageSkeleton,  } from "@/components/ui/skeleton";

// Eager load critical routes (landing page)
import LandingPage from "@/pages/landing-page";

// Lazy load all other pages
const DestinationsPage = lazy(() => import("@/pages/destinations-page"));
const PackagesPage = lazy(() => import("@/pages/packages-page"));
const PackageDetailPage = lazy(() => import("@/pages/package-detail-page"));
const BookingPage = lazy(() => import("@/pages/booking-page"));
const BookingSuccessPage = lazy(() => import("@/pages/booking-success-page"));
const AllBookingsPage = lazy(() => import("@/pages/all-bookings-page"));
const ManagePackagesPage = lazy(() => import("@/pages/manage-packages-page"));
const CreatePackagePage = lazy(() => import("@/pages/create-package-page"));
const CreateDestinationPage = lazy(() => import("@/pages/create-destination-page"));
const EditPackagePage = lazy(() => import("@/pages/edit-package-page"));
const AboutPage = lazy(() => import("@/pages/about-page"));
const ContactPage = lazy(() => import("@/pages/contact-page"));
const HelpPage = lazy(() => import("@/pages/help-page"));
const ProfilePage = lazy(() => import("@/pages/profile-page"));
const NotFoundPage = lazy(() => import("@/pages/not-found-page"));
const TouristDashboard = lazy(() => import("@/pages/dashboard/tourist-dashboard"));
const AgentDashboard = lazy(() => import("@/pages/dashboard/agent-dashboard"));
const SignIn = lazy(() => import("@/pages/auth/sign-in").then((m) => ({ default: m.SignIn })));
const SignUp = lazy(() => import("@/pages/auth/sign-up").then((m) => ({ default: m.SignUp })));
const EditDestinationPage = lazy(() => import("@/pages/edit-destination-page"));
const ManageDestinationsPage = lazy(() => import("@/pages/manage-destinations-page"));

function DashboardRouter() {
  const { user } = useAuthStore();

  if (user?.role === "agent") {
    return <AgentDashboard />;
  }

  return <TouristDashboard />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <RoutePreloader />
        <Toaster richColors position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/packages"
            element={
              <Suspense fallback={<PackagesPageSkeleton />}>
                <PackagesPage />
              </Suspense>
            }
          />
          <Route
            path="/packages/:id"
            element={
              <Suspense fallback={<DetailPageSkeleton />}>
                <PackageDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<GenericPageSkeleton />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<GenericPageSkeleton />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="/help"
            element={
              <Suspense fallback={<GenericPageSkeleton />}>
                <HelpPage />
              </Suspense>
            }
          />
          <Route
  path="/destinations"
  element={
    <Suspense fallback={<GenericPageSkeleton />}>
      <DestinationsPage />
    </Suspense>
  }
/>


          {/* Auth */}
          <Route
            path="/sign-in"
            element={
              <Suspense fallback={<AuthPageSkeleton />}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Suspense fallback={<AuthPageSkeleton />}>
                <SignUp />
              </Suspense>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/book/:id"
            element={
              <Suspense fallback={<DetailPageSkeleton />}>
                <BookingPage />
              </Suspense>
            }
          />
          <Route
            path="/booking-success"
            element={
              <Suspense fallback={<GenericPageSkeleton />}>
                <BookingSuccessPage />
              </Suspense>
            }
          />
          <Route
            path="/all-bookings"
            element={
              <Suspense fallback={<DashboardPageSkeleton />}>
                <AllBookingsPage />
              </Suspense>
            }
          />
          <Route
            path="/manage-packages"
            element={
              <Suspense fallback={<DashboardPageSkeleton />}>
                <ManagePackagesPage />
              </Suspense>
            }
          />
          <Route
              path="/manage-destinations"
              element={

                  <Suspense fallback={<DashboardPageSkeleton />}>
                    <ManageDestinationsPage />
                  </Suspense>

              }
            />

          <Route
            path="/create-package"
            element={
              <Suspense fallback={<GenericPageSkeleton />}>
                <CreatePackagePage />
              </Suspense>
            }
          />
          <Route
            path="/create-destination"
            element={
              <Suspense fallback={<GenericPageSkeleton />}>
                <CreateDestinationPage />
              </Suspense>
            }
          />
          <Route
            path="/edit-destination/:id"
            element={
             
                <Suspense fallback={<GenericPageSkeleton />}>
                  <EditDestinationPage />
                </Suspense>
           
            }
          />

          <Route
            path="/edit-package/:id"
            element={
              <Suspense fallback={<GenericPageSkeleton />}>
                <EditPackagePage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<DashboardPageSkeleton />}>
                <DashboardRouter />
              </Suspense>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PackagesPageSkeleton />}>
                  <WishlistPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<GenericPageSkeleton />}>
                <ProfilePage />
              </Suspense>
            }
          />
          <Route
            path="/agent/dashboard"
            element={
              <Suspense fallback={<DashboardPageSkeleton />}>
                <AgentDashboard />
              </Suspense>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <Suspense fallback={<GenericPageSkeleton />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

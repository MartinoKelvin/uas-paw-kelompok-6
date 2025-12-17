import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { ROUTES } from "@/lib/constants";
export function useAuthGuard(options = {}) {
  const { redirectTo = ROUTES.SIGN_IN, requiredRole } = options;
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo);
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      const dashboardRoute =
        user?.role === "tourist" ? ROUTES.TOURIST_DASHBOARD : ROUTES.AGENT_DASHBOARD;
      navigate(dashboardRoute);
      return;
    }
  }, [isAuthenticated, user, requiredRole, navigate, redirectTo]);

  // Derive authorization state instead of storing it
  const isAuthorized = isAuthenticated && (!requiredRole || user?.role === requiredRole);

  return { isAuthorized, user };
}

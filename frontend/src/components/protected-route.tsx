import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { Spinner } from "@/components/ui/spinner";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ("tourist" | "agent")[];
}

export function ProtectedRoute({
    children,
    allowedRoles,
}: ProtectedRouteProps) {
    const { user, isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner className="h-8 w-8" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}

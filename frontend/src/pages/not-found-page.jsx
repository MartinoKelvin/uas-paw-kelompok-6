import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layout/main-layout";
import { useSEO } from "@/hooks/use-seo";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useSEO({
    title: "404 - Page Not Found",
    description:
      "The page you're looking for could not be found. Return to Wonderfull Inn home page to continue exploring.",
    keywords: "404, page not found, error page",
  });

  return (
    <MainLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-primary text-9xl font-bold">404</h1>
          <h2 className="text-foreground text-3xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md">
            Sorry, we couldn't find the page you're looking for. The page might have been removed,
            had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex gap-4">
          <Button onClick={() => navigate(-1)} variant="outline" className="border-border">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

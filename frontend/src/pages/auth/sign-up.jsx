import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { useSEO } from "@/hooks/use-seo";
import * as authService from "@/services/auth.service";

const SignUp = ({
  heading = "Create Your Account",
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "Wonderfull Inn",
    title: "Wonderfull Inn",
  },
  buttonText = "Create Account",
  signupText = "Already have an account?",
  signupUrl = "/sign-in",
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("tourist");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useSEO({
    title: "Sign Up",
    description:
      "Create your Wonderfull Inn account to start booking amazing travel packages and planning your dream vacation.",
    keywords: "sign up, register, create account, new user registration",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authService.register({ name, email, password, role });

      // Registration successful - redirect to sign-in page
      // Backend doesn't return token, so user needs to login after registering
      toast.success(`Account created for ${response.user.name} Please sign in.`);
      navigate("/sign-in");
    } catch (error) {
      // Error is already handled by API interceptor
      const err = error;
      if (err.response?.data?.error) {
        // Handle duplicate email error
        if (err.response.data.error.includes("duplicate key")) {
          toast.error("Email already registered. Please use a different email.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="bg-muted min-h-screen">
      <div className="flex min-h-screen items-center justify-center px-4 py-6">
        <div className="flex w-full max-w-sm flex-col items-center gap-3 sm:max-w-md sm:gap-6">
          <a href={logo.url}>
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-8 sm:h-10 dark:invert"
            />
          </a>
          <form
            onSubmit={handleSubmit}
            className="border-muted bg-background flex w-full flex-col gap-y-3 rounded-lg border px-4 py-5 shadow-md sm:gap-y-4 sm:px-6 sm:py-8"
          >
            {heading && <h1 className="text-center text-lg font-semibold sm:text-xl">{heading}</h1>}

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tourist">Tourist</SelectItem>
                  <SelectItem value="agent">Travel Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <span>Creating account...</span>
                </div>
              ) : (
                buttonText
              )}
            </Button>
          </form>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a href={signupUrl} className="text-primary font-medium hover:underline">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SignUp };

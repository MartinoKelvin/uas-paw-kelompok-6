import { useState } from "react";
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
import { hashPassword } from "@/lib/crypto";
import { useSEO } from "@/hooks/use-seo";

interface SignInProps {
  heading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
}

const SignIn = ({
  heading = "Sign In to Wanderlust Inn",
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "Wanderlust Inn",
    title: "Wanderlust Inn",
  },
  buttonText = "Sign In",
  signupText = "Don't have an account?",
  signupUrl = "/sign-up",
}: SignInProps) => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"tourist" | "agent">("tourist");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useSEO({
    title: "Sign In",
    description:
      "Sign in to your Wanderlust Inn account to manage your bookings and explore travel packages.",
    keywords: "sign in, login, account access, user authentication",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy authentication - in real app, this would validate credentials
    // Password is hashed using SHA-256 before comparison with stored hash
    if (email && password) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        // Use consistent user IDs for demo purposes
        const userId = role === "tourist" ? "tourist-demo" : "agent1";

        // Hash password for authentication (in production, compare with stored hash)
        const hashedPassword = hashPassword(password);

        const dummyUser = {
          id: userId,
          name: email.split("@")[0],
          email: email,
          password: hashedPassword,
          role: role,
        };

        login(dummyUser);
        toast.success(`Welcome back, ${dummyUser.name}!`);
        navigate("/dashboard");
        setIsSubmitting(false);
      }, 800);
    } else {
      toast.error("Please fill in all fields");
    }
  };
  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center px-4">
        <div className="flex w-full max-w-md flex-col items-center gap-6">
          <a href={logo.url}>
            <img src={logo.src} alt={logo.alt} title={logo.title} className="h-10 dark:invert" />
          </a>
          <form
            onSubmit={handleSubmit}
            className="border-muted bg-background flex w-full flex-col gap-y-4 rounded-md border px-6 py-8 shadow-md"
          >
            {heading && <h1 className="text-center text-xl font-semibold">{heading}</h1>}

            <div className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select value={role} onValueChange={(value) => setRole(value as "tourist" | "agent")}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tourist">Tourist</SelectItem>
                  <SelectItem value="agent">Travel Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <span>Signing in...</span>
                </div>
              ) : (
                buttonText
              )}
            </Button>

            <div className="bg-muted/50 border-border rounded-md border p-3 text-xs">
              <p className="text-muted-foreground mb-1 font-semibold">Demo Mode:</p>
              <p className="text-muted-foreground">
                Enter any email/password and select your role to login.
              </p>
              <p className="text-muted-foreground mt-1">
                • <span className="font-medium">Tourist</span>: View bookings and packages
                <br />• <span className="font-medium">Agent</span>: Manage packages and bookings
              </p>
            </div>
          </form>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a href={signupUrl} className="text-primary font-medium hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SignIn };

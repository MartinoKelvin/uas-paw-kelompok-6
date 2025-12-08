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

interface SignUpProps {
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

const SignUp = ({
  heading = "Create Your Account",
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "Wanderlust Inn",
    title: "Wanderlust Inn",
  },
  buttonText = "Create Account",
  signupText = "Already have an account?",
  signupUrl = "/sign-in",
}: SignUpProps) => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"tourist" | "agent">("tourist");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useSEO({
    title: "Sign Up",
    description:
      "Create your Wanderlust Inn account to start booking amazing travel packages and planning your dream vacation.",
    keywords: "sign up, register, create account, new user registration",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (name && email && password) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        // Use consistent user IDs for demo purposes
        const userId = role === "tourist" ? "tourist-demo" : "agent1";

        // Hash password before storing
        const hashedPassword = hashPassword(password);

        const newUser = {
          id: userId,
          name: name,
          email: email,
          password: hashedPassword,
          role: role,
        };

        register(newUser);
        toast.success(`Welcome to Wanderlust Inn, ${newUser.name}!`);
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
                placeholder="Create a password"
                className="text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
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

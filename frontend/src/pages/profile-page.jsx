import { useState } from "react";
import MainLayout from "@/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth-store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, Shield, Bell, CreditCard, Loader2 } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import * as authService from "@/services/auth.service";

export default function ProfilePage() {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate();

  // Move all hooks before any conditional returns
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useSEO({
    title: "My Profile",
    description:
      "Manage your Wonderfull Inn account settings, personal information, and preferences.",
    keywords: "profile, account settings, user preferences, personal information",
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/sign-in");
    return null;
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      const response = await authService.updateProfile({
        name: profileData.name,
        email: profileData.email,
      });

      // Update user in store
      setUser(response.user);
      toast.success("Profile updated successfully!");
    } catch (error) {
      const err = error;
      toast.error(err.response?.data?.error || "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters!");
      return;
    }

    setIsChangingPassword(true);

    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      const err = error;
      toast.error(err.response?.data?.error || "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <MainLayout>
      <section className="space-y-8 py-2 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20 md:h-24 md:w-24">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {getInitials(user?.name || "U")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-foreground text-2xl font-bold md:text-3xl">{user?.name}</h1>
            <p className="text-muted-foreground text-sm md:text-base">{user?.email}</p>
            <div className="bg-primary/10 text-primary mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium">
              {user?.role === "agent" ? "Travel Agent" : "Tourist"}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-4">
            <TabsTrigger value="profile" className="text-xs md:text-sm">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs md:text-sm">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs md:text-sm">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="text-xs md:text-sm">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="text-foreground mb-6 text-xl font-bold">Personal Information</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-muted-foreground text-sm font-medium">Full Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-muted-foreground text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm font-medium">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm font-medium">Bio</label>
                    <Input
                      placeholder="Tell us about yourself..."
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          bio: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isUpdatingProfile ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="text-foreground mb-6 text-xl font-bold">Change Password</h2>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm font-medium">
                      Current Password
                    </label>
                    <Input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm font-medium">
                      New Password
                    </label>
                    <Input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-muted-foreground text-sm font-medium">
                      Confirm New Password
                    </label>
                    <Input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isChangingPassword}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isChangingPassword ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="text-foreground mb-6 text-xl font-bold">Notification Preferences</h2>
                <p className="text-muted-foreground text-sm">
                  Notification settings coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="text-foreground mb-6 text-xl font-bold">Billing Information</h2>
                <p className="text-muted-foreground text-sm">Billing settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </MainLayout>
  );
}

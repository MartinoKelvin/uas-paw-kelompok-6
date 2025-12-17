import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  appType: "spa", // Enable SPA fallback for client-side routing
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:6543",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          "react-vendor": ["react", "react-dom", "react-router-dom"],

          // Radix UI - Dialog & Popover (heavy components)
          "radix-dialog": ["@radix-ui/react-dialog", "@radix-ui/react-alert-dialog"],
          "radix-popover": [
            "@radix-ui/react-popover",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-context-menu",
          ],
          "radix-form": [
            "@radix-ui/react-select",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-switch",
          ],
          "radix-misc": [
            "@radix-ui/react-tabs",
            "@radix-ui/react-avatar",
            "@radix-ui/react-separator",
            "@radix-ui/react-label",
            "@radix-ui/react-accordion",
            "@radix-ui/react-collapsible",
          ],

          // Form & validation
          "form-vendor": ["zod", "zustand"],

          // Date utilities
          "date-vendor": ["date-fns"],

          // Icons & notifications
          "ui-utils": ["lucide-react", "sonner"],

          // Animation (optional, can be code-split)
          animation: ["framer-motion"],

          // Pages - Group by feature
          "pages-auth": ["./src/pages/auth/sign-in", "./src/pages/auth/sign-up"],
          "pages-booking": [
            "./src/pages/booking-page",
            "./src/pages/booking-success-page",
            "./src/pages/all-bookings-page",
          ],
          "pages-package": [
            "./src/pages/create-package-page",
            "./src/pages/edit-package-page",
            "./src/pages/manage-packages-page",
          ],
          "pages-dashboard": [
            "./src/pages/dashboard/tourist-dashboard",
            "./src/pages/dashboard/agent-dashboard",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});

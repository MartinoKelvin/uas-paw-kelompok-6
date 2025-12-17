import PropTypes from "prop-types";
import React, { useState, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Package, User, LayoutDashboard, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

export const MenuDock = ({ items, className, variant = "default", animated = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const defaultItems = useMemo(
    () => [
      { label: "Home", icon: Home, path: "/" },
      { label: "Packages", icon: Package, path: "/packages" },
      ...(isAuthenticated
        ? [
            { label: "Wishlist", icon: Heart, path: "/wishlist" },
            { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
            { label: "Profile", icon: User, path: "/profile" },
          ]
        : [{ label: "Sign In", icon: User, path: "/sign-in" }]),
    ],
    [isAuthenticated]
  );

  const finalItems = useMemo(() => {
    const isValid = items && Array.isArray(items) && items.length >= 2 && items.length <= 8;
    if (!isValid) {
      return defaultItems;
    }
    return items;
  }, [items, defaultItems]);

  const currentIndex = useMemo(() => {
    const index = finalItems.findIndex((item) => item.path === location.pathname);
    return index >= 0 ? index : 0;
  }, [finalItems, location.pathname]);

  const [activeIndex, setActiveIndex] = useState(currentIndex);

  const textRefs = useRef([]);
  const itemRefs = useRef([]);

  // Automatically reset index if it exceeds bounds
  const safeActiveIndex = activeIndex >= finalItems.length ? 0 : activeIndex;

  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    if (item.path) {
      navigate(item.path);
    }
    item.onClick?.();
  };
  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return {
          container: "p-1",
          item: "p-2 min-w-12",
          icon: "h-4 w-4",
          text: "text-xs",
        };
      case "large":
        return {
          container: "p-3",
          item: "p-3 min-w-16",
          icon: "h-6 w-6",
          text: "text-base",
        };
      default:
        return {
          container: "p-2",
          item: "p-2 min-w-14",
          icon: "h-5 w-5",
          text: "text-sm",
        };
    }
  };
  const styles = getVariantStyles();
  return (
    <nav
      className={cn(
        "fixed right-0 bottom-0 left-0 z-50 mx-auto max-w-md",
        "flex items-center justify-around",
        "bg-card/95 rounded-t-2xl border-t shadow-lg backdrop-blur-md",
        "pb-safe",
        styles.container,
        className
      )}
      role="navigation"
    >
      {finalItems.map((item, index) => {
        const isActive = index === safeActiveIndex;
        const IconComponent = item.icon;
        return (
          <button
            key={`${item.label}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={cn(
              "relative flex flex-col items-center justify-center rounded-lg transition-all duration-200",
              "active:scale-95",
              "min-w-16 py-2",
              isActive && "text-primary",
              !isActive && "text-muted-foreground"
            )}
            onClick={() => handleItemClick(index, item)}
            aria-label={item.label}
            type="button"
          >
            <div
              className={cn(
                "flex items-center justify-center transition-all duration-200",
                animated && isActive && "scale-110"
              )}
            >
              <IconComponent className={cn("h-6 w-6", "transition-colors duration-200")} />
            </div>

            <span
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className={cn(
                "font-medium capitalize transition-colors duration-200",
                "mt-1 text-xs",
                "whitespace-nowrap"
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

MenuDock.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      path: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "compact", "large"]),
  animated: PropTypes.bool,
};

import PropTypes from "prop-types";
import { Badge } from "@/components/ui/badge";
import { getStatusConfig } from "@/lib/booking-utils";

/**
 * Reusable Status Badge component for bookings
 * Displays status with appropriate icon and color
 */
export function StatusBadge({ status, className = "", showIcon = true, size = "default" }) {
  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    default: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1",
  };

  return (
    <Badge
      variant="secondary"
      className={`${config.color} ${sizeClasses[size]} flex w-fit items-center gap-1 ${className}`}
    >
      {showIcon && <IconComponent className="h-3.5 w-3.5" />}
      {config.label}
    </Badge>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf([
    "pending",
    "confirmed",
    "completed",
    "cancelled",
    "payment_pending",
    "payment_uploaded",
    "payment_verified",
  ]).isRequired,
  className: PropTypes.string,
  showIcon: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "default", "lg"]),
};

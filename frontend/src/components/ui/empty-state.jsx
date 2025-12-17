import PropTypes from "prop-types";
import { PackageIcon, Search, Calendar, MapPin, Heart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const ICONS = {
  package: PackageIcon,
  search: Search,
  calendar: Calendar,
  location: MapPin,
  wishlist: Heart,
  document: FileText,
};

/**
 * Reusable Empty State component
 * Use when there's no data to display
 */
export function EmptyState({
  icon = "package",
  title = "No data found",
  description = "There's nothing to display here yet.",
  action,
  actionLabel,
  onAction,
  className = "",
}) {
  const IconComponent = ICONS[icon] || PackageIcon;

  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <div className="bg-muted mb-4 rounded-full p-4">
        <IconComponent className="text-muted-foreground h-8 w-8" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">{description}</p>
      {(action || onAction) && (
        <Button onClick={onAction} asChild={!!action}>
          {action || actionLabel}
        </Button>
      )}
    </div>
  );
}

/**
 * No search results state
 */
export function NoSearchResults({ query, onClear }) {
  return (
    <EmptyState
      icon="search"
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try different keywords.`}
      actionLabel="Clear search"
      onAction={onClear}
    />
  );
}

/**
 * No bookings state
 */
export function NoBookings({ isAgent = false, onAction }) {
  return (
    <EmptyState
      icon="calendar"
      title="No bookings yet"
      description={
        isAgent
          ? "You don't have any bookings for your packages yet."
          : "You haven't made any bookings yet. Start exploring our packages!"
      }
      actionLabel={isAgent ? "Manage Packages" : "Browse Packages"}
      onAction={onAction}
    />
  );
}

/**
 * No packages state
 */
export function NoPackages({ isAgent = false, onAction }) {
  return (
    <EmptyState
      icon="package"
      title={isAgent ? "No packages created" : "No packages available"}
      description={
        isAgent
          ? "Start by creating your first travel package."
          : "There are no packages available at the moment. Check back later!"
      }
      actionLabel={isAgent ? "Create Package" : undefined}
      onAction={isAgent ? onAction : undefined}
    />
  );
}

/**
 * Empty wishlist state
 */
export function EmptyWishlist({ onAction }) {
  return (
    <EmptyState
      icon="wishlist"
      title="Your wishlist is empty"
      description="Save packages you're interested in to your wishlist for easy access later."
      actionLabel="Browse Packages"
      onAction={onAction}
    />
  );
}

EmptyWishlist.propTypes = {
  onAction: PropTypes.func,
};

// PropTypes definitions
EmptyState.propTypes = {
  icon: PropTypes.oneOf(["package", "search", "calendar", "location", "wishlist", "document"]),
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.node,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string,
};

NoSearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  onClear: PropTypes.func,
};

NoBookings.propTypes = {
  isAgent: PropTypes.bool,
  onAction: PropTypes.func,
};

NoPackages.propTypes = {
  isAgent: PropTypes.bool,
  onAction: PropTypes.func,
};

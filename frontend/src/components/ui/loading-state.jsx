import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Full page loading spinner
 */
export function PageLoader({ message = "Loading..." }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Loader2 className="text-primary h-8 w-8 animate-spin" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}

PageLoader.propTypes = {
  message: PropTypes.string,
};

/**
 * Inline loading spinner
 */
export function InlineLoader({ size = "default", className = "" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />;
}

InlineLoader.propTypes = {
  size: PropTypes.oneOf(["sm", "default", "lg"]),
  className: PropTypes.string,
};

/**
 * Card skeleton for loading states
 */
export function CardSkeleton({ className = "" }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}

CardSkeleton.propTypes = {
  className: PropTypes.string,
};

/**
 * Table row skeleton
 */
export function TableRowSkeleton({ columns = 5 }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

TableRowSkeleton.propTypes = {
  columns: PropTypes.number,
};

/**
 * List skeleton with configurable items
 */
export function ListSkeleton({ items = 3, className = "" }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

ListSkeleton.propTypes = {
  items: PropTypes.number,
  className: PropTypes.string,
};

/**
 * Form skeleton
 */
export function FormSkeleton({ fields = 4 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

FormSkeleton.propTypes = {
  fields: PropTypes.number,
};

/**
 * Stats card skeleton
 */
export function StatsSkeleton({ cards = 4 }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          <Skeleton className="mt-4 h-8 w-20" />
          <Skeleton className="mt-2 h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

StatsSkeleton.propTypes = {
  cards: PropTypes.number,
};

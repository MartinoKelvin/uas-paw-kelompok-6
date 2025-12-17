import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

// Package Card Skeleton
function PackageCardSkeleton() {
  return (
    <div className="border-border overflow-hidden rounded-lg border p-2">
      {/* Image Skeleton */}
      <Skeleton className="aspect-4/3 w-full rounded-lg" />

      {/* Content Skeleton */}
      <div className="space-y-4 p-2">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  );
}

// Booking Card Skeleton
function BookingCardSkeleton() {
  return (
    <div className="border-border rounded-lg border p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <Skeleton className="h-px w-full" />

          <div className="grid gap-3 md:grid-cols-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <Skeleton className="h-16 w-32" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// Stats Card Skeleton
function StatsCardSkeleton() {
  return (
    <div className="border-border rounded-lg border">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded" />
      </div>
      <div className="p-6 pt-0">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="mt-1 h-3 w-32" />
      </div>
    </div>
  );
}

// Full Page Skeletons for Suspense fallbacks
function PackagesPageSkeleton() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>
      <div className="border-border space-y-4 rounded-lg border p-6">
        <Skeleton className="h-10 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PackageCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function DashboardPageSkeleton() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-64" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <BookingCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function DetailPageSkeleton() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <Skeleton className="h-10 w-32" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="border-border space-y-4 rounded-lg border p-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthPageSkeleton() {
  return (
    <div className="bg-muted flex h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <Skeleton className="mx-auto h-10 w-32" />
        <div className="border-border bg-background space-y-4 rounded-lg border p-8">
          <Skeleton className="mx-auto h-6 w-48" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

function GenericPageSkeleton() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-6 w-96" />
      <div className="mt-8 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export {
  Skeleton,
  PackageCardSkeleton,
  BookingCardSkeleton,
  StatsCardSkeleton,
  PackagesPageSkeleton,
  DashboardPageSkeleton,
  DetailPageSkeleton,
  AuthPageSkeleton,
  GenericPageSkeleton,
};

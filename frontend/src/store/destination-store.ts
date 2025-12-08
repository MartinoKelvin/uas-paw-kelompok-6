import { create } from "zustand";
import type { Destination, Package } from "@/types";

interface DestinationStore {
  destinations: Destination[];
  packages: Package[];
  setDestinations: (destinations: Destination[]) => void;
  setPackages: (packages: Package[]) => void;
  addPackage: (pkg: Package) => void;
  updatePackage: (id: string, updates: Partial<Package>) => void;
  deletePackage: (id: string) => void;
  getPackagesByDestination: (destinationId: string) => Package[];
  getDestinationById: (id: string) => Destination | undefined;
  getPackageById: (id: string) => Package | undefined;
}

export const useDestinationStore = create<DestinationStore>((set, get) => ({
  destinations: [],
  packages: [],
  setDestinations: (destinations) => set({ destinations }),
  setPackages: (packages) => set({ packages }),
  addPackage: (pkg) => set((state) => ({ packages: [...state.packages, pkg] })),
  updatePackage: (id, updates) =>
    set((state) => ({
      packages: state.packages.map((pkg) =>
        pkg.id === id ? { ...pkg, ...updates } : pkg
      ),
    })),
  deletePackage: (id) =>
    set((state) => ({
      packages: state.packages.filter((pkg) => pkg.id !== id),
    })),
  getPackagesByDestination: (destinationId) =>
    get().packages.filter((pkg) => pkg.destinationId === destinationId),
  getDestinationById: (id) =>
    get().destinations.find((dest) => dest.id === id),
  getPackageById: (id) => get().packages.find((pkg) => pkg.id === id),
}));

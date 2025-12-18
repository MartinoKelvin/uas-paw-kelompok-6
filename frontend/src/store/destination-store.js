import { create } from "zustand";
import * as destinationService from "@/services/destination.service";
import * as packageService from "@/services/package.service";

export const useDestinationStore = create((set, get) => ({
  destinations: [],
  packages: [],
  isLoading: false,
  error: null,

  setDestinations: (destinations) => set({ destinations }),
  setPackages: (packages) => set({ packages }),

  fetchDestinations: async () => {
    set({ isLoading: true, error: null });
    try {
      const destinations = await destinationService.getAllDestinations();
      set({ destinations, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchPackages: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const packages = await packageService.getAllPackages(filters);
      set({ packages, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchPackagesByAgent: async (agentId) => {
    set({ isLoading: true, error: null });
    try {
      const packages = await packageService.getPackagesByAgent(agentId);
      set({ packages, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addPackage: (pkg) =>
    set((state) => ({
      packages: [...state.packages, pkg],
    })),

  createPackage: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newPackage = await packageService.createPackage(data);
      set((state) => ({
        packages: [...state.packages, newPackage],
        isLoading: false,
      }));
      return newPackage;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  createDestination: async (data) => {
  set({ isLoading: true, error: null });
  try {
    const res = await destinationService.createDestination(data);
    set((state) => ({
      destinations: [...state.destinations, res.destination],
      isLoading: false,
    }));
    return res.destination;
  } catch (error) {
    set({ error: error.message, isLoading: false });
    throw error;
  }
},


  updatePackage: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const updatedPackage = await packageService.updatePackage(id, updates);
      set((state) => ({
        packages: state.packages.map((pkg) => (pkg.id === id ? updatedPackage : pkg)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deletePackage: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await packageService.deletePackage(id);
      set((state) => ({
        packages: state.packages.filter((pkg) => pkg.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  getPackagesByDestination: (destinationId) =>
    get().packages.filter((pkg) => pkg.destinationId === destinationId),

  getDestinationById: (id) => get().destinations.find((dest) => dest.id === id),

  getPackageById: (id) => get().packages.find((pkg) => pkg.id === id),
}));

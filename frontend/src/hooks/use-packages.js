import { useState, useEffect, useCallback } from "react";
import {
  getAllPackages,
  getPackageById,
  getPackagesByAgent,
  createPackage,
  updatePackage,
  deletePackage,
} from "@/services/package.service";

/**
 * Hook untuk mengambil semua packages dengan filter
 */
export function usePackages(filters = {}) {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllPackages(filters);
      setPackages(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data packages");
    } finally {
      setIsLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return { packages, isLoading, error, refetch: fetchPackages };
}

/**
 * Hook untuk mengambil package berdasarkan ID
 */
export function usePackage(id) {
  const [packageData, setPackageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackage = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPackageById(id);
      setPackageData(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data package");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPackage();
  }, [fetchPackage]);

  return { packageData, isLoading, error, refetch: fetchPackage };
}

/**
 * Hook untuk mengambil packages berdasarkan agent
 */
export function useAgentPackages(agentId) {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = useCallback(async () => {
    if (!agentId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPackagesByAgent(agentId);
      setPackages(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data packages");
    } finally {
      setIsLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return { packages, isLoading, error, refetch: fetchPackages };
}

/**
 * Hook untuk operasi mutasi package (create, update, delete)
 */
export function usePackageMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createPackage(data);
      return result;
    } catch (err) {
      setError(err.message || "Gagal membuat package");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const update = useCallback(async (id, data) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await updatePackage(id, data);
      return result;
    } catch (err) {
      setError(err.message || "Gagal mengupdate package");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await deletePackage(id);
      return result;
    } catch (err) {
      setError(err.message || "Gagal menghapus package");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, update, remove, isLoading, error };
}

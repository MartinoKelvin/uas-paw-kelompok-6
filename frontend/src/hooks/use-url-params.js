import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

/**
 * Custom hook for managing URL search parameters
 * @returns Object with params getter and setter functions
 */
export function useUrlParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = useCallback(
    (key, defaultValue = "") => {
      return searchParams.get(key) || defaultValue;
    },
    [searchParams]
  );

  const setParam = useCallback(
    (key, value) => {
      const newParams = new URLSearchParams(searchParams);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setParams = useCallback(
    (params) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  return { getParam, setParam, setParams };
}

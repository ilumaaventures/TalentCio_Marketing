import { startTransition, useEffect, useState } from 'react';
import api from '../api/axios';
import { clearPublicJobsApiMissing, isPublicJobsApiMissing, markPublicJobsApiMissing } from '../api/publicCapabilities';
import isPrerender from '../utils/isPrerender';

const FILTER_DEBOUNCE_MS = 1500;

const defaultFilters = {
  search: '',
  location: '',
  type: '',
  department: ''
};

export default function useJobs(initialFilters = defaultFilters) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [debouncedSearch, setDebouncedSearch] = useState(initialFilters.search || '');
  const [debouncedDepartment, setDebouncedDepartment] = useState(initialFilters.department || '');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, FILTER_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [filters.search]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedDepartment(filters.department);
    }, FILTER_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [filters.department]);

  useEffect(() => {
    let isActive = true;

    const fetchJobs = async () => {
      if (isPrerender()) {
        setJobs([]);
        setTotal(0);
        setTotalPages(1);
        setError('');
        setLoading(false);
        return;
      }

      if (isPublicJobsApiMissing()) {
        setJobs([]);
        setTotal(0);
        setTotalPages(1);
        setError('The public job board is not available yet on the current API deployment.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await api.get('/public/jobs', {
          params: {
            page,
            limit: 12,
            search: debouncedSearch || undefined,
            location: filters.location || undefined,
            type: filters.type || undefined,
            department: debouncedDepartment || undefined
          }
        });

        if (!isActive) {
          return;
        }

        clearPublicJobsApiMissing();
        setJobs(response.data.jobs || []);
        setTotal(response.data.total || 0);
        setTotalPages(response.data.totalPages || 1);
      } catch (fetchError) {
        if (!isActive) {
          return;
        }

        if (fetchError.response?.status === 404) {
          markPublicJobsApiMissing();
          setError('The public job board is not available yet on the current API deployment.');
        } else {
          setError(fetchError.response?.data?.message || 'Failed to load jobs');
        }
        setJobs([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      isActive = false;
    };
  }, [page, filters.location, filters.type, debouncedDepartment, debouncedSearch]);

  const updateFilters = (updates) => {
    startTransition(() => {
      setPage(1);
      setFilters((current) => ({
        ...current,
        ...updates
      }));
    });
  };

  const resetFilters = () => {
    startTransition(() => {
      setPage(1);
      setFilters(defaultFilters);
      setDebouncedSearch(defaultFilters.search);
      setDebouncedDepartment(defaultFilters.department);
    });
  };

  return {
    jobs,
    loading,
    error,
    page,
    setPage,
    total,
    totalPages,
    filters,
    updateFilters,
    resetFilters
  };
}

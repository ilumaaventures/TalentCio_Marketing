import { startTransition, useDeferredValue, useEffect, useState } from 'react';
import api from '../api/axios';
import { clearPublicJobsApiMissing, isPublicJobsApiMissing, markPublicJobsApiMissing } from '../api/publicCapabilities';

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

  const deferredSearch = useDeferredValue(filters.search);

  useEffect(() => {
    let isActive = true;

    const fetchJobs = async () => {
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
            search: deferredSearch || undefined,
            location: filters.location || undefined,
            type: filters.type || undefined,
            department: filters.department || undefined
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
  }, [page, filters.location, filters.type, filters.department, deferredSearch]);

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

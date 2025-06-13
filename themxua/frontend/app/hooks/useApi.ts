'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../utils/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Staff';
  status: 'Đã duyệt' | 'Chưa duyệt';
  createdAt: string;
  updatedAt: string;
}

interface SpotlightItem {
  _id: string;
  title: string;
  picture: string;
  pictureMobile: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface HistoryBooking {
  _id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  date: string;
  time: string;
  numberOfPeople: string;
  userRequest?: string;
  status: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

interface AcceptedBooking {
  _id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  date: string;
  time: string;
  numberOfPeople: string;
  userRequest?: string;
  status: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export function useApiCall<T = unknown>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { logout } = useAuth();

  const execute = useCallback(
    async (
      apiCall: () => Promise<{
        success: boolean;
        data?: T;
        message?: string;
        status: number;
      }>
    ): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiCall();
        if (response.success) {
          setState({
            data: response.data ?? null,
            loading: false,
            error: null,
          });
          return response.data ?? null;
        } else {
          if (response.status === 401) {
            logout();
            return null;
          }

          setState({
            data: null,
            loading: false,
            error: response.message || 'An error occurred',
          });
          return null;
        }
      } catch (error) {
        console.error('API call failed:', error);
        setState({
          data: null,
          loading: false,
          error: 'Network error',
        });
        return null;
      }
    },
    [logout]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Specialized hooks for common operations
export function useUsers() {
  const apiCall = useApiCall<User[]>();

  const fetchUsers = useCallback(() => {
    return apiCall.execute(() => apiClient.get('/admin/users'));
  }, [apiCall]);

  const approveUser = useCallback(
    (userId: string) => {
      return apiCall.execute(() =>
        apiClient.post(`/admin/users/${userId}/approve`)
      );
    },
    [apiCall]
  );
  const updateUser = useCallback(
    (userId: string, data: { name: string; email: string; role: string }) => {
      return apiCall.execute(() =>
        apiClient.put(`/admin/users/${userId}`, data)
      );
    },
    [apiCall]
  );

  const deleteUser = useCallback(
    (userId: string) => {
      return apiCall.execute(() => apiClient.delete(`/admin/users/${userId}`));
    },
    [apiCall]
  );

  return {
    ...apiCall,
    fetchUsers,
    approveUser,
    updateUser,
    deleteUser,
  };
}

export function useSpotlight() {
  const apiCall = useApiCall<SpotlightItem[]>();

  const fetchSpotlight = useCallback(() => {
    return apiCall.execute(() => apiClient.get('/admin/spotlight'));
  }, [apiCall]);

  const createSpotlight = useCallback(
    (formData: FormData) => {
      return apiCall.execute(() =>
        apiClient.post('/admin/spotlight', formData, true)
      );
    },
    [apiCall]
  );

  const updateSpotlight = useCallback(
    (id: string, formData: FormData) => {
      return apiCall.execute(() =>
        apiClient.put(`/admin/spotlight/${id}`, formData, true)
      );
    },
    [apiCall]
  );

  const deleteSpotlight = useCallback(
    (id: string) => {
      return apiCall.execute(() => apiClient.delete(`/admin/spotlight/${id}`));
    },
    [apiCall]
  );

  const deleteAllSpotlight = useCallback(() => {
    return apiCall.execute(() => apiClient.post('/admin/spotlight/deleteAll'));
  }, [apiCall]);

  return {
    ...apiCall,
    fetchSpotlight,
    createSpotlight,
    updateSpotlight,
    deleteSpotlight,
    deleteAllSpotlight,
  };
}

export function useProfile() {
  const apiCall = useApiCall();

  const fetchProfile = useCallback(() => {
    return apiCall.execute(() => apiClient.get('/admin/auth/profile'));
  }, [apiCall]);

  const updateProfile = useCallback(
    (data: { name: string; email: string }) => {
      return apiCall.execute(() => apiClient.put('/admin/auth/profile', data));
    },
    [apiCall]
  );

  const changePassword = useCallback(
    (data: { currentPassword: string; newPassword: string }) => {
      return apiCall.execute(() =>
        apiClient.put('/admin/auth/change-password', data)
      );
    },
    [apiCall]
  );

  return {
    ...apiCall,
    fetchProfile,
    updateProfile,
    changePassword,
  };
}

export function useBookingHistory() {
  const apiCall = useApiCall<HistoryBooking[]>();

  const fetchHistory = useCallback(() => {
    return apiCall.execute(() => apiClient.get('/admin/booking/history'));
  }, [apiCall]);

  const restoreBooking = useCallback(
    (id: string) => {
      return apiCall.execute(() =>
        apiClient.post(`/admin/booking/history/${id}/restore`)
      );
    },
    [apiCall]
  );

  const deleteBooking = useCallback(
    (id: string) => {
      return apiCall.execute(() =>
        apiClient.delete(`/admin/booking/history/${id}`)
      );
    },
    [apiCall]
  );

  const restoreAll = useCallback(() => {
    return apiCall.execute(() =>
      apiClient.post('/admin/booking/history/restore-all')
    );
  }, [apiCall]);

  const deleteAll = useCallback(() => {
    return apiCall.execute(() => apiClient.delete('/admin/booking/history'));
  }, [apiCall]);

  return {
    ...apiCall,
    fetchHistory,
    restoreBooking,
    deleteBooking,
    restoreAll,
    deleteAll,
  };
}

export function useAcceptedBooking() {
  const apiCall = useApiCall<AcceptedBooking[]>();

  const fetchAccepted = useCallback(() => {
    return apiCall.execute(() => apiClient.get('/admin/booking/accepted'));
  }, [apiCall]);

  const updateNote = useCallback(
    (id: string, note: string) => {
      return apiCall.execute(() =>
        apiClient.patch(`/admin/booking/accepted/${id}/note`, { note })
      );
    },
    [apiCall]
  );

  const completeBooking = useCallback(
    (id: string) => {
      return apiCall.execute(() =>
        apiClient.post(`/admin/booking/accepted/${id}/completed`)
      );
    },
    [apiCall]
  );

  const deleteBooking = useCallback(
    (id: string) => {
      return apiCall.execute(() =>
        apiClient.delete(`/admin/booking/accepted/${id}`)
      );
    },
    [apiCall]
  );

  const completeAll = useCallback(() => {
    return apiCall.execute(() =>
      apiClient.post('/admin/booking/accepted/complete-all')
    );
  }, [apiCall]);

  const deleteAll = useCallback(() => {
    return apiCall.execute(() => apiClient.delete('/admin/booking/accepted'));
  }, [apiCall]);

  return {
    ...apiCall,
    fetchAccepted,
    updateNote,
    completeBooking,
    deleteBooking,
    completeAll,
    deleteAll,
  };
}

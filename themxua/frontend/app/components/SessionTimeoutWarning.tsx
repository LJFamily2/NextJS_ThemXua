'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface SessionTimeoutWarningProps {
  warningTime?: number; // Minutes before expiry to show warning
  autoRefreshTime?: number; // Minutes before expiry to auto-refresh
}

export default function SessionTimeoutWarning({
  warningTime = 5,
  autoRefreshTime = 10,
}: SessionTimeoutWarningProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const { token, refreshToken, logout } = useAuth();

  const getTimeUntilExpiry = useCallback(() => {
    const expiry = localStorage.getItem('adminTokenExpiry');
    if (!expiry) return 0;

    const expiryTime = parseInt(expiry);
    const now = Date.now();
    return Math.max(0, expiryTime - now);
  }, []);

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      const timeUntilExpiry = getTimeUntilExpiry();
      const minutesLeft = Math.floor(timeUntilExpiry / (1000 * 60));

      setTimeLeft(minutesLeft);

      // Auto-refresh if close to expiry
      if (minutesLeft <= autoRefreshTime && minutesLeft > warningTime) {
        refreshToken();
      }

      // Show warning if very close to expiry
      if (minutesLeft <= warningTime && minutesLeft > 0) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }

      // Logout if expired
      if (minutesLeft <= 0) {
        logout();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [
    token,
    warningTime,
    autoRefreshTime,
    getTimeUntilExpiry,
    refreshToken,
    logout,
  ]);

  const handleExtendSession = async () => {
    const success = await refreshToken();
    if (success) {
      setShowWarning(false);
    }
  };

  if (!showWarning) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <span className="text-2xl">⏰</span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">
              Session Expiring Soon
            </h3>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Your session will expire in {timeLeft} minute
            {timeLeft !== 1 ? 's' : ''}. Would you like to extend your session?
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleExtendSession}
            className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Extend Session
          </button>
          <button
            onClick={logout}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Logout Now
          </button>
        </div>
      </div>
    </div>
  );
}

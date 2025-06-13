'use client';

import { createContext, useContext, useRef } from 'react';
import { StoreApi, useStore } from 'zustand';
import { useAppStore } from './useAppStore';

// Create store context
const StoreContext = createContext<StoreApi<any> | null>(null);

// Store provider component
interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<StoreApi<any>>();

  if (!storeRef.current) {
    storeRef.current = useAppStore;
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use store
export const useStoreContext = <T,>(selector: (state: any) => T): T => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStoreContext must be used within StoreProvider');
  }
  return useStore(store, selector);
};

// Pre-configured hooks for common use cases
export const useBookings = () => {
  const bookings = useAppStore(state => state.bookings);
  const loading = useAppStore(state => state.loading.bookings);
  const setBookings = useAppStore(state => state.setBookings);
  const addBooking = useAppStore(state => state.addBooking);
  const updateBooking = useAppStore(state => state.updateBooking);
  const deleteBooking = useAppStore(state => state.deleteBooking);
  const selectBooking = useAppStore(state => state.selectBooking);
  const selectedBooking = useAppStore(state => state.selected.booking);
  const setLoading = useAppStore(state => state.setBookingLoading);
  const filters = useAppStore(state => state.filters.bookings);
  const setFilters = useAppStore(state => state.setBookingFilters);

  return {
    bookings,
    loading,
    selectedBooking,
    filters,
    setBookings,
    addBooking,
    updateBooking,
    deleteBooking,
    selectBooking,
    setLoading,
    setFilters,
  };
};

export const useMenuItems = () => {
  const menuItems = useAppStore(state => state.menuItems);
  const loading = useAppStore(state => state.loading.menu);
  const setMenuItems = useAppStore(state => state.setMenuItems);
  const addMenuItem = useAppStore(state => state.addMenuItem);
  const updateMenuItem = useAppStore(state => state.updateMenuItem);
  const deleteMenuItem = useAppStore(state => state.deleteMenuItem);
  const selectMenuItem = useAppStore(state => state.selectMenuItem);
  const selectedMenuItem = useAppStore(state => state.selected.menuItem);
  const setLoading = useAppStore(state => state.setMenuLoading);
  const filters = useAppStore(state => state.filters.menu);
  const setFilters = useAppStore(state => state.setMenuFilters);

  return {
    menuItems,
    loading,
    selectedMenuItem,
    filters,
    setMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    selectMenuItem,
    setLoading,
    setFilters,
  };
};

export const useNewsArticles = () => {
  const news = useAppStore(state => state.news);
  const loading = useAppStore(state => state.loading.news);
  const setNews = useAppStore(state => state.setNews);
  const addNewsArticle = useAppStore(state => state.addNewsArticle);
  const updateNewsArticle = useAppStore(state => state.updateNewsArticle);
  const deleteNewsArticle = useAppStore(state => state.deleteNewsArticle);
  const selectNewsArticle = useAppStore(state => state.selectNewsArticle);
  const selectedNewsArticle = useAppStore(state => state.selected.newsArticle);
  const setLoading = useAppStore(state => state.setNewsLoading);
  const filters = useAppStore(state => state.filters.news);
  const setFilters = useAppStore(state => state.setNewsFilters);

  return {
    news,
    loading,
    selectedNewsArticle,
    filters,
    setNews,
    addNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    selectNewsArticle,
    setLoading,
    setFilters,
  };
};

export const useEvents = () => {
  const events = useAppStore(state => state.events);
  const loading = useAppStore(state => state.loading.events);
  const setEvents = useAppStore(state => state.setEvents);
  const addEvent = useAppStore(state => state.addEvent);
  const updateEvent = useAppStore(state => state.updateEvent);
  const deleteEvent = useAppStore(state => state.deleteEvent);
  const selectEvent = useAppStore(state => state.selectEvent);
  const selectedEvent = useAppStore(state => state.selected.event);
  const setLoading = useAppStore(state => state.setEventsLoading);
  const filters = useAppStore(state => state.filters.events);
  const setFilters = useAppStore(state => state.setEventFilters);

  return {
    events,
    loading,
    selectedEvent,
    filters,
    setEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    selectEvent,
    setLoading,
    setFilters,
  };
};

export const useUIStore = () => {
  const ui = useAppStore(state => state.ui);
  const setMobileMenuOpen = useAppStore(state => state.setMobileMenuOpen);
  const setSidebarCollapsed = useAppStore(state => state.setSidebarCollapsed);
  const setTheme = useAppStore(state => state.setTheme);
  const setLanguage = useAppStore(state => state.setLanguage);

  return {
    ...ui,
    setMobileMenuOpen,
    setSidebarCollapsed,
    setTheme,
    setLanguage,
  };
};

export const useNotifications = () => {
  const notifications = useAppStore(state => state.notifications);
  const showNotification = useAppStore(state => state.showNotification);
  const hideNotification = useAppStore(state => state.hideNotification);

  return {
    ...notifications,
    show: showNotification,
    hide: hideNotification,
  };
};

export default StoreProvider;

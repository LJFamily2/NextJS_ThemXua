import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Types for our store
interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  numberOfPeople: string;
  notes?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image?: string;
  published: boolean;
  createdAt: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  published: boolean;
}

interface AppFilters {
  bookings: {
    status: string;
    dateRange: { start: string; end: string } | null;
    searchTerm: string;
  };
  menu: {
    category: string;
    availability: string;
    searchTerm: string;
  };
  news: {
    published: string;
    searchTerm: string;
  };
  events: {
    published: string;
    searchTerm: string;
  };
}

// Store state interface
interface AppState {
  // Data state
  bookings: Booking[];
  menuItems: MenuItem[];
  news: NewsArticle[];
  events: Event[];

  // Loading states
  loading: {
    bookings: boolean;
    menu: boolean;
    news: boolean;
    events: boolean;
  };

  // UI state
  ui: {
    mobileMenuOpen: boolean;
    sidebarCollapsed: boolean;
    theme: 'light' | 'dark';
    language: 'vi' | 'en';
  };

  // Filters
  filters: AppFilters;

  // Selected items for editing
  selected: {
    booking: Booking | null;
    menuItem: MenuItem | null;
    newsArticle: NewsArticle | null;
    event: Event | null;
  };

  // Notification system
  notifications: {
    message: string | null;
    type: 'success' | 'error' | 'info' | 'warning';
    open: boolean;
  };

  // Actions
  setBookings: (bookings: Booking[]) => void;
  setBookingLoading: (loading: boolean) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  selectBooking: (booking: Booking | null) => void;

  setMenuItems: (items: MenuItem[]) => void;
  setMenuLoading: (loading: boolean) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  selectMenuItem: (item: MenuItem | null) => void;

  setNews: (news: NewsArticle[]) => void;
  setNewsLoading: (loading: boolean) => void;
  addNewsArticle: (article: NewsArticle) => void;
  updateNewsArticle: (id: string, updates: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;
  selectNewsArticle: (article: NewsArticle | null) => void;

  setEvents: (events: Event[]) => void;
  setEventsLoading: (loading: boolean) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  selectEvent: (event: Event | null) => void;

  // UI actions
  setMobileMenuOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'vi' | 'en') => void;

  // Filter actions
  setBookingFilters: (filters: Partial<AppFilters['bookings']>) => void;
  setMenuFilters: (filters: Partial<AppFilters['menu']>) => void;
  setNewsFilters: (filters: Partial<AppFilters['news']>) => void;
  setEventFilters: (filters: Partial<AppFilters['events']>) => void;
  clearAllFilters: () => void;

  // Notification actions
  showNotification: (
    message: string,
    type?: 'success' | 'error' | 'info' | 'warning'
  ) => void;
  hideNotification: () => void;

  // Bulk actions
  bulkUpdateBookings: (ids: string[], updates: Partial<Booking>) => void;
  bulkDeleteBookings: (ids: string[]) => void;
  bulkUpdateMenuItems: (ids: string[], updates: Partial<MenuItem>) => void;
  bulkDeleteMenuItems: (ids: string[]) => void;
}

// Create the store
export const useAppStore = create<AppState>()(
  devtools(
    set => ({
      // Initial state
      bookings: [],
      menuItems: [],
      news: [],
      events: [],

      loading: {
        bookings: false,
        menu: false,
        news: false,
        events: false,
      },

      ui: {
        mobileMenuOpen: false,
        sidebarCollapsed: false,
        theme: 'light',
        language: 'vi',
      },

      filters: {
        bookings: {
          status: 'all',
          dateRange: null,
          searchTerm: '',
        },
        menu: {
          category: 'all',
          availability: 'all',
          searchTerm: '',
        },
        news: {
          published: 'all',
          searchTerm: '',
        },
        events: {
          published: 'all',
          searchTerm: '',
        },
      },

      selected: {
        booking: null,
        menuItem: null,
        newsArticle: null,
        event: null,
      },

      notifications: {
        message: null,
        type: 'info',
        open: false,
      },

      // Booking actions
      setBookings: bookings => set({ bookings }),
      setBookingLoading: loading =>
        set(state => ({
          loading: { ...state.loading, bookings: loading },
        })),
      addBooking: booking =>
        set(state => ({ bookings: [booking, ...state.bookings] })),
      updateBooking: (id, updates) =>
        set(state => ({
          bookings: state.bookings.map(booking =>
            booking._id === id ? { ...booking, ...updates } : booking
          ),
          selected: {
            ...state.selected,
            booking:
              state.selected.booking?._id === id
                ? { ...state.selected.booking, ...updates }
                : state.selected.booking,
          },
        })),
      deleteBooking: id =>
        set(state => ({
          bookings: state.bookings.filter(booking => booking._id !== id),
          selected: {
            ...state.selected,
            booking:
              state.selected.booking?._id === id
                ? null
                : state.selected.booking,
          },
        })),
      selectBooking: booking =>
        set(state => ({
          selected: { ...state.selected, booking },
        })),

      // Menu actions
      setMenuItems: menuItems => set({ menuItems }),
      setMenuLoading: loading =>
        set(state => ({
          loading: { ...state.loading, menu: loading },
        })),
      addMenuItem: item =>
        set(state => ({ menuItems: [item, ...state.menuItems] })),
      updateMenuItem: (id, updates) =>
        set(state => ({
          menuItems: state.menuItems.map(item =>
            item._id === id ? { ...item, ...updates } : item
          ),
          selected: {
            ...state.selected,
            menuItem:
              state.selected.menuItem?._id === id
                ? { ...state.selected.menuItem, ...updates }
                : state.selected.menuItem,
          },
        })),
      deleteMenuItem: id =>
        set(state => ({
          menuItems: state.menuItems.filter(item => item._id !== id),
          selected: {
            ...state.selected,
            menuItem:
              state.selected.menuItem?._id === id
                ? null
                : state.selected.menuItem,
          },
        })),
      selectMenuItem: menuItem =>
        set(state => ({
          selected: { ...state.selected, menuItem },
        })),

      // News actions
      setNews: news => set({ news }),
      setNewsLoading: loading =>
        set(state => ({
          loading: { ...state.loading, news: loading },
        })),
      addNewsArticle: article =>
        set(state => ({ news: [article, ...state.news] })),
      updateNewsArticle: (id, updates) =>
        set(state => ({
          news: state.news.map(article =>
            article._id === id ? { ...article, ...updates } : article
          ),
          selected: {
            ...state.selected,
            newsArticle:
              state.selected.newsArticle?._id === id
                ? { ...state.selected.newsArticle, ...updates }
                : state.selected.newsArticle,
          },
        })),
      deleteNewsArticle: id =>
        set(state => ({
          news: state.news.filter(article => article._id !== id),
          selected: {
            ...state.selected,
            newsArticle:
              state.selected.newsArticle?._id === id
                ? null
                : state.selected.newsArticle,
          },
        })),
      selectNewsArticle: newsArticle =>
        set(state => ({
          selected: { ...state.selected, newsArticle },
        })),

      // Events actions
      setEvents: events => set({ events }),
      setEventsLoading: loading =>
        set(state => ({
          loading: { ...state.loading, events: loading },
        })),
      addEvent: event => set(state => ({ events: [event, ...state.events] })),
      updateEvent: (id, updates) =>
        set(state => ({
          events: state.events.map(event =>
            event._id === id ? { ...event, ...updates } : event
          ),
          selected: {
            ...state.selected,
            event:
              state.selected.event?._id === id
                ? { ...state.selected.event, ...updates }
                : state.selected.event,
          },
        })),
      deleteEvent: id =>
        set(state => ({
          events: state.events.filter(event => event._id !== id),
          selected: {
            ...state.selected,
            event:
              state.selected.event?._id === id ? null : state.selected.event,
          },
        })),
      selectEvent: event =>
        set(state => ({
          selected: { ...state.selected, event },
        })),

      // UI actions
      setMobileMenuOpen: mobileMenuOpen =>
        set(state => ({
          ui: { ...state.ui, mobileMenuOpen },
        })),
      setSidebarCollapsed: sidebarCollapsed =>
        set(state => ({
          ui: { ...state.ui, sidebarCollapsed },
        })),
      setTheme: theme =>
        set(state => ({
          ui: { ...state.ui, theme },
        })),
      setLanguage: language =>
        set(state => ({
          ui: { ...state.ui, language },
        })),

      // Filter actions
      setBookingFilters: filters =>
        set(state => ({
          filters: {
            ...state.filters,
            bookings: { ...state.filters.bookings, ...filters },
          },
        })),
      setMenuFilters: filters =>
        set(state => ({
          filters: {
            ...state.filters,
            menu: { ...state.filters.menu, ...filters },
          },
        })),
      setNewsFilters: filters =>
        set(state => ({
          filters: {
            ...state.filters,
            news: { ...state.filters.news, ...filters },
          },
        })),
      setEventFilters: filters =>
        set(state => ({
          filters: {
            ...state.filters,
            events: { ...state.filters.events, ...filters },
          },
        })),
      clearAllFilters: () =>
        set({
          filters: {
            bookings: { status: 'all', dateRange: null, searchTerm: '' },
            menu: { category: 'all', availability: 'all', searchTerm: '' },
            news: { published: 'all', searchTerm: '' },
            events: { published: 'all', searchTerm: '' },
          },
        }),

      // Notification actions
      showNotification: (message, type = 'info') =>
        set({
          notifications: { message, type, open: true },
        }),
      hideNotification: () =>
        set(state => ({
          notifications: { ...state.notifications, open: false, message: null },
        })),

      // Bulk actions
      bulkUpdateBookings: (ids, updates) =>
        set(state => ({
          bookings: state.bookings.map(booking =>
            ids.includes(booking._id) ? { ...booking, ...updates } : booking
          ),
        })),
      bulkDeleteBookings: ids =>
        set(state => ({
          bookings: state.bookings.filter(
            booking => !ids.includes(booking._id)
          ),
        })),
      bulkUpdateMenuItems: (ids, updates) =>
        set(state => ({
          menuItems: state.menuItems.map(item =>
            ids.includes(item._id) ? { ...item, ...updates } : item
          ),
        })),
      bulkDeleteMenuItems: ids =>
        set(state => ({
          menuItems: state.menuItems.filter(item => !ids.includes(item._id)),
        })),
    }),
    { name: 'themxua-store' }
  )
);

// Selectors for better performance
export const selectBookings = (state: AppState) => state.bookings;
export const selectMenuItems = (state: AppState) => state.menuItems;
export const selectNews = (state: AppState) => state.news;
export const selectEvents = (state: AppState) => state.events;
export const selectLoading = (state: AppState) => state.loading;
export const selectUI = (state: AppState) => state.ui;
export const selectFilters = (state: AppState) => state.filters;
export const selectSelected = (state: AppState) => state.selected;
export const selectNotifications = (state: AppState) => state.notifications;

// Computed selectors
export const selectPendingBookings = (state: AppState) =>
  state.bookings.filter(booking => booking.status === 'pending');

export const selectAcceptedBookings = (state: AppState) =>
  state.bookings.filter(booking => booking.status === 'accepted');

export const selectRejectedBookings = (state: AppState) =>
  state.bookings.filter(booking => booking.status === 'rejected');

export const selectAvailableMenuItems = (state: AppState) =>
  state.menuItems.filter(item => item.available);

export const selectMenuItemsByCategory =
  (category: string) => (state: AppState) =>
    state.menuItems.filter(item =>
      category === 'all' ? true : item.category === category
    );

export const selectPublishedNews = (state: AppState) =>
  state.news.filter(article => article.published);

export const selectPublishedEvents = (state: AppState) =>
  state.events.filter(event => event.published);

export const selectUpcomingEvents = (state: AppState) => {
  const now = new Date();
  return state.events.filter(
    event => event.published && new Date(event.date) >= now
  );
};

// Filter selectors
export const selectFilteredBookings = (state: AppState) => {
  const { bookings, filters } = state;
  let filtered = bookings;

  if (filters.bookings.status !== 'all') {
    filtered = filtered.filter(
      booking => booking.status === filters.bookings.status
    );
  }

  if (filters.bookings.searchTerm) {
    const term = filters.bookings.searchTerm.toLowerCase();
    filtered = filtered.filter(
      booking =>
        booking.name.toLowerCase().includes(term) ||
        booking.email.toLowerCase().includes(term) ||
        booking.phone.includes(term)
    );
  }

  if (filters.bookings.dateRange) {
    const { start, end } = filters.bookings.dateRange;
    filtered = filtered.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate >= new Date(start) && bookingDate <= new Date(end);
    });
  }

  return filtered;
};

export const selectFilteredMenuItems = (state: AppState) => {
  const { menuItems, filters } = state;
  let filtered = menuItems;

  if (filters.menu.category !== 'all') {
    filtered = filtered.filter(item => item.category === filters.menu.category);
  }

  if (filters.menu.availability !== 'all') {
    const isAvailable = filters.menu.availability === 'available';
    filtered = filtered.filter(item => item.available === isAvailable);
  }

  if (filters.menu.searchTerm) {
    const term = filters.menu.searchTerm.toLowerCase();
    filtered = filtered.filter(
      item =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }

  return filtered;
};

export const selectFilteredNews = (state: AppState) => {
  const { news, filters } = state;
  let filtered = news;

  if (filters.news.published !== 'all') {
    const isPublished = filters.news.published === 'published';
    filtered = filtered.filter(article => article.published === isPublished);
  }

  if (filters.news.searchTerm) {
    const term = filters.news.searchTerm.toLowerCase();
    filtered = filtered.filter(
      article =>
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term)
    );
  }

  return filtered;
};

export const selectFilteredEvents = (state: AppState) => {
  const { events, filters } = state;
  let filtered = events;

  if (filters.events.published !== 'all') {
    const isPublished = filters.events.published === 'published';
    filtered = filtered.filter(event => event.published === isPublished);
  }

  if (filters.events.searchTerm) {
    const term = filters.events.searchTerm.toLowerCase();
    filtered = filtered.filter(
      event =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term)
    );
  }

  return filtered;
};

export default useAppStore;

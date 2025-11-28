import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types for our application state
interface AppState {
  theme: 'light' | 'dark';
  language: string;
  user: {
    isAuthenticated: boolean;
    name: string | null;
    email: string | null;
  } | null;
  notifications: Notification[];
  preferences: {
    animationsEnabled: boolean;
    soundEnabled: boolean;
  };
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: number;
}

// Define action types
type AppAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_USER'; payload: AppState['user'] }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_ANIMATIONS_ENABLED'; payload: boolean }
  | { type: 'SET_SOUND_ENABLED'; payload: boolean };

// Initial state
const initialState: AppState = {
  theme: 'light',
  language: 'en',
  user: null,
  notifications: [],
  preferences: {
    animationsEnabled: true,
    soundEnabled: true,
  },
};

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'ADD_NOTIFICATION':
      const newNotification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        type: action.payload.type,
        message: action.payload.message,
        timestamp: Date.now(),
      };
      return {
        ...state,
        notifications: [...state.notifications, newNotification],
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };

    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };

    case 'SET_ANIMATIONS_ENABLED':
      return {
        ...state,
        preferences: { ...state.preferences, animationsEnabled: action.payload },
      };

    case 'SET_SOUND_ENABLED':
      return {
        ...state,
        preferences: { ...state.preferences, soundEnabled: action.payload },
      };

    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Helper functions for common actions
export const useNotifications = () => {
  const { dispatch } = useAppContext();

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  return { addNotification, removeNotification, clearNotifications };
};

export const usePreferences = () => {
  const { state, dispatch } = useAppContext();

  const setAnimationsEnabled = (enabled: boolean) => {
    dispatch({ type: 'SET_ANIMATIONS_ENABLED', payload: enabled });
  };

  const setSoundEnabled = (enabled: boolean) => {
    dispatch({ type: 'SET_SOUND_ENABLED', payload: enabled });
  };

  return {
    animationsEnabled: state.preferences.animationsEnabled,
    soundEnabled: state.preferences.soundEnabled,
    setAnimationsEnabled,
    setSoundEnabled,
  };
};

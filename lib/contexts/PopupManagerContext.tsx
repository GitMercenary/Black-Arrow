'use client';

import { createContext, useContext, useCallback, useRef, useState, type ReactNode } from 'react';

type PopupId = 'newsletter' | 'cookie' | 'launch';

interface PopupManagerContextType {
  activePopup: PopupId | null;
  requestShow: (id: PopupId) => boolean;
  dismiss: (id: PopupId) => void;
}

const PopupManagerContext = createContext<PopupManagerContextType>({
  activePopup: null,
  requestShow: () => false,
  dismiss: () => {},
});

export function PopupManagerProvider({ children }: { children: ReactNode }) {
  const activeRef = useRef<PopupId | null>(null);
  const [activePopup, setActivePopup] = useState<PopupId | null>(null);

  const requestShow = useCallback((id: PopupId): boolean => {
    if (activeRef.current === null) {
      activeRef.current = id;
      setActivePopup(id);
      return true;
    }
    return false;
  }, []);

  const dismiss = useCallback((id: PopupId) => {
    if (activeRef.current === id) {
      activeRef.current = null;
      setActivePopup(null);
    }
  }, []);

  return (
    <PopupManagerContext.Provider value={{ activePopup, requestShow, dismiss }}>
      {children}
    </PopupManagerContext.Provider>
  );
}

export const usePopupManager = () => useContext(PopupManagerContext);

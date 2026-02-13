'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useModalManager } from './ModalManagerContext';

export type WebDevService = 'website-development' | 'landing-page' | 'business-site' | 'custom-web-app';

interface WebDevQuoteContextType {
  isOpen: boolean;
  service: WebDevService;
  openQuote: (service?: WebDevService) => void;
  closeQuote: () => void;
}

const WebDevQuoteContext = createContext<WebDevQuoteContextType | undefined>(undefined);

export function WebDevQuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<WebDevService>('website-development');
  const { registerModal, unregisterModal } = useModalManager();

  const openQuote = (s: WebDevService = 'website-development') => {
    setService(s);
    registerModal('webdev-quote');
    setIsOpen(true);
  };
  const closeQuote = () => {
    setIsOpen(false);
    unregisterModal('webdev-quote');
  };

  return (
    <WebDevQuoteContext.Provider value={{ isOpen, service, openQuote, closeQuote }}>
      {children}
    </WebDevQuoteContext.Provider>
  );
}

export function useWebDevQuote() {
  const context = useContext(WebDevQuoteContext);
  if (context === undefined) {
    throw new Error('useWebDevQuote must be used within a WebDevQuoteProvider');
  }
  return context;
}

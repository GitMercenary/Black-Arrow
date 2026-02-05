'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AIAuditContextType {
  isOpen: boolean;
  openAudit: () => void;
  closeAudit: () => void;
}

const AIAuditContext = createContext<AIAuditContextType | undefined>(undefined);

export function AIAuditProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAudit = () => setIsOpen(true);
  const closeAudit = () => setIsOpen(false);

  return (
    <AIAuditContext.Provider value={{ isOpen, openAudit, closeAudit }}>
      {children}
    </AIAuditContext.Provider>
  );
}

export function useAIAudit() {
  const context = useContext(AIAuditContext);
  if (context === undefined) {
    throw new Error('useAIAudit must be used within an AIAuditProvider');
  }
  return context;
}

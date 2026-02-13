'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useModalManager } from './ModalManagerContext';

interface AIAuditContextType {
  isOpen: boolean;
  openAudit: () => void;
  closeAudit: () => void;
}

const AIAuditContext = createContext<AIAuditContextType | undefined>(undefined);

export function AIAuditProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { registerModal, unregisterModal } = useModalManager();

  const openAudit = () => {
    registerModal('ai-audit');
    setIsOpen(true);
  };
  const closeAudit = () => {
    setIsOpen(false);
    unregisterModal('ai-audit');
  };

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

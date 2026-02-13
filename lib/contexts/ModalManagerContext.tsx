'use client';

import { createContext, useContext, useCallback, useRef, useState, type ReactNode } from 'react';

interface ModalManagerContextType {
  activeModal: string | null;
  isModalOpen: boolean;
  registerModal: (id: string) => void;
  unregisterModal: (id: string) => void;
}

const ModalManagerContext = createContext<ModalManagerContextType>({
  activeModal: null,
  isModalOpen: false,
  registerModal: () => {},
  unregisterModal: () => {},
});

export function ModalManagerProvider({ children }: { children: ReactNode }) {
  const activeRef = useRef<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const registerModal = useCallback((id: string) => {
    activeRef.current = id;
    setActiveModal(id);
  }, []);

  const unregisterModal = useCallback((id: string) => {
    if (activeRef.current === id) {
      activeRef.current = null;
      setActiveModal(null);
    }
  }, []);

  return (
    <ModalManagerContext.Provider
      value={{
        activeModal,
        isModalOpen: activeModal !== null,
        registerModal,
        unregisterModal,
      }}
    >
      {children}
    </ModalManagerContext.Provider>
  );
}

export const useModalManager = () => useContext(ModalManagerContext);

'use client';

import { useAIAudit } from '@/lib/contexts/AIAuditContext';
import AIAuditPopup from './AIAuditPopup';

export default function AIAuditPopupWrapper() {
  const { isOpen, closeAudit } = useAIAudit();

  return <AIAuditPopup isOpen={isOpen} onClose={closeAudit} />;
}

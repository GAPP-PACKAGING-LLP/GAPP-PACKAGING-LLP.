import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { ModalDrawer } from './ModalDrawer';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete Record',
  cancelText = 'Cancel',
  isDestructive = true,
  isLoading = false
}) => {
  return (
    <ModalDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant="modal"
      maxWidth="sm"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-xs font-bold text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-700 shadow-sm shadow-red-600/20'
                : 'bg-[#0F4C5C] hover:bg-[#0c3c49]'
            } disabled:opacity-50`}
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{confirmText}</span>
          </button>
        </>
      }
    >
      <div className="flex items-start gap-3.5 py-1">
        <div className="p-2.5 rounded-xl bg-red-100 text-red-600 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
      </div>
    </ModalDrawer>
  );
};

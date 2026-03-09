import { X, AlertTriangle } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'global' | 'section';
  sectionName?: string;
}

export default function ResetModal({ isOpen, onClose, onConfirm, type, sectionName }: ResetModalProps) {
  if (!isOpen) return null;

  const globalMessage = "This will permanently clear your entire campaign including all scripts, audience data, product details, content calendar, UGC hub data, niche, rates, portfolio, pitches and saved packs. This cannot be undone. Are you sure you want to start over?";

  const sectionMessage = `This will clear all data from ${sectionName}. This cannot be undone. Are you sure?`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1832] border border-[#c9a84c]/20 rounded-xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-500/10">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              {type === 'global' ? 'Reset Everything?' : 'Reset This Section?'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">
          {type === 'global' ? globalMessage : sectionMessage}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
          >
            {type === 'global' ? 'Yes, Reset Everything' : 'Yes, Reset Section'}
          </button>
        </div>
      </div>
    </div>
  );
}

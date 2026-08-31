import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { companyData } from '../../data/companyData';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    `Hello GAPP Packaging LLP, I am inquiring about industrial corrugated boxes and custom packaging solutions for my business.`
  );

  const whatsappUrl = `https://wa.me/${companyData.whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end group" id="whatsapp-floating-container">
      {/* Mini Dismissable Tooltip / Badge */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg shadow-xl border border-slate-200 mb-2.5 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Chat with Production Desk</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }} 
            className="text-slate-400 hover:text-slate-600 ml-1"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-chat-button"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 border-2 border-white focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat on WhatsApp with GAPP Packaging"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-white" />
      </a>
    </div>
  );
};

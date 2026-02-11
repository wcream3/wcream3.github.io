
import React from 'react';

interface ConnectionStatusProps {
  isConnected: boolean;
  onConnect: () => void;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected, onConnect }) => {
  return (
    <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-black/40 border border-white/10">
      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`} />
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
        {isConnected ? 'Server Linked' : 'Server Offline'}
      </span>
      {!isConnected && (
        <button 
          onClick={onConnect}
          className="text-[9px] bg-violet-600 hover:bg-violet-500 px-2 py-0.5 rounded text-white font-bold transition-colors"
        >
          CONNECT
        </button>
      )}
    </div>
  );
};

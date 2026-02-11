
import React from 'react';
import { PrankAction } from '../types';

interface ActionCardProps {
  action: PrankAction;
  onExecute: (action: PrankAction) => void;
  disabled: boolean;
}

export const ActionCard: React.FC<ActionCardProps> = ({ action, onExecute, disabled }) => {
  const intensityColor = {
    Low: 'text-blue-400',
    Medium: 'text-yellow-400',
    High: 'text-red-400'
  }[action.intensity];

  return (
    <button
      disabled={disabled}
      onClick={() => onExecute(action)}
      className={`group relative text-left p-4 rounded-xl border transition-all duration-300 ${
        disabled 
        ? 'opacity-50 grayscale cursor-not-allowed bg-slate-900 border-slate-800' 
        : 'glass border-white/10 hover:border-violet-500/50 hover:bg-white/5'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 uppercase tracking-wider">
          {action.category}
        </span>
        <span className={`text-[10px] font-bold ${intensityColor}`}>
          {action.intensity.toUpperCase()}
        </span>
      </div>
      <h4 className="font-bold text-md mb-1 group-hover:text-violet-400 transition-colors">
        {action.name}
      </h4>
      <p className="text-xs text-slate-400 leading-relaxed">
        {action.description}
      </p>
    </button>
  );
};

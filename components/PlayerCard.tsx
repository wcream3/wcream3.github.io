
import React from 'react';
import { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onSelect: (player: Player) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, isSelected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(player)}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
        isSelected 
        ? 'glass ring-2 ring-violet-500 scale-[1.02] shadow-lg shadow-violet-500/20' 
        : 'glass hover:bg-white/5 border-transparent'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <img 
            src={`https://picsum.photos/seed/${player.name}/100/100`} 
            alt={player.name} 
            className="w-12 h-12 rounded-full border border-white/20"
          />
          {player.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0c]" />
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-bold text-lg truncate">{player.name}</h3>
          <p className="text-xs text-slate-400 truncate">{player.location}</p>
        </div>
      </div>
    </div>
  );
};

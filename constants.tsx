
import React from 'react';
import { PrankAction, PrankCategory, Player } from './types';

export const PRANK_LIBRARY: PrankAction[] = [
  {
    id: 'fake-shiny',
    name: 'Fake Shiny Sparkle',
    category: PrankCategory.VISUAL,
    description: 'Displays a massive shiny particle effect around the player as if they encountered a legendary.',
    intensity: 'Low',
    commandTemplate: '/troll particles shiny {player}'
  },
  {
    id: 'ghost-sound',
    name: 'Ghostly Whisper',
    category: PrankCategory.AUDIO,
    description: 'Plays a distorted Enderman scream or Cave sound directly in the player\'s ears.',
    intensity: 'Medium',
    commandTemplate: '/troll sound ghost {player}'
  },
  {
    id: 'fake-ban',
    name: 'Mock Ban Warning',
    category: PrankCategory.SOCIAL,
    description: 'Sends a system message only to the player: "Automated ban initiated. 10 seconds remaining."',
    intensity: 'High',
    commandTemplate: '/troll message ban {player}'
  },
  {
    id: 'inventory-swap',
    name: 'Item Jumble',
    category: PrankCategory.GAMEPLAY,
    description: 'Swaps the position of every item in their hotbar randomly.',
    intensity: 'Medium',
    commandTemplate: '/troll inv jumble {player}'
  },
  {
    id: 'creeper-hiss',
    name: 'Phantom Hiss',
    category: PrankCategory.AUDIO,
    description: 'Plays the Creeper fuse sound right behind the player.',
    intensity: 'Medium',
    commandTemplate: '/troll sound creeper {player}'
  },
  {
    id: 'fake-op',
    name: 'Mock OP Grant',
    category: PrankCategory.SOCIAL,
    description: 'Tells the player they have been granted Operator status (but they actually haven\'t).',
    intensity: 'Low',
    commandTemplate: '/troll message op {player}'
  }
];

export const MOCK_PLAYERS: Player[] = [
  { id: '1', name: 'ZexyZek', isOnline: true, location: 'Spawn City', recentActivity: 'Mining Diamonds', inventorySummary: 'Diamond Pickaxe, Iron Armor' },
  { id: '2', name: 'TechnoFan', isOnline: true, location: 'PokeCenter', recentActivity: 'Healing Mons', inventorySummary: 'Master Ball, Ultra Ball x12' },
  { id: '3', name: 'Dreamy', isOnline: false, location: 'The End', recentActivity: 'Last seen 2h ago', inventorySummary: 'Ender Pearls x16' },
  { id: '4', name: 'MewTwoHunter', isOnline: true, location: 'Forest Biome', recentActivity: 'Hunting Legendaries', inventorySummary: 'Rare Candy x5' }
];

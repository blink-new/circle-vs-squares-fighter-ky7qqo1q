export interface CosmeticItem {
  id: string
  name: string
  description: string
  category: 'skin' | 'trail' | 'weapon_skin' | 'emote'
  cost: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  effect?: string
  previewColor?: string
}

export const cosmetics: CosmeticItem[] = [
  // Player Skins
  {
    id: 'default-skin',
    name: 'Default',
    description: 'The classic purple circle look',
    category: 'skin',
    cost: 0,
    rarity: 'common',
    previewColor: '#8B5CF6'
  },
  {
    id: 'crimson-skin',
    name: 'Crimson Warrior',
    description: 'A fierce red glow for battle-hardened fighters',
    category: 'skin',
    cost: 500,
    rarity: 'common',
    previewColor: '#DC2626'
  },
  {
    id: 'emerald-skin',
    name: 'Emerald Guardian',
    description: 'Nature\'s protection in vibrant green',
    category: 'skin',
    cost: 750,
    rarity: 'rare',
    previewColor: '#059669'
  },
  {
    id: 'golden-skin',
    name: 'Golden Emperor',
    description: 'Shine like the sun with this premium gold finish',
    category: 'skin',
    cost: 1200,
    rarity: 'epic',
    previewColor: '#F59E0B'
  },
  {
    id: 'void-skin',
    name: 'Void Walker',
    description: 'Embrace the darkness with this mysterious black skin',
    category: 'skin',
    cost: 2000,
    rarity: 'legendary',
    previewColor: '#1F2937'
  },
  {
    id: 'rainbow-skin',
    name: 'Prismatic',
    description: 'Cycles through all colors of the rainbow',
    category: 'skin',
    cost: 3000,
    rarity: 'legendary',
    previewColor: '#FF6B6B',
    effect: 'rainbow'
  },

  // Movement Trails
  {
    id: 'default-trail',
    name: 'No Trail',
    description: 'Clean movement without any trail effect',
    category: 'trail',
    cost: 0,
    rarity: 'common'
  },
  {
    id: 'fire-trail',
    name: 'Fire Trail',
    description: 'Leave a burning path behind you',
    category: 'trail',
    cost: 400,
    rarity: 'common',
    previewColor: '#F97316'
  },
  {
    id: 'ice-trail',
    name: 'Ice Trail',
    description: 'Freeze your enemies with this cool blue trail',
    category: 'trail',
    cost: 600,
    rarity: 'rare',
    previewColor: '#0EA5E9'
  },
  {
    id: 'lightning-trail',
    name: 'Lightning Trail',
    description: 'Electrify the battlefield with crackling energy',
    category: 'trail',
    cost: 1000,
    rarity: 'epic',
    previewColor: '#EAB308'
  },
  {
    id: 'shadow-trail',
    name: 'Shadow Trail',
    description: 'Move like a phantom with this dark energy trail',
    category: 'trail',
    cost: 1500,
    rarity: 'legendary',
    previewColor: '#6B7280'
  },

  // Weapon Skins
  {
    id: 'default-weapon',
    name: 'Standard',
    description: 'The classic weapon appearance',
    category: 'weapon_skin',
    cost: 0,
    rarity: 'common'
  },
  {
    id: 'chrome-weapon',
    name: 'Chrome Finish',
    description: 'Shiny chrome plating for all weapons',
    category: 'weapon_skin',
    cost: 800,
    rarity: 'rare',
    previewColor: '#9CA3AF'
  },
  {
    id: 'neon-weapon',
    name: 'Neon Glow',
    description: 'Weapons glow with neon energy',
    category: 'weapon_skin',
    cost: 1500,
    rarity: 'epic',
    previewColor: '#10B981'
  },
  {
    id: 'plasma-weapon',
    name: 'Plasma Core',
    description: 'Weapons infused with plasma energy',
    category: 'weapon_skin',
    cost: 2500,
    rarity: 'legendary',
    previewColor: '#8B5CF6'
  },

  // Emotes
  {
    id: 'default-emote',
    name: 'None',
    description: 'No special victory animation',
    category: 'emote',
    cost: 0,
    rarity: 'common'
  },
  {
    id: 'spin-emote',
    name: 'Victory Spin',
    description: 'Spin in celebration after each wave',
    category: 'emote',
    cost: 300,
    rarity: 'common'
  },
  {
    id: 'pulse-emote',
    name: 'Power Pulse',
    description: 'Pulse with energy to show your strength',
    category: 'emote',
    cost: 600,
    rarity: 'rare'
  },
  {
    id: 'lightning-emote',
    name: 'Lightning Strike',
    description: 'Call down lightning to celebrate victory',
    category: 'emote',
    cost: 1200,
    rarity: 'epic'
  },
  {
    id: 'explosion-emote',
    name: 'Explosion',
    description: 'Create a spectacular explosion effect',
    category: 'emote',
    cost: 2000,
    rarity: 'legendary'
  }
]

export const cosmeticCategories = ['skin', 'trail', 'weapon_skin', 'emote'] as const

export const rarityColors = {
  common: '#9CA3AF',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B'
}

export const rarityPrices = {
  common: 1,
  rare: 1.5,
  epic: 2,
  legendary: 3
}
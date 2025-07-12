export interface ArmorPiece {
  id: string
  name: string
  description: string
  slot: 'helmet' | 'chest' | 'legs' | 'boots' | 'gloves' | 'shield'
  cost: number
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  stats: {
    health: number
    armor: number
    speed: number
    damage: number
    critChance: number
    dodgeChance: number
    regenRate: number
  }
  visual: {
    color: string
    pattern?: string
    glow?: boolean
  }
  requirements?: {
    wave?: number
    kills?: number
    level?: number
  }
}

export const armorPieces: ArmorPiece[] = [
  // HELMETS
  {
    id: 'helmet_basic',
    name: 'Basic Helmet',
    description: 'Simple protection for your head',
    slot: 'helmet',
    cost: 150,
    rarity: 'common',
    stats: { health: 25, armor: 2, speed: 0, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#666666' }
  },
  {
    id: 'helmet_tactical',
    name: 'Tactical Helmet',
    description: 'Military-grade head protection with enhanced awareness',
    slot: 'helmet',
    cost: 400,
    rarity: 'uncommon',
    stats: { health: 40, armor: 3, speed: 0, damage: 0, critChance: 5, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#4a5568' }
  },
  {
    id: 'helmet_assault',
    name: 'Assault Helmet',
    description: 'Heavy-duty combat helmet with ballistic protection',
    slot: 'helmet',
    cost: 800,
    rarity: 'rare',
    stats: { health: 60, armor: 5, speed: -5, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#2d3748' }
  },
  {
    id: 'helmet_cyber',
    name: 'Cyber Helmet',
    description: 'Futuristic helmet with integrated HUD and targeting systems',
    slot: 'helmet',
    cost: 1500,
    rarity: 'epic',
    stats: { health: 50, armor: 4, speed: 0, damage: 10, critChance: 15, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#00ffff', glow: true }
  },
  {
    id: 'helmet_dragon',
    name: 'Dragon Skull Helmet',
    description: 'Forged from ancient dragon bone, grants mystical powers',
    slot: 'helmet',
    cost: 3000,
    rarity: 'legendary',
    stats: { health: 100, armor: 8, speed: 0, damage: 20, critChance: 20, dodgeChance: 0, regenRate: 2 },
    visual: { color: '#ff6b6b', pattern: 'dragon', glow: true }
  },
  {
    id: 'helmet_stealth',
    name: 'Stealth Hood',
    description: 'Lightweight hood that enhances agility and evasion',
    slot: 'helmet',
    cost: 600,
    rarity: 'uncommon',
    stats: { health: 20, armor: 1, speed: 15, damage: 0, critChance: 0, dodgeChance: 20, regenRate: 0 },
    visual: { color: '#1a202c' }
  },
  {
    id: 'helmet_berserker',
    name: 'Berserker Helm',
    description: 'Intimidating helmet that boosts combat fury',
    slot: 'helmet',
    cost: 1200,
    rarity: 'rare',
    stats: { health: 80, armor: 6, speed: 0, damage: 25, critChance: 10, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#e53e3e' }
  },
  {
    id: 'helmet_ninja',
    name: 'Shadow Mask',
    description: 'Ancient ninja mask that grants supernatural reflexes',
    slot: 'helmet',
    cost: 2000,
    rarity: 'epic',
    stats: { health: 30, armor: 2, speed: 25, damage: 15, critChance: 25, dodgeChance: 30, regenRate: 0 },
    visual: { color: '#000000' }
  },
  {
    id: 'helmet_phoenix',
    name: 'Phoenix Crown',
    description: 'Legendary crown that grants rebirth powers',
    slot: 'helmet',
    cost: 5000,
    rarity: 'legendary',
    stats: { health: 150, armor: 10, speed: 10, damage: 30, critChance: 30, dodgeChance: 0, regenRate: 5 },
    visual: { color: '#ff9500', pattern: 'phoenix', glow: true }
  },
  {
    id: 'helmet_void',
    name: 'Void Helmet',
    description: 'Mysterious helmet from the void dimension',
    slot: 'helmet',
    cost: 4000,
    rarity: 'legendary',
    stats: { health: 75, armor: 12, speed: 0, damage: 35, critChance: 0, dodgeChance: 25, regenRate: 1 },
    visual: { color: '#6b46c1', glow: true }
  },

  // CHEST ARMOR
  {
    id: 'chest_basic',
    name: 'Basic Vest',
    description: 'Simple protective vest',
    slot: 'chest',
    cost: 200,
    rarity: 'common',
    stats: { health: 50, armor: 3, speed: 0, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#666666' }
  },
  {
    id: 'chest_tactical',
    name: 'Tactical Vest',
    description: 'Military-grade body armor with equipment pouches',
    slot: 'chest',
    cost: 500,
    rarity: 'uncommon',
    stats: { health: 75, armor: 5, speed: 0, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 1 },
    visual: { color: '#4a5568' }
  },
  {
    id: 'chest_riot',
    name: 'Riot Armor',
    description: 'Heavy riot control armor with maximum protection',
    slot: 'chest',
    cost: 1000,
    rarity: 'rare',
    stats: { health: 120, armor: 8, speed: -10, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#2d3748' }
  },
  {
    id: 'chest_power',
    name: 'Power Armor',
    description: 'Powered exoskeleton that enhances all abilities',
    slot: 'chest',
    cost: 2500,
    rarity: 'epic',
    stats: { health: 200, armor: 12, speed: 5, damage: 20, critChance: 10, dodgeChance: 0, regenRate: 2 },
    visual: { color: '#00ffff', glow: true }
  },
  {
    id: 'chest_dragon',
    name: 'Dragon Scale Mail',
    description: 'Armor crafted from dragon scales, nearly indestructible',
    slot: 'chest',
    cost: 4000,
    rarity: 'legendary',
    stats: { health: 300, armor: 20, speed: 0, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 3 },
    visual: { color: '#ff6b6b', pattern: 'scales', glow: true }
  },
  {
    id: 'chest_ninja',
    name: 'Shadow Gi',
    description: 'Traditional ninja outfit that enhances stealth',
    slot: 'chest',
    cost: 800,
    rarity: 'rare',
    stats: { health: 60, armor: 2, speed: 20, damage: 0, critChance: 0, dodgeChance: 25, regenRate: 0 },
    visual: { color: '#1a202c' }
  },
  {
    id: 'chest_berserker',
    name: 'Berserker Plate',
    description: 'Savage armor that increases combat prowess',
    slot: 'chest',
    cost: 1500,
    rarity: 'rare',
    stats: { health: 150, armor: 10, speed: 0, damage: 30, critChance: 15, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#e53e3e' }
  },
  {
    id: 'chest_mage',
    name: 'Arcane Robes',
    description: 'Mystical robes that enhance magical abilities',
    slot: 'chest',
    cost: 1800,
    rarity: 'epic',
    stats: { health: 80, armor: 4, speed: 10, damage: 40, critChance: 20, dodgeChance: 0, regenRate: 4 },
    visual: { color: '#9f7aea', glow: true }
  },
  {
    id: 'chest_phoenix',
    name: 'Phoenix Armor',
    description: 'Legendary armor that grants resurrection powers',
    slot: 'chest',
    cost: 6000,
    rarity: 'legendary',
    stats: { health: 250, armor: 15, speed: 15, damage: 25, critChance: 25, dodgeChance: 0, regenRate: 8 },
    visual: { color: '#ff9500', pattern: 'phoenix', glow: true }
  },
  {
    id: 'chest_void',
    name: 'Void Plate',
    description: 'Armor forged in the void, defies conventional physics',
    slot: 'chest',
    cost: 5000,
    rarity: 'legendary',
    stats: { health: 200, armor: 25, speed: 0, damage: 50, critChance: 0, dodgeChance: 30, regenRate: 2 },
    visual: { color: '#6b46c1', glow: true }
  },

  // LEGS ARMOR
  {
    id: 'legs_basic',
    name: 'Basic Pants',
    description: 'Simple protective leggings',
    slot: 'legs',
    cost: 100,
    rarity: 'common',
    stats: { health: 30, armor: 2, speed: 0, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#666666' }
  },
  {
    id: 'legs_tactical',
    name: 'Tactical Pants',
    description: 'Military cargo pants with knee protection',
    slot: 'legs',
    cost: 300,
    rarity: 'uncommon',
    stats: { health: 50, armor: 3, speed: 5, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#4a5568' }
  },
  {
    id: 'legs_heavy',
    name: 'Heavy Leg Armor',
    description: 'Reinforced leg protection for maximum defense',
    slot: 'legs',
    cost: 600,
    rarity: 'rare',
    stats: { health: 80, armor: 6, speed: -5, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#2d3748' }
  },
  {
    id: 'legs_sprint',
    name: 'Sprint Leggings',
    description: 'Lightweight armor designed for speed',
    slot: 'legs',
    cost: 700,
    rarity: 'rare',
    stats: { health: 40, armor: 2, speed: 25, damage: 0, critChance: 0, dodgeChance: 15, regenRate: 0 },
    visual: { color: '#38b2ac' }
  },
  {
    id: 'legs_power',
    name: 'Power Legs',
    description: 'Powered leg armor with enhanced mobility',
    slot: 'legs',
    cost: 1500,
    rarity: 'epic',
    stats: { health: 100, armor: 8, speed: 20, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 1 },
    visual: { color: '#00ffff', glow: true }
  },
  {
    id: 'legs_dragon',
    name: 'Dragon Scale Leggings',
    description: 'Flexible dragon scale armor for the legs',
    slot: 'legs',
    cost: 2500,
    rarity: 'legendary',
    stats: { health: 150, armor: 12, speed: 10, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 2 },
    visual: { color: '#ff6b6b', pattern: 'scales', glow: true }
  },
  {
    id: 'legs_ninja',
    name: 'Shadow Hakama',
    description: 'Traditional ninja leg wear that enhances stealth',
    slot: 'legs',
    cost: 500,
    rarity: 'uncommon',
    stats: { health: 35, armor: 1, speed: 15, damage: 0, critChance: 0, dodgeChance: 20, regenRate: 0 },
    visual: { color: '#1a202c' }
  },
  {
    id: 'legs_berserker',
    name: 'Berserker Greaves',
    description: 'Savage leg armor that intimidates enemies',
    slot: 'legs',
    cost: 900,
    rarity: 'rare',
    stats: { health: 90, armor: 5, speed: 0, damage: 15, critChance: 10, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#e53e3e' }
  },
  {
    id: 'legs_mage',
    name: 'Arcane Leggings',
    description: 'Mystical leg armor that channels magical energy',
    slot: 'legs',
    cost: 1200,
    rarity: 'epic',
    stats: { health: 60, armor: 3, speed: 5, damage: 25, critChance: 15, dodgeChance: 0, regenRate: 2 },
    visual: { color: '#9f7aea', glow: true }
  },
  {
    id: 'legs_void',
    name: 'Void Leggings',
    description: 'Leg armor infused with void energy',
    slot: 'legs',
    cost: 3000,
    rarity: 'legendary',
    stats: { health: 120, armor: 15, speed: 0, damage: 30, critChance: 0, dodgeChance: 25, regenRate: 1 },
    visual: { color: '#6b46c1', glow: true }
  },

  // BOOTS
  {
    id: 'boots_basic',
    name: 'Basic Boots',
    description: 'Simple protective footwear',
    slot: 'boots',
    cost: 80,
    rarity: 'common',
    stats: { health: 15, armor: 1, speed: 5, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#666666' }
  },
  {
    id: 'boots_combat',
    name: 'Combat Boots',
    description: 'Military-grade boots with reinforced soles',
    slot: 'boots',
    cost: 250,
    rarity: 'uncommon',
    stats: { health: 25, armor: 2, speed: 10, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#4a5568' }
  },
  {
    id: 'boots_steel',
    name: 'Steel-Toed Boots',
    description: 'Heavy boots with steel reinforcement',
    slot: 'boots',
    cost: 400,
    rarity: 'rare',
    stats: { health: 40, armor: 4, speed: 0, damage: 10, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#2d3748' }
  },
  {
    id: 'boots_speed',
    name: 'Speed Boots',
    description: 'Lightweight boots designed for maximum speed',
    slot: 'boots',
    cost: 600,
    rarity: 'rare',
    stats: { health: 20, armor: 1, speed: 30, damage: 0, critChance: 0, dodgeChance: 10, regenRate: 0 },
    visual: { color: '#38b2ac' }
  },
  {
    id: 'boots_jump',
    name: 'Jump Boots',
    description: 'Powered boots that enhance mobility',
    slot: 'boots',
    cost: 1000,
    rarity: 'epic',
    stats: { health: 30, armor: 3, speed: 25, damage: 0, critChance: 0, dodgeChance: 20, regenRate: 0 },
    visual: { color: '#00ffff', glow: true }
  },
  {
    id: 'boots_dragon',
    name: 'Dragon Claw Boots',
    description: 'Boots made from dragon claws, grant powerful kicks',
    slot: 'boots',
    cost: 2000,
    rarity: 'legendary',
    stats: { health: 80, armor: 8, speed: 15, damage: 25, critChance: 15, dodgeChance: 0, regenRate: 1 },
    visual: { color: '#ff6b6b', pattern: 'claws', glow: true }
  },
  {
    id: 'boots_ninja',
    name: 'Shadow Tabi',
    description: 'Traditional ninja footwear for silent movement',
    slot: 'boots',
    cost: 350,
    rarity: 'uncommon',
    stats: { health: 15, armor: 0, speed: 20, damage: 0, critChance: 0, dodgeChance: 25, regenRate: 0 },
    visual: { color: '#1a202c' }
  },
  {
    id: 'boots_berserker',
    name: 'Berserker Boots',
    description: 'Savage boots for charging into battle',
    slot: 'boots',
    cost: 700,
    rarity: 'rare',
    stats: { health: 50, armor: 3, speed: 10, damage: 20, critChance: 5, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#e53e3e' }
  },
  {
    id: 'boots_mage',
    name: 'Arcane Boots',
    description: 'Mystical boots that hover slightly above ground',
    slot: 'boots',
    cost: 900,
    rarity: 'epic',
    stats: { health: 25, armor: 2, speed: 15, damage: 15, critChance: 10, dodgeChance: 15, regenRate: 1 },
    visual: { color: '#9f7aea', glow: true }
  },
  {
    id: 'boots_void',
    name: 'Void Walkers',
    description: 'Boots that allow walking through dimensions',
    slot: 'boots',
    cost: 2500,
    rarity: 'legendary',
    stats: { health: 60, armor: 10, speed: 0, damage: 35, critChance: 0, dodgeChance: 40, regenRate: 1 },
    visual: { color: '#6b46c1', glow: true }
  },

  // GLOVES
  {
    id: 'gloves_basic',
    name: 'Basic Gloves',
    description: 'Simple protective hand wear',
    slot: 'gloves',
    cost: 60,
    rarity: 'common',
    stats: { health: 10, armor: 1, speed: 0, damage: 5, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#666666' }
  },
  {
    id: 'gloves_tactical',
    name: 'Tactical Gloves',
    description: 'Military gloves with enhanced grip',
    slot: 'gloves',
    cost: 200,
    rarity: 'uncommon',
    stats: { health: 15, armor: 2, speed: 0, damage: 10, critChance: 5, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#4a5568' }
  },
  {
    id: 'gloves_power',
    name: 'Power Gauntlets',
    description: 'Powered gloves that enhance strength',
    slot: 'gloves',
    cost: 800,
    rarity: 'rare',
    stats: { health: 30, armor: 4, speed: 0, damage: 25, critChance: 10, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#00ffff', glow: true }
  },
  {
    id: 'gloves_dragon',
    name: 'Dragon Gauntlets',
    description: 'Gauntlets forged from dragon bone and scale',
    slot: 'gloves',
    cost: 1500,
    rarity: 'legendary',
    stats: { health: 60, armor: 8, speed: 0, damage: 40, critChance: 20, dodgeChance: 0, regenRate: 1 },
    visual: { color: '#ff6b6b', pattern: 'dragon', glow: true }
  },
  {
    id: 'gloves_ninja',
    name: 'Shadow Gloves',
    description: 'Ninja gloves that enhance weapon handling',
    slot: 'gloves',
    cost: 300,
    rarity: 'uncommon',
    stats: { health: 12, armor: 1, speed: 5, damage: 15, critChance: 15, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#1a202c' }
  },
  {
    id: 'gloves_berserker',
    name: 'Berserker Gauntlets',
    description: 'Savage gauntlets that thirst for battle',
    slot: 'gloves',
    cost: 500,
    rarity: 'rare',
    stats: { health: 25, armor: 3, speed: 0, damage: 30, critChance: 15, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#e53e3e' }
  },
  {
    id: 'gloves_mage',
    name: 'Arcane Gloves',
    description: 'Mystical gloves that channel magical energy',
    slot: 'gloves',
    cost: 700,
    rarity: 'epic',
    stats: { health: 20, armor: 2, speed: 0, damage: 35, critChance: 25, dodgeChance: 0, regenRate: 2 },
    visual: { color: '#9f7aea', glow: true }
  },
  {
    id: 'gloves_void',
    name: 'Void Gauntlets',
    description: 'Gauntlets that manipulate void energy',
    slot: 'gloves',
    cost: 2000,
    rarity: 'legendary',
    stats: { health: 40, armor: 12, speed: 0, damage: 50, critChance: 0, dodgeChance: 20, regenRate: 1 },
    visual: { color: '#6b46c1', glow: true }
  },

  // SHIELDS
  {
    id: 'shield_basic',
    name: 'Basic Shield',
    description: 'Simple round shield for defense',
    slot: 'shield',
    cost: 120,
    rarity: 'common',
    stats: { health: 20, armor: 5, speed: -5, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#666666' }
  },
  {
    id: 'shield_kite',
    name: 'Kite Shield',
    description: 'Large medieval shield with excellent coverage',
    slot: 'shield',
    cost: 400,
    rarity: 'uncommon',
    stats: { health: 40, armor: 10, speed: -10, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#4a5568' }
  },
  {
    id: 'shield_tower',
    name: 'Tower Shield',
    description: 'Massive shield that provides maximum protection',
    slot: 'shield',
    cost: 800,
    rarity: 'rare',
    stats: { health: 80, armor: 20, speed: -20, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#2d3748' }
  },
  {
    id: 'shield_energy',
    name: 'Energy Shield',
    description: 'High-tech shield that projects an energy barrier',
    slot: 'shield',
    cost: 1500,
    rarity: 'epic',
    stats: { health: 60, armor: 15, speed: 0, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 3 },
    visual: { color: '#00ffff', glow: true }
  },
  {
    id: 'shield_dragon',
    name: 'Dragon Shield',
    description: 'Shield made from dragon hide and reinforced with scales',
    slot: 'shield',
    cost: 3000,
    rarity: 'legendary',
    stats: { health: 120, armor: 30, speed: -5, damage: 0, critChance: 0, dodgeChance: 0, regenRate: 2 },
    visual: { color: '#ff6b6b', pattern: 'dragon', glow: true }
  },
  {
    id: 'shield_buckler',
    name: 'Ninja Buckler',
    description: 'Small shield designed for agile combat',
    slot: 'shield',
    cost: 300,
    rarity: 'uncommon',
    stats: { health: 15, armor: 3, speed: 5, damage: 0, critChance: 0, dodgeChance: 15, regenRate: 0 },
    visual: { color: '#1a202c' }
  },
  {
    id: 'shield_spiked',
    name: 'Spiked Shield',
    description: 'Aggressive shield with offensive capabilities',
    slot: 'shield',
    cost: 600,
    rarity: 'rare',
    stats: { health: 30, armor: 8, speed: -5, damage: 15, critChance: 0, dodgeChance: 0, regenRate: 0 },
    visual: { color: '#e53e3e' }
  },
  {
    id: 'shield_arcane',
    name: 'Arcane Shield',
    description: 'Mystical shield that enhances magical abilities',
    slot: 'shield',
    cost: 1200,
    rarity: 'epic',
    stats: { health: 50, armor: 12, speed: 0, damage: 20, critChance: 10, dodgeChance: 0, regenRate: 4 },
    visual: { color: '#9f7aea', glow: true }
  },
  {
    id: 'shield_void',
    name: 'Void Shield',
    description: 'Shield that absorbs attacks into the void',
    slot: 'shield',
    cost: 2500,
    rarity: 'legendary',
    stats: { health: 100, armor: 40, speed: 0, damage: 0, critChance: 0, dodgeChance: 30, regenRate: 1 },
    visual: { color: '#6b46c1', glow: true }
  }
]

export const armorSlots = ['helmet', 'chest', 'legs', 'boots', 'gloves', 'shield'] as const
export const armorRarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const

export const rarityColors = {
  common: '#9ca3af',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#f59e0b'
}

export const rarityGlow = {
  common: false,
  uncommon: false,
  rare: true,
  epic: true,
  legendary: true
}
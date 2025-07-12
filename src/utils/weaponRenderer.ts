// Weapon rendering utilities for drawing realistic weapon models
export interface WeaponRenderConfig {
  name: string
  category: string
  length: number
  width: number
  color: string
  barrelLength?: number
  stockLength?: number
  magazineSize?: number
  hasScope?: boolean
  isMelee?: boolean
  specialFeatures?: string[]
}

// Define weapon rendering configurations
export const weaponRenderConfigs: { [key: string]: WeaponRenderConfig } = {
  // Handguns
  'Glock 19': {
    name: 'Glock 19',
    category: 'Handguns',
    length: 32,
    width: 6,
    color: '#2D3748',
    barrelLength: 18,
    magazineSize: 15
  },
  'Desert Eagle': {
    name: 'Desert Eagle',
    category: 'Handguns',
    length: 36,
    width: 8,
    color: '#1A202C',
    barrelLength: 22,
    magazineSize: 7,
    specialFeatures: ['heavy']
  },
  'M1911': {
    name: 'M1911',
    category: 'Handguns',
    length: 34,
    width: 7,
    color: '#2D3748',
    barrelLength: 20,
    magazineSize: 8
  },
  'Beretta M9': {
    name: 'Beretta M9',
    category: 'Handguns',
    length: 33,
    width: 6,
    color: '#2D3748',
    barrelLength: 19,
    magazineSize: 15
  },
  'FN Five-seveN': {
    name: 'FN Five-seveN',
    category: 'Handguns',
    length: 35,
    width: 6,
    color: '#1A202C',
    barrelLength: 21,
    magazineSize: 20
  },
  'Colt Python': {
    name: 'Colt Python',
    category: 'Handguns',
    length: 38,
    width: 8,
    color: '#2D3748',
    barrelLength: 24,
    specialFeatures: ['revolver']
  },
  'Mateba Autorevolver': {
    name: 'Mateba Autorevolver',
    category: 'Handguns',
    length: 40,
    width: 9,
    color: '#1A202C',
    barrelLength: 26,
    specialFeatures: ['revolver', 'auto']
  },

  // SMGs
  'MP5': {
    name: 'MP5',
    category: 'SMGs',
    length: 45,
    width: 8,
    color: '#1A202C',
    barrelLength: 25,
    stockLength: 15,
    magazineSize: 30
  },
  'Uzi': {
    name: 'Uzi',
    category: 'SMGs',
    length: 38,
    width: 8,
    color: '#2D3748',
    barrelLength: 20,
    stockLength: 12,
    magazineSize: 32
  },
  'P90': {
    name: 'P90',
    category: 'SMGs',
    length: 42,
    width: 10,
    color: '#1A202C',
    barrelLength: 22,
    magazineSize: 50,
    specialFeatures: ['bullpup']
  },
  'Vector KRISS': {
    name: 'Vector KRISS',
    category: 'SMGs',
    length: 40,
    width: 9,
    color: '#2D3748',
    barrelLength: 23,
    stockLength: 14,
    magazineSize: 25,
    specialFeatures: ['advanced']
  },

  // Assault Rifles
  'AK-47': {
    name: 'AK-47',
    category: 'Assault Rifles',
    length: 55,
    width: 10,
    color: '#8B4513',
    barrelLength: 30,
    stockLength: 20,
    magazineSize: 30,
    specialFeatures: ['wooden']
  },
  'M4A1': {
    name: 'M4A1',
    category: 'Assault Rifles',
    length: 52,
    width: 9,
    color: '#2D3748',
    barrelLength: 28,
    stockLength: 18,
    magazineSize: 30,
    specialFeatures: ['tactical']
  },
  'FAMAS': {
    name: 'FAMAS',
    category: 'Assault Rifles',
    length: 48,
    width: 10,
    color: '#2D3748',
    barrelLength: 25,
    magazineSize: 25,
    specialFeatures: ['bullpup']
  },
  'AUG': {
    name: 'AUG',
    category: 'Assault Rifles',
    length: 50,
    width: 10,
    color: '#2D3748',
    barrelLength: 26,
    magazineSize: 30,
    specialFeatures: ['bullpup', 'scope'],
    hasScope: true
  },

  // Shotguns
  'SPAS-12': {
    name: 'SPAS-12',
    category: 'Shotguns',
    length: 48,
    width: 12,
    color: '#1A202C',
    barrelLength: 28,
    stockLength: 16,
    specialFeatures: ['pump']
  },
  'Remington 870': {
    name: 'Remington 870',
    category: 'Shotguns',
    length: 50,
    width: 12,
    color: '#2D3748',
    barrelLength: 30,
    stockLength: 18,
    specialFeatures: ['pump']
  },
  'AA-12': {
    name: 'AA-12',
    category: 'Shotguns',
    length: 45,
    width: 13,
    color: '#1A202C',
    barrelLength: 26,
    stockLength: 15,
    magazineSize: 20,
    specialFeatures: ['auto']
  },
  'Double-barrel': {
    name: 'Double-barrel',
    category: 'Shotguns',
    length: 46,
    width: 12,
    color: '#8B4513',
    barrelLength: 28,
    stockLength: 16,
    specialFeatures: ['double', 'wooden']
  },

  // Sniper Rifles
  'Barrett M82': {
    name: 'Barrett M82',
    category: 'Sniper Rifles',
    length: 70,
    width: 12,
    color: '#1A202C',
    barrelLength: 45,
    stockLength: 20,
    magazineSize: 10,
    hasScope: true,
    specialFeatures: ['anti-material']
  },
  'Dragunov SVD': {
    name: 'Dragunov SVD',
    category: 'Sniper Rifles',
    length: 65,
    width: 10,
    color: '#8B4513',
    barrelLength: 40,
    stockLength: 22,
    magazineSize: 10,
    hasScope: true,
    specialFeatures: ['wooden']
  },
  'AWM': {
    name: 'AWM',
    category: 'Sniper Rifles',
    length: 68,
    width: 11,
    color: '#2D3748',
    barrelLength: 42,
    stockLength: 22,
    magazineSize: 5,
    hasScope: true,
    specialFeatures: ['bolt-action']
  },

  // LMGs
  'M249 SAW': {
    name: 'M249 SAW',
    category: 'LMGs',
    length: 58,
    width: 15,
    color: '#2D3748',
    barrelLength: 35,
    stockLength: 20,
    magazineSize: 100,
    specialFeatures: ['bipod', 'heavy']
  },
  'RPK': {
    name: 'RPK',
    category: 'LMGs',
    length: 60,
    width: 14,
    color: '#8B4513',
    barrelLength: 38,
    stockLength: 20,
    magazineSize: 75,
    specialFeatures: ['bipod', 'wooden']
  },

  // Special/Exotic
  'Railgun': {
    name: 'Railgun',
    category: 'Special/Exotic',
    length: 60,
    width: 14,
    color: '#4A90E2',
    barrelLength: 40,
    stockLength: 18,
    specialFeatures: ['energy', 'glowing']
  },
  'Plasma Blaster': {
    name: 'Plasma Blaster',
    category: 'Special/Exotic',
    length: 45,
    width: 12,
    color: '#E74C3C',
    barrelLength: 28,
    stockLength: 15,
    specialFeatures: ['energy', 'glowing']
  },
  'Laser Carbine': {
    name: 'Laser Carbine',
    category: 'Special/Exotic',
    length: 48,
    width: 10,
    color: '#2ECC71',
    barrelLength: 30,
    stockLength: 16,
    specialFeatures: ['energy', 'glowing']
  },
  'Flamethrower': {
    name: 'Flamethrower',
    category: 'Special/Exotic',
    length: 50,
    width: 16,
    color: '#E67E22',
    barrelLength: 30,
    stockLength: 18,
    specialFeatures: ['tank', 'nozzle']
  },

  // Melee Weapons
  'Katana': {
    name: 'Katana',
    category: 'Traditional Blades',
    length: 50,
    width: 4,
    color: '#C0C0C0',
    isMelee: true,
    specialFeatures: ['curved', 'traditional']
  },
  'Broadsword': {
    name: 'Broadsword',
    category: 'Traditional Blades',
    length: 55,
    width: 6,
    color: '#C0C0C0',
    isMelee: true,
    specialFeatures: ['heavy', 'medieval']
  },
  'Claymore': {
    name: 'Claymore',
    category: 'Traditional Blades',
    length: 65,
    width: 8,
    color: '#C0C0C0',
    isMelee: true,
    specialFeatures: ['two-handed', 'massive']
  },
  'Baseball Bat': {
    name: 'Baseball Bat',
    category: 'Blunt Weapons',
    length: 45,
    width: 5,
    color: '#8B4513',
    isMelee: true,
    specialFeatures: ['wooden', 'blunt']
  },
  'Sledgehammer': {
    name: 'Sledgehammer',
    category: 'Blunt Weapons',
    length: 50,
    width: 12,
    color: '#2D3748',
    isMelee: true,
    specialFeatures: ['heavy', 'crushing']
  },
  'Combat Knife': {
    name: 'Combat Knife',
    category: 'Knives',
    length: 25,
    width: 3,
    color: '#2D3748',
    isMelee: true,
    specialFeatures: ['tactical']
  },
  'Chainsaw': {
    name: 'Chainsaw',
    category: 'Improvised',
    length: 40,
    width: 10,
    color: '#E67E22',
    isMelee: true,
    specialFeatures: ['motorized', 'chain']
  },
  'Energy Sword': {
    name: 'Energy Sword',
    category: 'Fantasy/Sci-fi',
    length: 45,
    width: 4,
    color: '#9B59B6',
    isMelee: true,
    specialFeatures: ['energy', 'glowing']
  },
  'Naginata': {
    name: 'Naginata',
    category: 'Polearms',
    length: 70,
    width: 5,
    color: '#8B4513',
    isMelee: true,
    specialFeatures: ['polearm', 'curved-blade']
  },
  'Spear': {
    name: 'Spear',
    category: 'Polearms',
    length: 80,
    width: 4,
    color: '#8B4513',
    isMelee: true,
    specialFeatures: ['polearm', 'thrusting']
  }
}

// Weapon rendering function
export function drawWeapon(
  ctx: CanvasRenderingContext2D,
  weaponName: string,
  x: number,
  y: number,
  angle: number,
  scale: number = 1
) {
  const config = weaponRenderConfigs[weaponName]
  if (!config) {
    // Draw default weapon if not found
    drawDefaultWeapon(ctx, x, y, angle, scale)
    return
  }

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.scale(scale, scale)

  if (config.isMelee) {
    drawMeleeWeapon(ctx, config)
  } else {
    drawFirearm(ctx, config)
  }

  ctx.restore()
}

function drawFirearm(ctx: CanvasRenderingContext2D, config: WeaponRenderConfig) {
  const { length, width, color, barrelLength, stockLength, magazineSize, hasScope, specialFeatures } = config
  
  // Main body
  ctx.fillStyle = color
  ctx.fillRect(0, -width/2, length, width)
  
  // Barrel
  if (barrelLength) {
    ctx.fillStyle = '#1A1A1A'
    ctx.fillRect(length, -width/4, barrelLength, width/2)
    
    // Barrel tip
    ctx.fillStyle = '#000'
    ctx.fillRect(length + barrelLength - 2, -width/4, 2, width/2)
  }
  
  // Stock
  if (stockLength && !specialFeatures?.includes('bullpup')) {
    ctx.fillStyle = specialFeatures?.includes('wooden') ? '#8B4513' : color
    ctx.fillRect(-stockLength, -width/3, stockLength, width * 0.6)
  }
  
  // Magazine
  if (magazineSize) {
    const magHeight = Math.min(magazineSize / 3, width * 1.5)
    ctx.fillStyle = '#2D3748'
    ctx.fillRect(length * 0.3, width/2, width * 0.6, magHeight)
  }
  
  // Scope
  if (hasScope) {
    ctx.fillStyle = '#1A202C'
    ctx.fillRect(length * 0.2, -width - 8, length * 0.6, 6)
    // Scope lens
    ctx.fillStyle = '#4A90E2'
    ctx.beginPath()
    ctx.arc(length * 0.8, -width - 5, 3, 0, Math.PI * 2)
    ctx.fill()
  }
  
  // Special features
  if (specialFeatures?.includes('bipod')) {
    // Draw bipod legs
    ctx.strokeStyle = '#2D3748'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(length * 0.7, width/2)
    ctx.lineTo(length * 0.7 - 8, width/2 + 12)
    ctx.moveTo(length * 0.7, width/2)
    ctx.lineTo(length * 0.7 + 8, width/2 + 12)
    ctx.stroke()
  }
  
  if (specialFeatures?.includes('revolver')) {
    // Draw cylinder
    ctx.fillStyle = '#2D3748'
    ctx.beginPath()
    ctx.arc(length * 0.3, 0, width * 0.7, 0, Math.PI * 2)
    ctx.fill()
    
    // Cylinder chambers
    ctx.fillStyle = '#1A1A1A'
    for (let i = 0; i < 6; i++) {
      const chamberAngle = (i * Math.PI * 2) / 6
      const chamberX = length * 0.3 + Math.cos(chamberAngle) * (width * 0.4)
      const chamberY = Math.sin(chamberAngle) * (width * 0.4)
      ctx.beginPath()
      ctx.arc(chamberX, chamberY, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  
  if (specialFeatures?.includes('double')) {
    // Draw second barrel
    ctx.fillStyle = '#1A1A1A'
    ctx.fillRect(length, -width/4 + width/6, barrelLength || 20, width/6)
    ctx.fillRect(length, -width/4 - width/6, barrelLength || 20, width/6)
  }
  
  if (specialFeatures?.includes('glowing')) {
    // Add glow effect
    ctx.shadowColor = config.color
    ctx.shadowBlur = 10
    ctx.fillStyle = config.color
    ctx.fillRect(0, -width/2, length, width)
  }
  
  // Trigger guard
  ctx.strokeStyle = '#2D3748'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(length * 0.15, width/2, width/3, 0, Math.PI)
  ctx.stroke()
  
  // Grip texture
  ctx.strokeStyle = '#4A5568'
  ctx.lineWidth = 1
  for (let i = 0; i < 5; i++) {
    const gripY = -width/2 + (i * width/5)
    ctx.beginPath()
    ctx.moveTo(length * 0.05, gripY)
    ctx.lineTo(length * 0.25, gripY)
    ctx.stroke()
  }
}

function drawMeleeWeapon(ctx: CanvasRenderingContext2D, config: WeaponRenderConfig) {
  const { length, width, color, specialFeatures } = config
  
  if (specialFeatures?.includes('polearm')) {
    // Draw shaft
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(0, -width/4, length * 0.8, width/2)
    
    // Draw blade/head
    ctx.fillStyle = color
    if (specialFeatures?.includes('curved-blade')) {
      // Curved blade (naginata)
      ctx.beginPath()
      ctx.moveTo(length * 0.8, 0)
      ctx.quadraticCurveTo(length * 0.9, -width, length, -width/2)
      ctx.lineTo(length, width/2)
      ctx.quadraticCurveTo(length * 0.9, width, length * 0.8, 0)
      ctx.fill()
    } else {
      // Straight spear point
      ctx.beginPath()
      ctx.moveTo(length * 0.8, 0)
      ctx.lineTo(length, -width/2)
      ctx.lineTo(length, width/2)
      ctx.fill()
    }
  } else if (specialFeatures?.includes('curved')) {
    // Curved blade (katana)
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.quadraticCurveTo(length/2, -width/3, length, -width/4)
    ctx.lineTo(length, width/4)
    ctx.quadraticCurveTo(length/2, width/3, 0, 0)
    ctx.fill()
    
    // Handle
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(-length * 0.2, -width/3, length * 0.2, width * 0.6)
    
    // Guard
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(-2, -width/2, 4, width)
  } else if (specialFeatures?.includes('blunt')) {
    // Blunt weapon (bat, hammer)
    ctx.fillStyle = color
    if (specialFeatures?.includes('crushing')) {
      // Hammer head
      ctx.fillRect(length * 0.7, -width, length * 0.3, width * 2)
      // Handle
      ctx.fillStyle = '#8B4513'
      ctx.fillRect(0, -width/4, length * 0.7, width/2)
    } else {
      // Bat shape
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.quadraticCurveTo(length/2, -width/4, length, -width/2)
      ctx.lineTo(length, width/2)
      ctx.quadraticCurveTo(length/2, width/4, 0, 0)
      ctx.fill()
    }
  } else if (specialFeatures?.includes('motorized')) {
    // Chainsaw
    ctx.fillStyle = color
    ctx.fillRect(0, -width/2, length * 0.6, width)
    
    // Chain guide
    ctx.fillStyle = '#2D3748'
    ctx.fillRect(length * 0.6, -width/3, length * 0.4, width * 0.1)
    ctx.fillRect(length * 0.6, width/3 - width * 0.1, length * 0.4, width * 0.1)
    
    // Chain
    ctx.strokeStyle = '#1A1A1A'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(length * 0.6, -width/3)
    ctx.lineTo(length, -width/3)
    ctx.arc(length, 0, width/3, -Math.PI/2, Math.PI/2)
    ctx.lineTo(length * 0.6, width/3)
    ctx.stroke()
  } else if (specialFeatures?.includes('energy')) {
    // Energy weapon
    ctx.fillStyle = '#2D3748'
    ctx.fillRect(0, -width/3, length * 0.3, width * 0.6)
    
    // Energy blade
    ctx.shadowColor = color
    ctx.shadowBlur = 15
    ctx.fillStyle = color
    ctx.fillRect(length * 0.3, -width/4, length * 0.7, width/2)
    
    // Handle details
    ctx.fillStyle = '#4A5568'
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(length * 0.05 + i * length * 0.07, -width/4, length * 0.02, width/2)
    }
  } else {
    // Standard blade
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(length * 0.8, -width/4)
    ctx.lineTo(length, 0)
    ctx.lineTo(length * 0.8, width/4)
    ctx.fill()
    
    // Handle
    ctx.fillStyle = specialFeatures?.includes('tactical') ? '#2D3748' : '#8B4513'
    ctx.fillRect(-length * 0.2, -width/3, length * 0.2, width * 0.6)
    
    // Guard (for swords)
    if (config.category === 'Traditional Blades') {
      ctx.fillStyle = '#FFD700'
      ctx.fillRect(-2, -width/2, 4, width)
    }
  }
}

function drawDefaultWeapon(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, scale: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.scale(scale, scale)
  
  // Draw simple rectangle as fallback
  ctx.fillStyle = '#9CA3AF'
  ctx.fillRect(0, -4, 30, 8)
  
  ctx.restore()
}

// Enemy weapon rendering (simplified)
export function drawEnemyWeapon(
  ctx: CanvasRenderingContext2D,
  weaponName: string,
  x: number,
  y: number,
  angle: number
) {
  const config = weaponRenderConfigs[weaponName]
  if (!config) {
    // Draw default enemy weapon
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.fillStyle = '#6B7280'
    ctx.fillRect(0, -3, 20, 6)
    ctx.restore()
    return
  }
  
  // Draw simplified version for enemies
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  
  const scale = 0.6 // Smaller for enemies
  const length = config.length * scale
  const width = config.width * scale
  
  ctx.fillStyle = config.color
  ctx.fillRect(0, -width/2, length, width)
  
  // Add barrel if firearm
  if (!config.isMelee && config.barrelLength) {
    ctx.fillStyle = '#1A1A1A'
    ctx.fillRect(length, -width/4, config.barrelLength * scale, width/2)
  }
  
  ctx.restore()
}
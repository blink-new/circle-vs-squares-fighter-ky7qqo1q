export interface Weapon {
  id: string
  name: string
  category: string
  damage: number
  fireRate: number
  range: number
  cost: number
  description: string
  ammo?: number
  reloadTime?: number
  isAutomatic?: boolean
  isMelee?: boolean
}

export const weaponCategories = [
  'Handguns',
  'SMGs',
  'Assault Rifles',
  'Shotguns',
  'Sniper Rifles',
  'LMGs',
  'Special/Exotic',
  'Traditional Blades',
  'Blunt Weapons',
  'Knives',
  'Polearms',
  'Improvised',
  'Fantasy/Sci-fi'
]

export const weapons: Weapon[] = [
  // Handguns
  { id: 'glock19', name: 'Glock 19', category: 'Handguns', damage: 25, fireRate: 300, range: 150, cost: 500, description: 'Reliable 9mm pistol with high capacity', ammo: 15, reloadTime: 2000 },
  { id: 'deserteagle', name: 'Desert Eagle', category: 'Handguns', damage: 50, fireRate: 150, range: 180, cost: 800, description: 'Powerful .50 caliber hand cannon', ammo: 7, reloadTime: 2500 },
  { id: 'm1911', name: 'M1911', category: 'Handguns', damage: 35, fireRate: 250, range: 160, cost: 600, description: 'Classic .45 ACP with stopping power', ammo: 8, reloadTime: 2200 },
  { id: 'beretta', name: 'Beretta M9', category: 'Handguns', damage: 28, fireRate: 280, range: 155, cost: 550, description: 'Military standard sidearm', ammo: 15, reloadTime: 2000 },
  { id: 'fiveseven', name: 'FN Five-seveN', category: 'Handguns', damage: 30, fireRate: 320, range: 170, cost: 750, description: 'High-velocity armor-piercing rounds', ammo: 20, reloadTime: 1800 },
  { id: 'python', name: 'Colt Python', category: 'Handguns', damage: 60, fireRate: 120, range: 200, cost: 900, description: 'Precision revolver with devastating power', ammo: 6, reloadTime: 3000 },
  { id: 'mateba', name: 'Mateba Autorevolver', category: 'Handguns', damage: 55, fireRate: 140, range: 190, cost: 950, description: 'Unique semi-automatic revolver', ammo: 6, reloadTime: 2800 },
  { id: 'cz75', name: 'CZ-75 Shadow', category: 'Handguns', damage: 32, fireRate: 300, range: 165, cost: 700, description: 'Competition-grade accuracy', ammo: 16, reloadTime: 1900 },
  { id: 'usp', name: 'H&K USP', category: 'Handguns', damage: 33, fireRate: 280, range: 160, cost: 650, description: 'Tactical pistol with superior reliability', ammo: 12, reloadTime: 2100 },
  { id: 'p226', name: 'SIG Sauer P226', category: 'Handguns', damage: 30, fireRate: 290, range: 165, cost: 680, description: 'Professional grade service pistol', ammo: 15, reloadTime: 2000 },

  // SMGs
  { id: 'mp5', name: 'MP5', category: 'SMGs', damage: 20, fireRate: 600, range: 120, cost: 1200, description: 'Iconic submachine gun with excellent control', ammo: 30, reloadTime: 2500, isAutomatic: true },
  { id: 'uzi', name: 'Uzi', category: 'SMGs', damage: 18, fireRate: 650, range: 100, cost: 1000, description: 'Compact and reliable close-quarters weapon', ammo: 32, reloadTime: 2200, isAutomatic: true },
  { id: 'p90', name: 'P90', category: 'SMGs', damage: 22, fireRate: 700, range: 130, cost: 1500, description: 'Unique bullpup design with high-capacity mag', ammo: 50, reloadTime: 3000, isAutomatic: true },
  { id: 'mac10', name: 'MAC-10', category: 'SMGs', damage: 16, fireRate: 800, range: 80, cost: 800, description: 'Extremely high rate of fire', ammo: 32, reloadTime: 2000, isAutomatic: true },
  { id: 'vector', name: 'Vector KRISS', category: 'SMGs', damage: 24, fireRate: 750, range: 140, cost: 1800, description: 'Advanced recoil mitigation system', ammo: 25, reloadTime: 2300, isAutomatic: true },
  { id: 'scorpion', name: 'Scorpion EVO 3', category: 'SMGs', damage: 21, fireRate: 680, range: 125, cost: 1300, description: 'Modern Czech submachine gun', ammo: 30, reloadTime: 2400, isAutomatic: true },
  { id: 'bizon', name: 'PP-19 Bizon', category: 'SMGs', damage: 19, fireRate: 620, range: 110, cost: 1100, description: 'Helical magazine provides sustained fire', ammo: 64, reloadTime: 3500, isAutomatic: true },
  { id: 'mp7', name: 'MP7', category: 'SMGs', damage: 23, fireRate: 720, range: 135, cost: 1600, description: 'Compact PDW with armor-piercing capability', ammo: 40, reloadTime: 2600, isAutomatic: true },

  // Assault Rifles
  { id: 'ak47', name: 'AK-47', category: 'Assault Rifles', damage: 45, fireRate: 400, range: 200, cost: 2500, description: 'Legendary reliability and stopping power', ammo: 30, reloadTime: 3000, isAutomatic: true },
  { id: 'm4a1', name: 'M4A1', category: 'Assault Rifles', damage: 40, fireRate: 450, range: 220, cost: 2800, description: 'Versatile platform with excellent accuracy', ammo: 30, reloadTime: 2800, isAutomatic: true },
  { id: 'famas', name: 'FAMAS', category: 'Assault Rifles', damage: 38, fireRate: 500, range: 200, cost: 2600, description: 'French bullpup with unique design', ammo: 25, reloadTime: 2700, isAutomatic: true },
  { id: 'aug', name: 'AUG', category: 'Assault Rifles', damage: 42, fireRate: 420, range: 210, cost: 2700, description: 'Austrian bullpup with integrated optics', ammo: 30, reloadTime: 2900, isAutomatic: true },
  { id: 'scarl', name: 'SCAR-L', category: 'Assault Rifles', damage: 43, fireRate: 400, range: 230, cost: 3000, description: 'Modular combat rifle system', ammo: 30, reloadTime: 2800, isAutomatic: true },
  { id: 'f2000', name: 'FN F2000', category: 'Assault Rifles', damage: 41, fireRate: 430, range: 205, cost: 2900, description: 'Futuristic bullpup design', ammo: 30, reloadTime: 2900, isAutomatic: true },
  { id: 'g36c', name: 'G36C', category: 'Assault Rifles', damage: 39, fireRate: 460, range: 215, cost: 2750, description: 'Compact carbine variant', ammo: 30, reloadTime: 2700, isAutomatic: true },
  { id: 'an94', name: 'AN-94', category: 'Assault Rifles', damage: 48, fireRate: 380, range: 240, cost: 3200, description: 'Advanced Russian rifle with hyperburst', ammo: 30, reloadTime: 3200, isAutomatic: true },
  { id: 'qbz95', name: 'QBZ-95', category: 'Assault Rifles', damage: 37, fireRate: 470, range: 195, cost: 2400, description: 'Chinese bullpup service rifle', ammo: 30, reloadTime: 2800, isAutomatic: true },

  // Shotguns
  { id: 'spas12', name: 'SPAS-12', category: 'Shotguns', damage: 80, fireRate: 120, range: 80, cost: 2000, description: 'Dual-action combat shotgun', ammo: 8, reloadTime: 4000 },
  { id: 'remington870', name: 'Remington 870', category: 'Shotguns', damage: 85, fireRate: 100, range: 75, cost: 1800, description: 'Pump-action reliability', ammo: 6, reloadTime: 3500 },
  { id: 'mossberg500', name: 'Mossberg 500', category: 'Shotguns', damage: 82, fireRate: 110, range: 78, cost: 1900, description: 'Versatile pump-action design', ammo: 6, reloadTime: 3600 },
  { id: 'aa12', name: 'AA-12', category: 'Shotguns', damage: 70, fireRate: 300, range: 90, cost: 4000, description: 'Fully automatic shotgun devastation', ammo: 20, reloadTime: 4500, isAutomatic: true },
  { id: 'saiga12', name: 'Saiga-12', category: 'Shotguns', damage: 75, fireRate: 200, range: 85, cost: 3000, description: 'Semi-automatic AK-based shotgun', ammo: 10, reloadTime: 3000 },
  { id: 'doublebarrel', name: 'Double-barrel', category: 'Shotguns', damage: 120, fireRate: 80, range: 70, cost: 1500, description: 'Classic side-by-side devastation', ammo: 2, reloadTime: 3000 },
  { id: 'winchester1887', name: 'Winchester 1887', category: 'Shotguns', damage: 90, fireRate: 90, range: 85, cost: 2200, description: 'Lever-action shotgun with style', ammo: 5, reloadTime: 3800 },

  // Sniper Rifles
  { id: 'barrett', name: 'Barrett M82', category: 'Sniper Rifles', damage: 200, fireRate: 60, range: 400, cost: 8000, description: 'Anti-materiel rifle with devastating power', ammo: 10, reloadTime: 5000 },
  { id: 'dragunov', name: 'Dragunov SVD', category: 'Sniper Rifles', damage: 150, fireRate: 80, range: 350, cost: 6000, description: 'Soviet designated marksman rifle', ammo: 10, reloadTime: 4000 },
  { id: 'm24', name: 'M24', category: 'Sniper Rifles', damage: 180, fireRate: 50, range: 380, cost: 7000, description: 'Military precision rifle system', ammo: 5, reloadTime: 4500 },
  { id: 'awm', name: 'AWM', category: 'Sniper Rifles', damage: 220, fireRate: 45, range: 420, cost: 9000, description: 'Arctic warfare magnum rifle', ammo: 5, reloadTime: 5500 },
  { id: 'kar98k', name: 'Kar98k', category: 'Sniper Rifles', damage: 160, fireRate: 70, range: 300, cost: 5000, description: 'WWII bolt-action precision', ammo: 5, reloadTime: 4000 },
  { id: 'cheytac', name: 'CheyTac M200', category: 'Sniper Rifles', damage: 250, fireRate: 40, range: 450, cost: 12000, description: 'Extreme long-range precision', ammo: 7, reloadTime: 6000 },
  { id: 'mk14', name: 'MK14 EBR', category: 'Sniper Rifles', damage: 140, fireRate: 100, range: 320, cost: 5500, description: 'Enhanced battle rifle', ammo: 20, reloadTime: 3500 },
  { id: 'mosin', name: 'Mosin-Nagant', category: 'Sniper Rifles', damage: 170, fireRate: 60, range: 310, cost: 4500, description: 'Classic Russian rifle', ammo: 5, reloadTime: 4200 },

  // LMGs
  { id: 'm249', name: 'M249 SAW', category: 'LMGs', damage: 50, fireRate: 500, range: 250, cost: 5000, description: 'Squad automatic weapon', ammo: 100, reloadTime: 6000, isAutomatic: true },
  { id: 'rpk', name: 'RPK', category: 'LMGs', damage: 55, fireRate: 450, range: 280, cost: 5500, description: 'Light machine gun based on AK platform', ammo: 75, reloadTime: 5500, isAutomatic: true },
  { id: 'pkm', name: 'PKM', category: 'LMGs', damage: 60, fireRate: 400, range: 300, cost: 6000, description: 'General purpose machine gun', ammo: 100, reloadTime: 7000, isAutomatic: true },
  { id: 'mg42', name: 'MG42', category: 'LMGs', damage: 65, fireRate: 800, range: 250, cost: 6500, description: 'WWII buzzsaw with incredible rate of fire', ammo: 50, reloadTime: 5000, isAutomatic: true },
  { id: 'minimi', name: 'FN Minimi', category: 'LMGs', damage: 52, fireRate: 520, range: 260, cost: 5200, description: 'Versatile light machine gun', ammo: 100, reloadTime: 6200, isAutomatic: true },
  { id: 'hk21e', name: 'HK21E', category: 'LMGs', damage: 58, fireRate: 480, range: 290, cost: 5800, description: 'German engineering excellence', ammo: 80, reloadTime: 5800, isAutomatic: true },

  // Special/Exotic
  { id: 'railgun', name: 'Railgun', category: 'Special/Exotic', damage: 300, fireRate: 30, range: 500, cost: 15000, description: 'Electromagnetic projectile weapon', ammo: 5, reloadTime: 8000 },
  { id: 'gauss', name: 'Gauss Rifle', category: 'Special/Exotic', damage: 250, fireRate: 50, range: 450, cost: 12000, description: 'Magnetic acceleration system', ammo: 10, reloadTime: 6000 },
  { id: 'plasma', name: 'Plasma Blaster', category: 'Special/Exotic', damage: 120, fireRate: 150, range: 200, cost: 8000, description: 'Superheated plasma projectiles', ammo: 20, reloadTime: 4000 },
  { id: 'laser', name: 'Laser Carbine', category: 'Special/Exotic', damage: 80, fireRate: 400, range: 300, cost: 7000, description: 'Focused light beam weapon', ammo: 100, reloadTime: 3000, isAutomatic: true },
  { id: 'arc', name: 'Arc Cannon', category: 'Special/Exotic', damage: 200, fireRate: 100, range: 180, cost: 10000, description: 'Electrical discharge weapon', ammo: 15, reloadTime: 5000 },
  { id: 'flamethrower', name: 'Flamethrower', category: 'Special/Exotic', damage: 40, fireRate: 800, range: 100, cost: 6000, description: 'Continuous flame projection', ammo: 200, reloadTime: 4000, isAutomatic: true },
  { id: 'tesla', name: 'Tesla Rifle', category: 'Special/Exotic', damage: 150, fireRate: 200, range: 250, cost: 9000, description: 'Electrical arc weapon', ammo: 30, reloadTime: 4500 },
  { id: 'cryo', name: 'Cryo Gun', category: 'Special/Exotic', damage: 60, fireRate: 300, range: 150, cost: 7500, description: 'Freezes and slows enemies', ammo: 40, reloadTime: 3500, isAutomatic: true },
  { id: 'smartgun', name: 'Smart Gun', category: 'Special/Exotic', damage: 100, fireRate: 350, range: 300, cost: 11000, description: 'Auto-targeting system', ammo: 50, reloadTime: 4000, isAutomatic: true },
  { id: 'gravity', name: 'Gravity Pulse Blaster', category: 'Special/Exotic', damage: 180, fireRate: 120, range: 200, cost: 13000, description: 'Manipulates gravitational forces', ammo: 25, reloadTime: 5500 },

  // Traditional Blades
  { id: 'katana', name: 'Katana', category: 'Traditional Blades', damage: 80, fireRate: 180, range: 50, cost: 0, description: 'Legendary Japanese sword - Starting weapon', isMelee: true },
  { id: 'wakizashi', name: 'Wakizashi', category: 'Traditional Blades', damage: 60, fireRate: 220, range: 45, cost: 800, description: 'Shorter companion sword', isMelee: true },
  { id: 'tanto', name: 'Tanto', category: 'Traditional Blades', damage: 50, fireRate: 280, range: 40, cost: 600, description: 'Japanese short blade', isMelee: true },
  { id: 'broadsword', name: 'Broadsword', category: 'Traditional Blades', damage: 100, fireRate: 140, range: 55, cost: 1200, description: 'Heavy medieval blade', isMelee: true },
  { id: 'claymore', name: 'Claymore', category: 'Traditional Blades', damage: 150, fireRate: 100, range: 70, cost: 2000, description: 'Massive two-handed sword', isMelee: true },
  { id: 'scimitar', name: 'Scimitar', category: 'Traditional Blades', damage: 70, fireRate: 200, range: 50, cost: 1000, description: 'Curved blade with swift strikes', isMelee: true },
  { id: 'rapier', name: 'Rapier', category: 'Traditional Blades', damage: 65, fireRate: 250, range: 55, cost: 1100, description: 'Thrusting sword with precision', isMelee: true },
  { id: 'cutlass', name: 'Cutlass', category: 'Traditional Blades', damage: 75, fireRate: 190, range: 48, cost: 900, description: 'Pirate saber for close combat', isMelee: true },
  { id: 'falchion', name: 'Falchion', category: 'Traditional Blades', damage: 85, fireRate: 160, range: 52, cost: 1300, description: 'Single-edged sword', isMelee: true },
  { id: 'jian', name: 'Jian', category: 'Traditional Blades', damage: 78, fireRate: 200, range: 53, cost: 1150, description: 'Chinese straight sword', isMelee: true },

  // Blunt Weapons
  { id: 'bat', name: 'Baseball Bat', category: 'Blunt Weapons', damage: 60, fireRate: 150, range: 45, cost: 400, description: 'Classic blunt instrument', isMelee: true },
  { id: 'nailbat', name: 'Nail Bat', category: 'Blunt Weapons', damage: 90, fireRate: 140, range: 45, cost: 800, description: 'Bat with nails for extra damage', isMelee: true },
  { id: 'sledgehammer', name: 'Sledgehammer', category: 'Blunt Weapons', damage: 120, fireRate: 80, range: 50, cost: 1000, description: 'Devastating crushing power', isMelee: true },
  { id: 'mace', name: 'Mace', category: 'Blunt Weapons', damage: 95, fireRate: 120, range: 48, cost: 1200, description: 'Medieval crushing weapon', isMelee: true },
  { id: 'morningstar', name: 'Morning Star', category: 'Blunt Weapons', damage: 110, fireRate: 100, range: 50, cost: 1500, description: 'Spiked mace for maximum damage', isMelee: true },
  { id: 'warhammer', name: 'Warhammer', category: 'Blunt Weapons', damage: 130, fireRate: 90, range: 55, cost: 1800, description: 'Heavy two-handed crusher', isMelee: true },
  { id: 'club', name: 'Club', category: 'Blunt Weapons', damage: 40, fireRate: 180, range: 40, cost: 200, description: 'Simple but effective', isMelee: true },
  { id: 'crowbar', name: 'Crowbar', category: 'Blunt Weapons', damage: 55, fireRate: 160, range: 42, cost: 350, description: 'Versatile tool turned weapon', isMelee: true },

  // Knives
  { id: 'combatknife', name: 'Combat Knife', category: 'Knives', damage: 45, fireRate: 300, range: 35, cost: 300, description: 'Military tactical blade', isMelee: true },
  { id: 'karambit', name: 'Karambit', category: 'Knives', damage: 50, fireRate: 350, range: 30, cost: 500, description: 'Curved claw-like blade', isMelee: true },
  { id: 'kukri', name: 'Kukri', category: 'Knives', damage: 60, fireRate: 250, range: 38, cost: 600, description: 'Nepalese curved blade', isMelee: true },
  { id: 'bowie', name: 'Bowie Knife', category: 'Knives', damage: 55, fireRate: 280, range: 40, cost: 450, description: 'Large fixed-blade knife', isMelee: true },
  { id: 'pushdagger', name: 'Push Dagger', category: 'Knives', damage: 40, fireRate: 400, range: 25, cost: 350, description: 'Compact punching blade', isMelee: true },
  { id: 'trenchknife', name: 'Trench Knife', category: 'Knives', damage: 65, fireRate: 220, range: 35, cost: 700, description: 'WWI combat blade with knuckles', isMelee: true },
  { id: 'butterfly', name: 'Butterfly Knife', category: 'Knives', damage: 42, fireRate: 380, range: 32, cost: 400, description: 'Folding blade with style', isMelee: true },
  { id: 'switchblade', name: 'Switchblade', category: 'Knives', damage: 38, fireRate: 420, range: 30, cost: 250, description: 'Spring-loaded quick blade', isMelee: true },

  // Polearms
  { id: 'naginata', name: 'Naginata', category: 'Polearms', damage: 90, fireRate: 140, range: 80, cost: 1500, description: 'Japanese polearm with curved blade', isMelee: true },
  { id: 'halberd', name: 'Halberd', category: 'Polearms', damage: 110, fireRate: 120, range: 85, cost: 1800, description: 'Axe-spear combination weapon', isMelee: true },
  { id: 'glaive', name: 'Glaive', category: 'Polearms', damage: 95, fireRate: 130, range: 75, cost: 1600, description: 'Polearm with single-edged blade', isMelee: true },
  { id: 'spear', name: 'Spear', category: 'Polearms', damage: 70, fireRate: 180, range: 90, cost: 800, description: 'Classic thrusting weapon', isMelee: true },
  { id: 'bostaff', name: 'Bo Staff', category: 'Polearms', damage: 50, fireRate: 220, range: 70, cost: 600, description: 'Martial arts staff weapon', isMelee: true },
  { id: 'pike', name: 'Pike', category: 'Polearms', damage: 80, fireRate: 160, range: 100, cost: 1200, description: 'Extra-long thrusting spear', isMelee: true },
  { id: 'trident', name: 'Trident', category: 'Polearms', damage: 85, fireRate: 150, range: 75, cost: 1400, description: 'Three-pronged spear', isMelee: true },

  // Improvised
  { id: 'wrench', name: 'Wrench', category: 'Improvised', damage: 45, fireRate: 170, range: 38, cost: 200, description: 'Heavy tool repurposed for combat', isMelee: true },
  { id: 'fryingpan', name: 'Frying Pan', category: 'Improvised', damage: 50, fireRate: 150, range: 40, cost: 150, description: 'Kitchen implement of destruction', isMelee: true },
  { id: 'pipe', name: 'Pipe', category: 'Improvised', damage: 40, fireRate: 200, range: 45, cost: 100, description: 'Metal pipe for bludgeoning', isMelee: true },
  { id: 'chainsaw', name: 'Chainsaw', category: 'Improvised', damage: 150, fireRate: 400, range: 40, cost: 3000, description: 'Motorized cutting carnage', isMelee: true, isAutomatic: true },
  { id: 'hatchet', name: 'Hatchet', category: 'Improvised', damage: 70, fireRate: 160, range: 42, cost: 400, description: 'Small axe for chopping', isMelee: true },
  { id: 'cleaver', name: 'Meat Cleaver', category: 'Improvised', damage: 65, fireRate: 180, range: 35, cost: 300, description: 'Heavy kitchen blade', isMelee: true },
  { id: 'tireiron', name: 'Tire Iron', category: 'Improvised', damage: 55, fireRate: 140, range: 45, cost: 250, description: 'Car tool turned weapon', isMelee: true },
  { id: 'bottle', name: 'Broken Bottle', category: 'Improvised', damage: 35, fireRate: 350, range: 25, cost: 50, description: 'Shattered glass weapon', isMelee: true },

  // Fantasy/Sci-fi
  { id: 'energysword', name: 'Energy Sword', category: 'Fantasy/Sci-fi', damage: 120, fireRate: 200, range: 50, cost: 4000, description: 'Plasma-contained blade', isMelee: true },
  { id: 'plasmablade', name: 'Plasma Blade', category: 'Fantasy/Sci-fi', damage: 140, fireRate: 180, range: 55, cost: 5000, description: 'Superheated cutting edge', isMelee: true },
  { id: 'chainblade', name: 'Chainblade', category: 'Fantasy/Sci-fi', damage: 160, fireRate: 300, range: 60, cost: 6000, description: 'Motorized chain sword', isMelee: true, isAutomatic: true },
  { id: 'vibroknife', name: 'Vibro-Knife', category: 'Fantasy/Sci-fi', damage: 80, fireRate: 400, range: 35, cost: 2000, description: 'High-frequency vibrating blade', isMelee: true },
  { id: 'gravityhammer', name: 'Gravity Hammer', category: 'Fantasy/Sci-fi', damage: 200, fireRate: 80, range: 65, cost: 8000, description: 'Gravity-manipulating weapon', isMelee: true },
  { id: 'lightaxe', name: 'Light Axe', category: 'Fantasy/Sci-fi', damage: 130, fireRate: 150, range: 58, cost: 4500, description: 'Energy-based axe weapon', isMelee: true },
  { id: 'electrowhip', name: 'Electro-Whip', category: 'Fantasy/Sci-fi', damage: 90, fireRate: 250, range: 100, cost: 3500, description: 'Electrical lash weapon', isMelee: true }
]

export const allies = [
  { id: 'soldier', name: 'Soldier', cost: 1000, description: 'Basic infantry unit with assault rifle', health: 100, damage: 30 },
  { id: 'medic', name: 'Medic', cost: 1500, description: 'Heals player and other allies', health: 80, damage: 20 },
  { id: 'heavy', name: 'Heavy Gunner', cost: 2000, description: 'Tank unit with machine gun', health: 200, damage: 50 },
  { id: 'sniper', name: 'Sniper', cost: 2500, description: 'Long-range precision support', health: 60, damage: 100 },
  { id: 'engineer', name: 'Engineer', cost: 1800, description: 'Deploys turrets and repairs equipment', health: 90, damage: 25 },
  
  // Special Madness Combat allies
  { id: 'hank', name: 'Hank J. Wimbleton', cost: 5000, description: 'Legendary protagonist with dual weapons', health: 300, damage: 80, special: true },
  { id: 'sanford', name: 'Sanford', cost: 4000, description: 'Melee specialist with hook and gun', health: 250, damage: 70, special: true },
  { id: 'deimos', name: 'Deimos', cost: 4500, description: 'Explosives expert with chainsaws', health: 220, damage: 90, special: true },
  { id: 'tricky', name: 'Tricky the Clown', cost: 8000, description: 'Chaotic ally with unpredictable attacks', health: 400, damage: 120, special: true },
  { id: 'jebus', name: 'Jebus', cost: 7000, description: 'Powerful ally with energy weapons', health: 350, damage: 100, special: true },
  { id: 'auditor', name: 'The Auditor', cost: 10000, description: 'Ultimate ally with reality-warping powers', health: 500, damage: 150, special: true }
]
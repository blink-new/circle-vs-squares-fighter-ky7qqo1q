import { armorPieces } from '../data/armor'

export interface ArmorBonuses {
  health: number
  armor: number
  speed: number
  damage: number
  critChance: number
  dodgeChance: number
  regenRate: number
}

export function calculateArmorBonuses(equippedArmor: {
  helmet: string | null
  chest: string | null
  legs: string | null
  boots: string | null
  gloves: string | null
  shield: string | null
}): ArmorBonuses {
  const bonuses: ArmorBonuses = {
    health: 0,
    armor: 0,
    speed: 0,
    damage: 0,
    critChance: 0,
    dodgeChance: 0,
    regenRate: 0
  }

  Object.values(equippedArmor).forEach(armorId => {
    if (armorId) {
      const armorPiece = armorPieces.find(piece => piece.id === armorId)
      if (armorPiece) {
        bonuses.health += armorPiece.stats.health
        bonuses.armor += armorPiece.stats.armor
        bonuses.speed += armorPiece.stats.speed
        bonuses.damage += armorPiece.stats.damage
        bonuses.critChance += armorPiece.stats.critChance
        bonuses.dodgeChance += armorPiece.stats.dodgeChance
        bonuses.regenRate += armorPiece.stats.regenRate
      }
    }
  })

  return bonuses
}
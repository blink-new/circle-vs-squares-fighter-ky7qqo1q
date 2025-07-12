import { useEffect, useState } from 'react'

export interface ModState {
  activePowers: string[]
  healthMultiplier: number
  damageMultiplier: number
  speedMultiplier: number
}

export function useModSystem() {
  const [modState, setModState] = useState<ModState>({
    activePowers: [],
    healthMultiplier: 1,
    damageMultiplier: 1,
    speedMultiplier: 1
  })

  // Load mod state from localStorage
  useEffect(() => {
    const savedMods = localStorage.getItem('madness_mods')
    if (savedMods) {
      try {
        const mods = JSON.parse(savedMods)
        setModState({
          activePowers: mods.activePowers || [],
          healthMultiplier: mods.healthMultiplier || 1,
          damageMultiplier: mods.damageMultiplier || 1,
          speedMultiplier: mods.speedMultiplier || 1
        })
      } catch (error) {
        console.error('Error loading mod state:', error)
      }
    }
  }, [])

  // Save mod state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('madness_mods', JSON.stringify(modState))
  }, [modState])

  const updateModState = (updates: Partial<ModState>) => {
    setModState(prev => ({ ...prev, ...updates }))
  }

  const hasPower = (powerId: string) => modState.activePowers.includes(powerId)

  const applyDamageModifier = (baseDamage: number) => {
    let damage = baseDamage * modState.damageMultiplier
    if (hasPower('one_shot_kill')) {
      damage = 999999
    }
    return damage
  }

  const applyHealthModifier = (baseHealth: number) => {
    return baseHealth * modState.healthMultiplier
  }

  const applySpeedModifier = (baseSpeed: number) => {
    let speed = baseSpeed * modState.speedMultiplier
    if (hasPower('super_speed')) {
      speed *= 5
    }
    return speed
  }

  const shouldTakeDamage = (baseDamage: number) => {
    if (hasPower('invincibility')) {
      return 0
    }
    return baseDamage
  }

  const shouldPreventDurabilityLoss = () => {
    return hasPower('infinite_ammo')
  }

  const shouldPassThroughEnemies = () => {
    return hasPower('ghost_mode')
  }

  const shouldFreezeEnemies = () => {
    return hasPower('freeze_time')
  }

  const shouldHealOnDamage = () => {
    return hasPower('vampire_mode')
  }

  const shouldHaveLightningAura = () => {
    return hasPower('lightning_aura')
  }

  const shouldHaveExplosiveRounds = () => {
    return hasPower('explosive_rounds')
  }

  const shouldHaveRocketLauncher = () => {
    return hasPower('rocket_launcher')
  }

  return {
    modState,
    updateModState,
    hasPower,
    applyDamageModifier,
    applyHealthModifier,
    applySpeedModifier,
    shouldTakeDamage,
    shouldPreventDurabilityLoss,
    shouldPassThroughEnemies,
    shouldFreezeEnemies,
    shouldHealOnDamage,
    shouldHaveLightningAura,
    shouldHaveExplosiveRounds,
    shouldHaveRocketLauncher
  }
}
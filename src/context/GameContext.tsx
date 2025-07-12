import { createContext, useContext, useState, useCallback } from 'react'

interface Player {
  x: number
  y: number
  health: number
  maxHealth: number
  coins: number
  weapons: { name: string, durability: number }[] // max 2
  currentWeapon: string
  secondaryWeapon: string | null
  allies: string[]
  isBlocking: boolean
  // TAC-bar upgrades
  tac: number // tac-bar level
  dex: number // dexterity level
  str: number // strength level
  awr: number // awareness level
  end: number // endurance level
  // Cosmetics
  cosmetics: {
    skin: string
    trail: string
    weapon_skin: string
    emote: string
  }
  // Armor equipment
  armor: {
    helmet: string | null
    chest: string | null
    legs: string | null
    boots: string | null
    gloves: string | null
    shield: string | null
  }
  // Owned armor pieces
  ownedArmor: string[]
}

interface GameState {
  wave: number
  score: number
  isPlaying: boolean
  isPaused: boolean
  enemies: Enemy[]
  bullets: Bullet[]
  playerBullets: Bullet[]
  player: Player
}

interface Enemy {
  id: string
  x: number
  y: number
  health: number
  maxHealth: number
  type: 'basic' | 'shooter' | 'heavy'
  speed: number
  damage: number
  lastShot: number
}

interface Bullet {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  damage: number
  isPlayerBullet: boolean
}

interface GameContextType {
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
  updatePlayer: (updates: Partial<Player>) => void
  addEnemy: (enemy: Enemy) => void
  removeEnemy: (id: string) => void
  addBullet: (bullet: Bullet) => void
  removeBullet: (id: string) => void
  resetGame: () => void
  buyWeapon: (weapon: string, cost: number) => boolean
  buyAlly: (ally: string, cost: number) => boolean
  buyTacUpgrade: (upgrade: string, cost: number) => boolean
  buyArmor: (armor: string, cost: number) => boolean
  equipArmor: (armorId: string, slot: string) => boolean
}

const GameContext = createContext<GameContextType | undefined>(undefined)

const initialPlayer: Player = {
  x: 400,
  y: 300,
  health: 300,
  maxHealth: 300,
  coins: 500,
  weapons: [{ name: 'Katana', durability: 100 }],
  currentWeapon: 'Katana',
  secondaryWeapon: null,
  allies: [],
  isBlocking: false,
  tac: 1,
  dex: 1,
  str: 1,
  awr: 1,
  end: 1,
  cosmetics: {
    skin: 'default',
    trail: 'default',
    weapon_skin: 'default',
    emote: 'default'
  },
  armor: {
    helmet: null,
    chest: null,
    legs: null,
    boots: null,
    gloves: null,
    shield: null
  },
  ownedArmor: []
}

const initialGameState: GameState = {
  wave: 1,
  score: 0,
  isPlaying: false,
  isPaused: false,
  enemies: [],
  bullets: [],
  playerBullets: [],
  player: initialPlayer
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }))
  }, [])

  const updatePlayer = useCallback((updates: Partial<Player>) => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, ...updates }
    }))
  }, [])

  const addEnemy = useCallback((enemy: Enemy) => {
    setGameState(prev => ({
      ...prev,
      enemies: [...prev.enemies, enemy]
    }))
  }, [])

  const removeEnemy = useCallback((id: string) => {
    setGameState(prev => ({
      ...prev,
      enemies: prev.enemies.filter(enemy => enemy.id !== id)
    }))
  }, [])

  const addBullet = useCallback((bullet: Bullet) => {
    setGameState(prev => ({
      ...prev,
      bullets: [...prev.bullets, bullet]
    }))
  }, [])

  const removeBullet = useCallback((id: string) => {
    setGameState(prev => ({
      ...prev,
      bullets: prev.bullets.filter(bullet => bullet.id !== id)
    }))
  }, [])

  const resetGame = useCallback(() => {
    setGameState(initialGameState)
  }, [])

  const buyWeapon = useCallback((weapon: string, cost: number) => {
    if (gameState.player.coins >= cost) {
      // If already owned, don't add again
      if (gameState.player.weapons.some(w => w.name === weapon)) return false;
      const newWeapons = [...gameState.player.weapons]
      if (newWeapons.length < 2) {
        newWeapons.push({ name: weapon, durability: 100 })
      } else {
        // Replace secondary slot
        newWeapons[1] = { name: weapon, durability: 100 }
      }
      const currentWeapon = newWeapons[0].name
      const secondaryWeapon = newWeapons[1] ? newWeapons[1].name : null
      updatePlayer({
        coins: gameState.player.coins - cost,
        weapons: newWeapons,
        currentWeapon,
        secondaryWeapon
      })
      return true
    }
    return false
  }, [gameState.player.coins, gameState.player.weapons, updatePlayer])

  const buyAlly = useCallback((ally: string, cost: number) => {
    if (gameState.player.coins >= cost) {
      updatePlayer({
        coins: gameState.player.coins - cost,
        allies: [...gameState.player.allies, ally]
      })
      return true
    }
    return false
  }, [gameState.player.coins, gameState.player.allies, updatePlayer])

  const buyTacUpgrade = useCallback((upgrade: string, cost: number) => {
    if (gameState.player.coins >= cost) {
      const currentLevel = gameState.player[upgrade as keyof Player] as number
      updatePlayer({
        coins: gameState.player.coins - cost,
        [upgrade]: currentLevel + 1
      })
      return true
    }
    return false
  }, [gameState.player, updatePlayer])

  const buyArmor = useCallback((armor: string, cost: number) => {
    if (gameState.player.coins >= cost && !gameState.player.ownedArmor.includes(armor)) {
      updatePlayer({
        coins: gameState.player.coins - cost,
        ownedArmor: [...gameState.player.ownedArmor, armor]
      })
      return true
    }
    return false
  }, [gameState.player.coins, gameState.player.ownedArmor, updatePlayer])

  const equipArmor = useCallback((armorId: string, slot: string) => {
    if (gameState.player.ownedArmor.includes(armorId)) {
      updatePlayer({
        armor: { ...gameState.player.armor, [slot]: armorId }
      })
      return true
    }
    return false
  }, [gameState.player.ownedArmor, gameState.player.armor, updatePlayer])

  return (
    <GameContext.Provider value={{
      gameState,
      updateGameState,
      updatePlayer,
      addEnemy,
      removeEnemy,
      addBullet,
      removeBullet,
      resetGame,
      buyWeapon,
      buyAlly,
      buyTacUpgrade,
      buyArmor,
      equipArmor
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
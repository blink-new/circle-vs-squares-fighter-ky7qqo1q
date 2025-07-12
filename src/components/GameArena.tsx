import React, { useEffect, useRef, useState } from 'react'
import { useGame } from '../context/GameContext'
import { drawWeapon, drawEnemyWeapon } from '../utils/weaponRenderer'

interface GameArenaProps {
  onGameOver: () => void
  onOpenShop: () => void
}

interface Enemy {
  id: string
  x: number
  y: number
  health: number
  maxHealth: number
  type: 'grunt' | 'engineer' | 'ahhw' | 'agent' | 'l337' | 'boss' | 'mega_boss'
  speed: number
  damage: number
  lastShot: number
  weapon: string | null
  size: number
  color: string
  shootingInterval: number
  armor?: number
}

interface Recruit {
  id: string
  x: number
  y: number
  health: number
  maxHealth: number
  name: string
  damage: number
  speed: number
  weapon: string | null
  lastShot: number
  target: Enemy | null
}

interface Bullet {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  damage: number
  fromPlayer: boolean
}

const ARENA_WIDTH = 800
const ARENA_HEIGHT = 500
const PLAYER_RADIUS = 24
const ENEMY_SIZE = 32
const ENEMY_SPEED = 1.5
const ENEMIES_PER_WAVE = 6
const PLAYER_ACCEL = 0.8
const PLAYER_MAX_SPEED = 8
const PLAYER_FRICTION = 0.85
const ENEMY_REWARD = 50
const ENEMY_DAMAGE = 10
const ENEMY_HEALTH = 20

function getRandomEdgePosition() {
  // Spawn on a random edge
  const edge = Math.floor(Math.random() * 4)
  switch (edge) {
    case 0: // top
      return { x: Math.random() * ARENA_WIDTH, y: 0 }
    case 1: // right
      return { x: ARENA_WIDTH, y: Math.random() * ARENA_HEIGHT }
    case 2: // bottom
      return { x: Math.random() * ARENA_WIDTH, y: ARENA_HEIGHT }
    case 3: // left
      return { x: 0, y: Math.random() * ARENA_HEIGHT }
    default:
      return { x: 0, y: 0 }
  }
}

export default function GameArena({ onGameOver, onOpenShop }: GameArenaProps) {
  const { gameState, updatePlayer, updateGameState } = useGame()
  const [waveActive, setWaveActive] = useState(false)
  const [showStartWave, setShowStartWave] = useState(true)
  const [, setIsBossWave] = useState(false)
  const [bossDefeated, setBossDefeated] = useState(false)
  const [arenaSize] = useState({ width: ARENA_WIDTH, height: ARENA_HEIGHT })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // For smooth movement
  const playerRef = useRef({ ...gameState.player })
  const playerVel = useRef({ vx: 0, vy: 0 })
  const keysRef = useRef<{[k: string]: boolean}>({})
  const enemiesRef = useRef<Enemy[]>([])
  const recruitsRef = useRef<Recruit[]>([])
  const bulletsRef = useRef<Bullet[]>([])
  const [lastShot, setLastShot] = useState(0)
  const [enemiesKilled, setEnemiesKilled] = useState(0)
  const [enemiesDamaged, setEnemiesDamaged] = useState(0)
  const mousePos = useRef({ x: 0, y: 0 })
  const [muzzleFlash, setMuzzleFlash] = useState<{x: number, y: number, angle: number, timestamp: number} | null>(null)

  // Start next wave
  const startWave = () => {
    setShowStartWave(false)
    setWaveActive(true)
    setEnemiesKilled(0)
    setEnemiesDamaged(0)
    setBossDefeated(false)
    
    // Check if this is a boss wave (every 12 waves)
    const isBoss = gameState.wave % 12 === 0
    setIsBossWave(isBoss)
    
    // Spawn more enemies each wave: 6 base + 2 per wave (capped at 24)
    const enemiesThisWave = isBoss ? 1 : Math.min(ENEMIES_PER_WAVE + gameState.wave - 1, 24)
    const newEnemies = Array.from({ length: enemiesThisWave }, (_, i) => {
      const pos = getRandomEdgePosition()
      // Weapon chance increases with wave: 30% base + 10% per wave (capped at 90%)
      const weaponChance = Math.min(0.3 + (gameState.wave - 1) * 0.1, 0.9)
      const hasWeapon = Math.random() < weaponChance
      // Progressive weapon selection based on wave
      let enemyWeapon: string | null = null
      if (hasWeapon) {
        const weaponTier = Math.min(Math.floor(gameState.wave / 3), 4) // 0-4 tiers
        const weaponPool = [
          ['Glock 19', 'M1911', 'Beretta M9'], // Tier 0: Basic pistols
          ['Desert Eagle', 'Colt Python', 'MP5', 'Uzi'], // Tier 1: Better pistols + SMGs
          ['AK-47', 'M4A1', 'SPAS-12', 'Remington 870'], // Tier 2: Assault rifles + shotguns
          ['Barrett M82', 'Dragunov SVD', 'M249 SAW', 'AA-12'], // Tier 3: Sniper rifles + LMGs
          ['Railgun', 'Plasma Blaster', 'Laser Carbine', 'Arc Cannon'] // Tier 4: Exotic weapons
        ]
        const availableWeapons = weaponPool[weaponTier]
        enemyWeapon = availableWeapons[Math.floor(Math.random() * availableWeapons.length)]
      }
      // Boss enemies every 12 waves
      let enemyType: 'grunt' | 'engineer' | 'ahhw' | 'agent' | 'l337' | 'boss' | 'mega_boss'
      if (isBoss) {
        // Wave 100 = Ultra Mega Super Final Boss
        if (gameState.wave === 100) {
          enemyType = 'mega_boss'
        } else {
          enemyType = 'boss'
        }
      } else {
        // L337 enemies are rare and only appear after wave 5
        const l337Chance = gameState.wave >= 5 ? 0.05 : 0 // 5% chance after wave 5
        enemyType = Math.random() < l337Chance ? 'l337' : Math.random() < 0.2 ? 'engineer' : Math.random() < 0.2 ? 'ahhw' : Math.random() < 0.2 ? 'agent' : 'grunt'
      }
      // Different stats based on enemy type
      let baseHealth = ENEMY_HEALTH + gameState.wave * 8
      let baseSpeed = ENEMY_SPEED + gameState.wave * 0.15
      let baseDamage = ENEMY_DAMAGE + gameState.wave * 3
      let size = ENEMY_SIZE
      let armor = 0
      switch (enemyType) {
        case 'engineer':
          baseHealth *= 1.5 // 50% more health
          baseSpeed *= 0.8 // 20% slower
          size *= 1.2 // 20% larger
          break
        case 'ahhw':
          baseSpeed *= 1.5 // 50% faster
          baseDamage *= 1.3 // 30% more damage
          size *= 0.9 // 10% smaller
          break
        case 'agent':
          baseHealth *= 1.2 // 20% more health
          baseDamage *= 1.1 // 10% more damage
          armor = 2 // 2 armor points
          break
        case 'l337':
          baseHealth *= 2.5 // 150% more health
          baseSpeed *= 1.3 // 30% faster
          baseDamage *= 1.8 // 80% more damage
          armor = 3 // 3 armor points
          size *= 1.1 // 10% larger
          break
        case 'boss':
          baseHealth *= 8 // 700% more health
          baseSpeed *= 0.7 // 30% slower
          baseDamage *= 3 // 200% more damage
          armor = 5 // 5 armor points
          size *= 2 // 100% larger
          break
        case 'mega_boss':
          baseHealth *= 20 // 1900% more health
          baseSpeed *= 0.5 // 50% slower
          baseDamage *= 5 // 400% more damage
          armor = 10 // 10 armor points
          size *= 3 // 200% larger
          break
        case 'grunt':
        default:
          // Base stats
          break
      }
      return {
        id: `enemy-${gameState.wave}-${i}-${Date.now()}`,
        x: pos.x,
        y: pos.y,
        health: baseHealth,
        maxHealth: baseHealth,
        type: enemyType,
        speed: baseSpeed,
        damage: baseDamage,
        lastShot: 0,
        weapon: enemyWeapon,
        size: size,
        color: enemyType === 'grunt' ? '#EF4444' : enemyType === 'engineer' ? '#34C759' : enemyType === 'ahhw' ? '#FF69B4' : enemyType === 'agent' ? '#8B9467' : enemyType === 'l337' ? '#FFD700' : enemyType === 'boss' ? '#8B0000' : '#FF0000', // Boss is dark red, Mega Boss is bright red
        shootingInterval: Math.max(1500 - (gameState.wave - 1) * 100, 400),
        armor: armor
      }
    })
    enemiesRef.current = newEnemies
    playerRef.current = { ...gameState.player }
    recruitsRef.current = []
    bulletsRef.current = []
    drawGame() // Draw initial state
  }

  // Main game loop
  useEffect(() => {
    if (!waveActive) return
    let animationFrameId: number;
    let running = true;
    function gameLoop() {
      // Smooth player movement
      let { x, y } = playerRef.current
      let { vx, vy } = playerVel.current
      if (keysRef.current['w']) vy -= PLAYER_ACCEL
      if (keysRef.current['s']) vy += PLAYER_ACCEL
      if (keysRef.current['a']) vx -= PLAYER_ACCEL
      if (keysRef.current['d']) vx += PLAYER_ACCEL
      // Clamp speed
      vx = Math.max(-PLAYER_MAX_SPEED, Math.min(PLAYER_MAX_SPEED, vx))
      vy = Math.max(-PLAYER_MAX_SPEED, Math.min(PLAYER_MAX_SPEED, vy))
      // Apply friction
      vx *= PLAYER_FRICTION
      vy *= PLAYER_FRICTION
      // Move
      x += vx
      y += vy
      // Clamp to arena
      x = Math.max(PLAYER_RADIUS, Math.min(arenaSize.width - PLAYER_RADIUS, x))
      y = Math.max(PLAYER_RADIUS, Math.min(arenaSize.height - PLAYER_RADIUS, y))
      playerRef.current.x = x
      playerRef.current.y = y
      playerVel.current = { vx, vy }

      // Move and shoot enemies
      const player = playerRef.current
      const now = Date.now()
      enemiesRef.current = enemiesRef.current.map(enemy => {
        const dx = player.x - enemy.x
        const dy = player.y - enemy.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 1) {
          const nx = dx / dist
          const ny = dy / dist
          enemy.x += nx * enemy.speed
          enemy.y += ny * enemy.speed
        }
        // Shooting rate increases with wave: 1500ms base, -100ms per wave (minimum 400ms)
        if (enemy.weapon && now - enemy.lastShot > enemy.shootingInterval) {
          enemy.lastShot = now
          const angle = Math.atan2(dy, dx)
          bulletsRef.current.push({
            id: `b-${Date.now()}-${Math.random()}`,
            x: enemy.x,
            y: enemy.y,
            vx: Math.cos(angle) * 8,
            vy: Math.sin(angle) * 8,
            // Enemy bullet damage increases: 10 base + 2 per wave
            damage: 10 + gameState.wave * 2,
            fromPlayer: false
          })
          // Muzzle flash effect
          setMuzzleFlash({x: enemy.x, y: enemy.y, angle: angle, timestamp: now})
        }
        return enemy
      })
      // Move and control recruits
      recruitsRef.current = recruitsRef.current.map(recruit => {
        // Find nearest enemy to target
        let nearestEnemy: Enemy | null = null
        let nearestDist = Infinity
        enemiesRef.current.forEach(enemy => {
          const dx = enemy.x - recruit.x
          const dy = enemy.y - recruit.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < nearestDist) {
            nearestDist = dist
            nearestEnemy = enemy
          }
        })
        recruit.target = nearestEnemy
        // Move towards target
        if (nearestEnemy && nearestDist > 100) {
          const dx = nearestEnemy.x - recruit.x
          const dy = nearestEnemy.y - recruit.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > 1) {
            const nx = dx / dist
            const ny = dy / dist
            recruit.x += nx * recruit.speed
            recruit.y += ny * recruit.speed
          }
        }
        // Shoot at target
        if (recruit.weapon && nearestEnemy && nearestDist < 300 && now - recruit.lastShot > 800) {
          recruit.lastShot = now
          const angle = Math.atan2(nearestEnemy.y - recruit.y, nearestEnemy.x - recruit.x)
          bulletsRef.current.push({
            id: `b-${Date.now()}-${Math.random()}`,
            x: recruit.x,
            y: recruit.y,
            vx: Math.cos(angle) * 10,
            vy: Math.sin(angle) * 10,
            damage: recruit.damage,
            fromPlayer: true
          })
        }
        return recruit
      })
      // Check collisions
      let playerHit = false
      let contactDamage = 0
      enemiesRef.current.forEach(enemy => {
        const dx = player.x - enemy.x
        const dy = player.y - enemy.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < PLAYER_RADIUS + enemy.size / 2) {
          playerHit = true
          contactDamage = Math.max(contactDamage, enemy.damage) // Use highest damage enemy
        }
      })
      if (playerHit) {
        playerRef.current.health -= contactDamage
        if (playerRef.current.health <= 0) {
          running = false
          setWaveActive(false)
          // Give coins for kills and damage
          const reward = enemiesKilled * ENEMY_REWARD + enemiesDamaged * 10
          updatePlayer({ coins: playerRef.current.coins + reward, health: 0 })
          // Reset wave back to 1 upon death so next run starts from the beginning
          updateGameState({ wave: 1 });
          onGameOver()
          return
        }
      }
      // Check recruit collisions with enemies (melee combat)
      recruitsRef.current = recruitsRef.current.map(recruit => {
        enemiesRef.current.forEach(enemy => {
          const dx = enemy.x - recruit.x
          const dy = enemy.y - recruit.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < enemy.size / 2 + 16) {
            // Recruit takes damage from enemy contact
            recruit.health -= enemy.damage * 0.5
            if (recruit.health <= 0) {
              return null // Remove recruit
            }
          }
        })
        return recruit
      }).filter(Boolean)
      // Move bullets
      bulletsRef.current = bulletsRef.current.filter(bullet => {
        bullet.x += bullet.vx
        bullet.y += bullet.vy
        // Remove if out of bounds
        return bullet.x > 0 && bullet.x < arenaSize.width && bullet.y > 0 && bullet.y < arenaSize.height
      })
      // Bullet collision with enemies
      bulletsRef.current = bulletsRef.current.filter(bullet => {
        if (!bullet.fromPlayer) {
          // Check if enemy bullet hits player
          const dx = bullet.x - player.x
          const dy = bullet.y - player.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < PLAYER_RADIUS) {
            // Player hit by enemy bullet
            playerRef.current.health -= bullet.damage
            if (playerRef.current.health <= 0) {
              running = false
              setWaveActive(false)
              // Give coins for kills and damage
              const reward = enemiesKilled * ENEMY_REWARD + enemiesDamaged * 10
              updatePlayer({ coins: playerRef.current.coins + reward, health: 0 })
              // Reset wave back to 1 upon death so next run starts from the beginning
              updateGameState({ wave: 1 });
              onGameOver()
              return false
            }
            return false // Remove bullet after hitting player
          }
          // Check if enemy bullet hits recruit
          let hitRecruit = false
          recruitsRef.current = recruitsRef.current.map(recruit => {
            if (!hitRecruit) {
              const dx = bullet.x - recruit.x
              const dy = bullet.y - recruit.y
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (dist < 16) {
                hitRecruit = true
                recruit.health -= bullet.damage
                if (recruit.health <= 0) {
                  return null
                }
              }
            }
            return recruit
          }).filter(Boolean)
          if (hitRecruit) return false
          return true
        }
        let hit = false
        enemiesRef.current = enemiesRef.current.map(enemy => {
          const dx = bullet.x - enemy.x
          const dy = bullet.y - enemy.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < enemy.size / 2) {
            hit = true
            const actualDamage = Math.max(1, bullet.damage - (enemy.armor || 0))
            const newHealth = enemy.health - actualDamage
            if (newHealth <= 0) {
              setEnemiesKilled(k => k + 1)
              return null
            } else {
              setEnemiesDamaged(d => d + 1)
              return { ...enemy, health: newHealth }
            }
          }
          return enemy
        }).filter(Boolean)
        return !hit
      })
      // End wave if all enemies are dead
      if (enemiesRef.current.length === 0) {
        running = false
        setWaveActive(false)
        
        // Check if this was a boss wave for special rewards
        const wasBoss = gameState.wave % 12 === 0
        const wasMegaBoss = gameState.wave === 100
        
        setTimeout(() => {
          updateGameState({ wave: gameState.wave + 1 })
          setShowStartWave(true)
          
          // Special rewards for boss waves
          let baseReward = enemiesKilled * ENEMY_REWARD + enemiesDamaged * 10 + 200
          if (wasBoss) {
            baseReward *= wasMegaBoss ? 10 : 3 // 10x for mega boss, 3x for regular boss
          }
          
          updatePlayer({ 
            coins: playerRef.current.coins + baseReward,
            health: playerRef.current.maxHealth // Restore health to full after wave completion
          })
          
          // After wave 100, show special message but continue
          if (wasMegaBoss) {
            setBossDefeated(true)
            // Player continues but gets massive reward
          }
          
          onOpenShop()
        }, 1000)
        return
      }
      drawGame()
      if (running) animationFrameId = requestAnimationFrame(gameLoop)
    }
    gameLoop() // Start the loop
    return () => cancelAnimationFrame(animationFrameId)
  }, [waveActive])

  // Draw everything to canvas
  function drawGame() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    // Clear
    ctx.clearRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT)
    // Draw background
    ctx.fillStyle = '#181825'
    ctx.fillRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT)
    // Draw player
    const player = playerRef.current
    ctx.save()
    ctx.beginPath()
    ctx.arc(player.x, player.y, PLAYER_RADIUS, 0, Math.PI * 2)
    ctx.fillStyle = '#8B5CF6'
    ctx.shadowColor = '#fff'
    ctx.shadowBlur = 10
    ctx.fill()
    ctx.restore()
    // Draw player health bar
    ctx.fillStyle = '#222'
    ctx.fillRect(player.x - 30, player.y - PLAYER_RADIUS - 16, 60, 6)
    ctx.fillStyle = '#10B981'
    ctx.fillRect(player.x - 30, player.y - PLAYER_RADIUS - 16, 60 * (player.health / player.maxHealth), 6)
    // Draw weapon model
    const weaponName = player.currentWeapon
    if (weaponName && weaponName !== 'Fists') {
      const angle = Math.atan2(mousePos.current.y - player.y, mousePos.current.x - player.x)
      drawWeapon(ctx, weaponName, player.x + Math.cos(angle) * PLAYER_RADIUS, player.y + Math.sin(angle) * PLAYER_RADIUS, angle)
    }
    // Draw enemies
    enemiesRef.current.forEach(enemy => {
      ctx.save()
      ctx.translate(enemy.x, enemy.y)
      ctx.rotate(Math.PI / 4)
      ctx.fillStyle = enemy.color
      ctx.shadowColor = '#fff'
      ctx.shadowBlur = 8
      ctx.fillRect(-enemy.size / 2, -enemy.size / 2, enemy.size, enemy.size)
      ctx.restore()
      // Enemy health bar
      ctx.fillStyle = '#222'
      ctx.fillRect(enemy.x - 16, enemy.y - enemy.size / 2 - 8, 32, 4)
      ctx.fillStyle = '#F59E42'
      ctx.fillRect(enemy.x - 16, enemy.y - enemy.size / 2 - 8, 32 * (enemy.health / enemy.maxHealth), 4)
      // Enemy type label
      ctx.fillStyle = '#fff'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      const typeLabel = enemy.type === 'grunt' ? 'GRUNT' : enemy.type === 'engineer' ? 'ENG' : enemy.type === 'ahhw' ? 'AHHW' : enemy.type === 'agent' ? 'AGENT' : enemy.type === 'l337' ? 'L337' : enemy.type === 'boss' ? 'BOSS' : 'MEGA BOSS'
      ctx.fillText(typeLabel, enemy.x, enemy.y - enemy.size / 2 - 16)
      // Draw enemy weapon
      if (enemy.weapon) {
        const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x)
        drawEnemyWeapon(ctx, enemy.weapon, enemy.x + Math.cos(angle) * (enemy.size / 2), enemy.y + Math.sin(angle) * (enemy.size / 2), angle)
      }
    })
    // Draw recruits
    recruitsRef.current.forEach(recruit => {
      ctx.save()
      ctx.fillStyle = '#34C759'
      ctx.shadowColor = '#fff'
      ctx.shadowBlur = 8
      ctx.fillRect(recruit.x - 16, recruit.y - 16, 32, 32)
      ctx.restore()
      // Recruit health bar
      ctx.fillStyle = '#222'
      ctx.fillRect(recruit.x - 16, recruit.y - 32 - 8, 32, 4)
      ctx.fillStyle = '#10B981'
      ctx.fillRect(recruit.x - 16, recruit.y - 32 - 8, 32 * (recruit.health / recruit.maxHealth), 4)
      // Recruit name label
      ctx.fillStyle = '#34C759'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      const nameLabel = recruit.name.toUpperCase().substring(0, 8)
      ctx.fillText(nameLabel, recruit.x, recruit.y - 32 - 16)
      // Draw recruit target
      if (recruit.target) {
        const dx = recruit.x - recruit.target.x
        const dy = recruit.y - recruit.target.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        ctx.strokeStyle = '#8B5CF6'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(recruit.x, recruit.y)
        ctx.lineTo(recruit.x + dx / dist * 32, recruit.y + dy / dist * 32)
        ctx.stroke()
      }
    })
    // Draw bullets
    bulletsRef.current.forEach(bullet => {
      ctx.save()
      if (bullet.fromPlayer) {
        // Player bullets - more elongated and bright
        ctx.fillStyle = '#FFD700'
        ctx.shadowColor = '#FFD700'
        ctx.shadowBlur = 10
        ctx.translate(bullet.x, bullet.y)
        ctx.rotate(Math.atan2(bullet.vy, bullet.vx))
        ctx.fillRect(-4, -1, 8, 2)
      } else {
        // Enemy bullets - red and dangerous looking
        ctx.fillStyle = '#EF4444'
        ctx.shadowColor = '#EF4444'
        ctx.shadowBlur = 8
        ctx.translate(bullet.x, bullet.y)
        ctx.rotate(Math.atan2(bullet.vy, bullet.vx))
        ctx.fillRect(-3, -1, 6, 2)
      }
      ctx.restore()
    })
    // Draw muzzle flash
    if (muzzleFlash) {
      const {x, y, angle, timestamp} = muzzleFlash
      const now = Date.now()
      if (now - timestamp < 100) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(angle)
        ctx.fillStyle = '#FFD700'
        ctx.shadowColor = '#FFD700'
        ctx.shadowBlur = 10
        ctx.fillRect(-5, -5, 10, 10)
        ctx.restore()
      }
    }
    // Draw crosshair
    ctx.save()
    ctx.strokeStyle = '#8B5CF6'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(mousePos.current.x - 10, mousePos.current.y)
    ctx.lineTo(mousePos.current.x + 10, mousePos.current.y)
    ctx.moveTo(mousePos.current.x, mousePos.current.y - 10)
    ctx.lineTo(mousePos.current.x, mousePos.current.y + 10)
    ctx.stroke()
    ctx.restore()
  }

  // Player movement (WASD) - smooth
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      if (key === 'q') {
        // Swap weapons if two are held
        if (playerRef.current.weapons.length === 2) {
          const temp = playerRef.current.weapons[0]
          playerRef.current.weapons[0] = playerRef.current.weapons[1]
          playerRef.current.weapons[1] = temp
          const newCurrent = playerRef.current.weapons[0].name
          const newSecondary = playerRef.current.weapons[1].name
          playerRef.current.currentWeapon = newCurrent
          playerRef.current.secondaryWeapon = newSecondary
          // Also update context for UI
          updatePlayer({
            weapons: [...playerRef.current.weapons],
            currentWeapon: newCurrent,
            secondaryWeapon: newSecondary
          })
        }
      } else if (key === 'f') {
        // Drop current weapon
        const player = playerRef.current
        if (player.currentWeapon !== 'Fists') {
          const newWeapons = player.weapons.filter(w => w.name !== player.currentWeapon)
          player.weapons = newWeapons
          player.currentWeapon = newWeapons.length > 0 ? newWeapons[0].name : 'Fists'
          player.secondaryWeapon = newWeapons.length > 1 ? newWeapons[1].name : null
          updatePlayer({
            weapons: [...player.weapons],
            currentWeapon: player.currentWeapon,
            secondaryWeapon: player.secondaryWeapon
          })
        }
      } else {
        keysRef.current[key] = true
      }
    }
    function handleKeyUp(e: KeyboardEvent) {
      keysRef.current[e.key.toLowerCase()] = false
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [updatePlayer])
  // Mouse move for aiming
  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    drawGame()
  }

  // Mouse down for shooting/melee
  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!waveActive) return
    const player = playerRef.current
    const now = Date.now()
    const weaponName = player.currentWeapon
    const ownedWeapon = player.weapons.find(w => w.name === weaponName)
    const isGun = weaponName && [
      'Glock 19','Desert Eagle','M1911','Beretta M9','FN Five-seveN','Colt Python','Mateba Autorevolver','CZ-75 Shadow','H&K USP','SIG Sauer P226',
      'MP5','Uzi','P90','MAC-10','Vector KRISS','Scorpion EVO 3','PP-19 Bizon','MP7',
      'AK-47','M4A1','FAMAS','AUG','SCAR-L','FN F2000','G36C','AN-94','QBZ-95',
      'SPAS-12','Remington 870','Mossberg 500','AA-12','Saiga-12','Double-barrel shotgun','Winchester Model 1887',
      'Barrett M82','Dragunov SVD','M24','AWM','Kar98k','CheyTac M200','MK14 EBR','Mosin-Nagant',
      'M249 SAW','RPK','PKM','MG42','FN Minimi','HK21E',
      'Railgun','Gauss Rifle','Plasma Blaster','Laser Carbine','Arc Cannon','Flamethrower','Tesla Rifle','Cryo Gun','Smart Gun','Gravity Pulse Blaster'
    ].includes(weaponName)
    // If weapon is broken, auto-switch to fists
    if (ownedWeapon && ownedWeapon.durability === 0) {
      player.currentWeapon = 'Fists'
      drawGame()
      return
    }
    // Left click = shoot, right click = melee/fist
    if (e.button === 0 && isGun && ownedWeapon && ownedWeapon.durability > 0) {
      // Shoot
      if (now - lastShot < 200) return // fire rate
      setLastShot(now)
      const angle = Math.atan2(mousePos.current.y - player.y, mousePos.current.x - player.x)
      bulletsRef.current.push({
        id: `b-${Date.now()}-${Math.random()}`,
        x: player.x,
        y: player.y,
        vx: Math.cos(angle) * 12,
        vy: Math.sin(angle) * 12,
        damage: 20,
        fromPlayer: true
      })
      // Player muzzle flash effect
      setMuzzleFlash({x: player.x, y: player.y, angle: angle, timestamp: now})
      // Reduce durability
      ownedWeapon.durability = Math.max(0, ownedWeapon.durability - 1)
      if (ownedWeapon.durability === 0) {
        player.currentWeapon = 'Fists'
      }
    } else if ((e.button === 2 && (!isGun || !ownedWeapon || ownedWeapon.durability === 0)) || (e.button === 0 && (!isGun || !ownedWeapon || ownedWeapon.durability === 0))) {
      // Melee/fist (right click or left click if no gun or broken)
      enemiesRef.current = enemiesRef.current.map(enemy => {
        const dx = enemy.x - player.x
        const dy = enemy.y - player.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < PLAYER_RADIUS + enemy.size / 2 + 10) {
          // Melee hit
          const actualDamage = Math.max(1, 25 - (enemy.armor || 0))
          const newHealth = enemy.health - actualDamage
          if (newHealth <= 0) {
            setEnemiesKilled(k => k + 1)
            return null
          } else {
            setEnemiesDamaged(d => d + 1)
            return { ...enemy, health: newHealth }
          }
        }
        return enemy
      }).filter(Boolean)
      // If using a melee weapon, reduce durability
      if (ownedWeapon && ownedWeapon.durability > 0 && !isGun) {
        ownedWeapon.durability = Math.max(0, ownedWeapon.durability - 1)
        if (ownedWeapon.durability === 0) {
          player.currentWeapon = 'Fists'
        }
      }
    }
    drawGame()
  }

  // Prevent context menu on right click
  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault()
  }

  // Render
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={arenaSize.width}
          height={arenaSize.height}
          className="border-4 border-purple-700 rounded-xl bg-slate-800 shadow-lg cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onContextMenu={handleContextMenu}
        />
        {/* Start Wave Button */}
        {showStartWave && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center">
              {gameState.wave % 12 === 0 && (
                <div className="mb-4">
                  <div className={`text-4xl font-bold mb-2 ${gameState.wave === 100 ? 'text-red-400' : 'text-orange-400'}`}>
                    {gameState.wave === 100 ? '🔥 ULTRA MEGA SUPER FINAL BOSS! 🔥' : '⚔️ BOSS BATTLE! ⚔️'}
                  </div>
                  <div className="text-lg text-gray-300">
                    {gameState.wave === 100 ? 'The ultimate challenge awaits...' : 'A powerful enemy approaches...'}
                  </div>
                </div>
              )}
              <button
                onClick={startWave}
                className={`px-8 py-4 bg-gradient-to-r text-white text-2xl font-bold rounded-lg shadow-lg border-2 border-white hover:scale-105 transition-transform ${
                  gameState.wave % 12 === 0 ? 'from-red-600 to-orange-600' : 'from-purple-600 to-pink-600'
                }`}
              >
                {gameState.wave % 12 === 0 ? `Fight Boss Wave ${gameState.wave}` : `Start Wave ${gameState.wave}`}
              </button>
            </div>
          </div>
        )}
        
        {/* Victory Message for Mega Boss */}
        {bossDefeated && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/50">
            <div className="text-center bg-gradient-to-r from-yellow-900 to-orange-900 p-8 rounded-lg border-4 border-yellow-400">
              <div className="text-6xl font-bold text-yellow-400 mb-4">
                🏆 VICTORY! 🏆
              </div>
              <div className="text-2xl text-orange-300 mb-4">
                Ultra Mega Super Final Boss DEFEATED!
              </div>
              <div className="text-lg text-yellow-200 mb-6">
                You are the ultimate warrior!
                <br />
                But the fight never ends...
              </div>
              <button
                onClick={() => setBossDefeated(false)}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-black font-bold rounded-lg"
              >
                Continue Fighting!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
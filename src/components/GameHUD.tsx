import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { Heart, Coins, Shield, Users, Trophy, Zap } from 'lucide-react'
import { calculateArmorBonuses } from '../utils/armorCalculator'

export default function GameHUD() {
  const { gameState } = useGame()
  const { player, wave, score, enemies } = gameState
  const armorBonuses = calculateArmorBonuses(player.armor)

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 p-4">
        <div className="flex justify-between items-start">
          {/* Left side - Player stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 space-y-2 border border-purple-500/30"
          >
            {/* Health */}
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 to-red-400"
                  initial={{ width: '100%' }}
                  animate={{ width: `${(player.health / player.maxHealth) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-white text-sm font-bold">
                {player.health}/{player.maxHealth}
              </span>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{player.coins.toLocaleString()}</span>
            </div>

            {/* Weapons (dual slot) */}
            <div className="flex items-center gap-2 mt-2">
              {player.weapons.map(w => (
                <div
                  key={w.name}
                  className={`flex flex-col items-center px-2 py-1 rounded-lg border-2 ${player.currentWeapon === w.name ? 'border-purple-500 bg-purple-900/40' : 'border-slate-700 bg-slate-800/40'} transition-all`}
                >
                  <span className={`font-bold ${player.currentWeapon === w.name ? 'text-purple-300' : 'text-slate-300'}`}>{w.name}</span>
                  <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full rounded-full ${w.durability === 0 ? 'bg-red-500' : 'bg-green-400'}`}
                      style={{ width: `${Math.max(0, w.durability)}%` }}
                    />
                  </div>
                  <span className={`text-xs ${w.durability === 0 ? 'text-red-400' : 'text-green-400'}`}>{w.durability}/100</span>
                  {player.currentWeapon === w.name && <span className="text-xs text-purple-400 mt-1">Active</span>}
                  {player.secondaryWeapon === w.name && <span className="text-xs text-slate-400 mt-1">Secondary</span>}
                </div>
              ))}
            </div>

            {/* Armor Stats */}
            {(armorBonuses.health > 0 || armorBonuses.armor > 0 || armorBonuses.speed !== 0 || armorBonuses.damage > 0) && (
              <div className="flex items-center gap-4 text-xs">
                {armorBonuses.health > 0 && (
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-400" />
                    <span className="text-green-400">+{armorBonuses.health}</span>
                  </div>
                )}
                {armorBonuses.armor > 0 && (
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400">+{armorBonuses.armor}</span>
                  </div>
                )}
                {armorBonuses.speed !== 0 && (
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className={armorBonuses.speed > 0 ? 'text-green-400' : 'text-red-400'}>
                      {armorBonuses.speed > 0 ? '+' : ''}{armorBonuses.speed}
                    </span>
                  </div>
                )}
                {armorBonuses.damage > 0 && (
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-orange-400" />
                    <span className="text-orange-400">+{armorBonuses.damage}</span>
                  </div>
                )}
              </div>
            )}

            {/* Allies count */}
            {player.allies.length > 0 && (
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-bold">{player.allies.length}</span>
              </div>
            )}
          </motion.div>

          {/* Right side - Wave & Score */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 space-y-2 border border-purple-500/30 text-right"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-bold">Wave {wave}</span>
            </div>
            <div className="text-white font-bold">
              Score: {score.toLocaleString()}
            </div>
            <div className="text-red-400 font-bold">
              Enemies: {enemies.length}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom HUD - Controls hint */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-6 py-2 border border-purple-500/30"
          >
            <div className="flex items-center gap-4 text-sm text-purple-300">
              <div className="flex items-center gap-1">
                <span className="font-bold">WASD</span>
                <span>Move</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold">MOUSE</span>
                <span>Aim & Shoot</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span className="font-bold">SPACE</span>
                <span>Block</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold">R</span>
                <span>Reload</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold">E</span>
                <span>Shop</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blocking indicator */}
      {player.isBlocking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-8 border-2 border-blue-400">
            <Shield className="w-16 h-16 text-blue-400" />
          </div>
        </motion.div>
      )}
    </div>
  )
}
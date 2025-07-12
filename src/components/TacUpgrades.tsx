import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Coins, TrendingUp, Zap, Shield, Target, Activity } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface TacUpgradesProps {
  onBack: () => void
}

interface TacUpgrade {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  baseCost: number
  maxLevel: number
  effect: string
  statKey: 'tac' | 'dex' | 'str' | 'awr' | 'end'
}

const tacUpgrades: TacUpgrade[] = [
  {
    id: 'tac',
    name: 'TAC (Tactical Awareness)',
    description: 'Increases reload speed, weapon swap speed, and shop discounts',
    icon: <Target className="w-6 h-6" />,
    baseCost: 200,
    maxLevel: 10,
    effect: '+10% reload speed, +5% shop discount per level',
    statKey: 'tac'
  },
  {
    id: 'dex',
    name: 'DEX (Dexterity)',
    description: 'Increases movement speed and dodge chance',
    icon: <Zap className="w-6 h-6" />,
    baseCost: 150,
    maxLevel: 10,
    effect: '+5% movement speed, +2% dodge chance per level',
    statKey: 'dex'
  },
  {
    id: 'str',
    name: 'STR (Strength)',
    description: 'Increases weapon damage and melee damage',
    icon: <TrendingUp className="w-6 h-6" />,
    baseCost: 180,
    maxLevel: 10,
    effect: '+8% weapon damage, +15% melee damage per level',
    statKey: 'str'
  },
  {
    id: 'awr',
    name: 'AWR (Awareness)',
    description: 'Increases detection range and critical hit chance',
    icon: <Activity className="w-6 h-6" />,
    baseCost: 220,
    maxLevel: 10,
    effect: '+10% detection range, +3% critical hit chance per level',
    statKey: 'awr'
  },
  {
    id: 'end',
    name: 'END (Endurance)',
    description: 'Increases maximum health and health regeneration',
    icon: <Shield className="w-6 h-6" />,
    baseCost: 250,
    maxLevel: 10,
    effect: '+20 max health, +1 health regen per level',
    statKey: 'end'
  }
]

export default function TacUpgrades({ onBack }: TacUpgradesProps) {
  const { gameState, buyTacUpgrade } = useGame()

  const getUpgradeCost = (upgrade: TacUpgrade, currentLevel: number) => {
    // Cost increases exponentially: baseCost * (1.5 ^ currentLevel)
    return Math.floor(upgrade.baseCost * Math.pow(1.5, currentLevel))
  }

  const handleUpgrade = (upgrade: TacUpgrade) => {
    const currentLevel = gameState.player[upgrade.statKey] as number
    const cost = getUpgradeCost(upgrade, currentLevel)
    
    if (currentLevel >= upgrade.maxLevel) {
      toast.error('Maximum level reached!')
      return
    }

    if (buyTacUpgrade(upgrade.id, cost)) {
      toast.success(`${upgrade.name} upgraded to level ${currentLevel + 1}!`)
    } else {
      toast.error('Not enough coins!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
            TAC-BAR UPGRADES
          </h1>
          <div className="flex items-center justify-center gap-4 text-2xl">
            <Coins className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{gameState.player.coins.toLocaleString()}</span>
            <span className="text-purple-300">coins</span>
          </div>
          <p className="text-purple-300 mt-2">Enhance Your Combat Abilities - Become the Ultimate Warrior!</p>
        </motion.div>

        {/* Current Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-slate-800/50 border-2 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-center text-cyan-400">Current TAC-BAR Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">{gameState.player.tac}</div>
                  <div className="text-sm text-gray-400">TAC</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{gameState.player.dex}</div>
                  <div className="text-sm text-gray-400">DEX</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">{gameState.player.str}</div>
                  <div className="text-sm text-gray-400">STR</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{gameState.player.awr}</div>
                  <div className="text-sm text-gray-400">AWR</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{gameState.player.end}</div>
                  <div className="text-sm text-gray-400">END</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upgrades Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tacUpgrades.map((upgrade) => {
            const currentLevel = gameState.player[upgrade.statKey] as number
            const cost = getUpgradeCost(upgrade, currentLevel)
            const canAfford = gameState.player.coins >= cost
            const isMaxLevel = currentLevel >= upgrade.maxLevel
            
            return (
              <motion.div
                key={upgrade.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`relative overflow-hidden transition-all hover:shadow-lg border-2 ${
                  isMaxLevel ? 'border-yellow-500 bg-yellow-900/10' : 'border-slate-600'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-purple-400">
                        {upgrade.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{upgrade.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            Level {currentLevel}/{upgrade.maxLevel}
                          </Badge>
                          {isMaxLevel && (
                            <Badge className="bg-yellow-600 text-xs">MAX</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{upgrade.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Effect Description */}
                    <div className="text-sm text-gray-300 bg-slate-800/50 p-3 rounded-lg">
                      <strong>Effect:</strong> {upgrade.effect}
                    </div>

                    {/* Level Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{currentLevel}/{upgrade.maxLevel}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(currentLevel / upgrade.maxLevel) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Cost and Upgrade Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-400 font-bold">
                        <Coins className="w-4 h-4" />
                        {isMaxLevel ? 'MAXED' : cost.toLocaleString()}
                      </div>
                      <Button
                        onClick={() => handleUpgrade(upgrade)}
                        disabled={!canAfford || isMaxLevel}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
                      >
                        {isMaxLevel ? 'MAX LEVEL' : 'UPGRADE'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button
            onClick={onBack}
            size="lg"
            variant="outline"
            className="px-8 py-6 text-xl font-bold border-2 border-purple-500 hover:bg-purple-500/20"
          >
            Back to Shop
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
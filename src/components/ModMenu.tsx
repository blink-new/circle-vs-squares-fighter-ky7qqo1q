import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { useModSystem } from '../hooks/useModSystem'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Slider } from './ui/slider'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Settings, 
  Coins, 
  Shield, 
  Zap, 
  Sword, 
  Crown, 
  Star, 
  X,
  RefreshCw,
  Target,
  Skull,
  Bolt,
  Ghost,
  Bomb,
  Rocket,
  Snowflake,
  Sun
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ModMenuProps {
  isOpen: boolean
  onClose: () => void
}

const specialPowers = [
  {
    id: 'invincibility',
    name: 'Invincibility',
    description: 'Take no damage from enemies',
    icon: Shield,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20'
  },
  {
    id: 'infinite_ammo',
    name: 'Infinite Ammo',
    description: 'Weapons never lose durability',
    icon: Target,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20'
  },
  {
    id: 'super_speed',
    name: 'Super Speed',
    description: '5x movement speed',
    icon: Zap,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20'
  },
  {
    id: 'one_shot_kill',
    name: 'One Shot Kill',
    description: 'Kill enemies with one hit',
    icon: Skull,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20'
  },
  {
    id: 'lightning_aura',
    name: 'Lightning Aura',
    description: 'Damage enemies around you',
    icon: Bolt,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20'
  },
  {
    id: 'ghost_mode',
    name: 'Ghost Mode',
    description: 'Walk through enemies',
    icon: Ghost,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20'
  },
  {
    id: 'explosive_rounds',
    name: 'Explosive Rounds',
    description: 'All shots explode on impact',
    icon: Bomb,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20'
  },
  {
    id: 'rocket_launcher',
    name: 'Rocket Launcher',
    description: 'Massive damage rockets',
    icon: Rocket,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20'
  },
  {
    id: 'freeze_time',
    name: 'Freeze Time',
    description: 'Slow down all enemies',
    icon: Snowflake,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20'
  },
  {
    id: 'vampire_mode',
    name: 'Vampire Mode',
    description: 'Heal when damaging enemies',
    icon: Sun,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20'
  }
]

export default function ModMenu({ isOpen, onClose }: ModMenuProps) {
  const { gameState, updateGameState, updatePlayer } = useGame()
  const { modState, updateModState } = useModSystem()
  const [targetWave, setTargetWave] = useState(gameState.wave)
  const [coinInput, setCoinInput] = useState('')

  // Save mod settings
  const saveMods = () => {
    localStorage.setItem('madness_mods', JSON.stringify(modState))
    toast.success('Mod settings saved!')
  }

  // Toggle power
  const togglePower = (powerId: string) => {
    const newPowers = modState.activePowers.includes(powerId)
      ? modState.activePowers.filter(id => id !== powerId)
      : [...modState.activePowers, powerId]
    
    updateModState({ activePowers: newPowers })
    
    const power = specialPowers.find(p => p.id === powerId)
    if (power) {
      toast.success(`${power.name} ${newPowers.includes(powerId) ? 'enabled' : 'disabled'}!`)
    }
  }

  // Update multipliers
  const updateHealthMultiplier = (value: number) => {
    updateModState({ healthMultiplier: value })
  }

  const updateDamageMultiplier = (value: number) => {
    updateModState({ damageMultiplier: value })
  }

  const updateSpeedMultiplier = (value: number) => {
    updateModState({ speedMultiplier: value })
  }

  // Apply infinite coins
  const applyInfiniteCoins = () => {
    updatePlayer({ coins: 999999999 })
    toast.success('Infinite coins activated! 💰')
  }

  // Add specific coins
  const addCoins = () => {
    const amount = parseInt(coinInput)
    if (amount && amount > 0) {
      updatePlayer({ coins: gameState.player.coins + amount })
      toast.success(`Added ${amount.toLocaleString()} coins!`)
      setCoinInput('')
    }
  }

  // Jump to wave
  const jumpToWave = () => {
    if (targetWave > 0) {
      updateGameState({ wave: targetWave })
      toast.success(`Jumped to wave ${targetWave}!`)
    }
  }

  // Apply god mode
  const applyGodMode = () => {
    updatePlayer({ 
      health: 999999,
      maxHealth: 999999
    })
    toast.success('God mode activated! 🛡️')
  }

  // Max all stats
  const maxAllStats = () => {
    updatePlayer({
      tac: 99,
      dex: 99,
      str: 99,
      awr: 99,
      end: 99
    })
    toast.success('All stats maxed out! 📈')
  }

  // Unlock all armor
  const unlockAllArmor = () => {
    // Get all armor IDs from the armor data
    const allArmorIds = [
      'basic_helmet', 'basic_chest', 'basic_legs', 'basic_boots', 'basic_gloves', 'basic_shield',
      'tactical_helmet', 'tactical_chest', 'tactical_legs', 'tactical_boots', 'tactical_gloves', 'tactical_shield',
      'ninja_helmet', 'ninja_chest', 'ninja_legs', 'ninja_boots', 'ninja_gloves', 'ninja_shield',
      'berserker_helmet', 'berserker_chest', 'berserker_legs', 'berserker_boots', 'berserker_gloves', 'berserker_shield',
      'mage_helmet', 'mage_chest', 'mage_legs', 'mage_boots', 'mage_gloves', 'mage_shield',
      'dragon_helmet', 'dragon_chest', 'dragon_legs', 'dragon_boots', 'dragon_gloves', 'dragon_shield',
      'cyber_helmet', 'cyber_chest', 'cyber_legs', 'cyber_boots', 'cyber_gloves', 'cyber_shield',
      'void_helmet', 'void_chest', 'void_legs', 'void_boots', 'void_gloves', 'void_shield'
    ]
    
    updatePlayer({ ownedArmor: allArmorIds })
    toast.success('All armor unlocked! 🛡️')
  }

  // Reset everything
  const resetMods = () => {
    updateModState({
      activePowers: [],
      healthMultiplier: 1,
      damageMultiplier: 1,
      speedMultiplier: 1
    })
    localStorage.removeItem('madness_mods')
    toast.success('All mods reset!')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-slate-900/95 backdrop-blur-xl rounded-xl border-2 border-purple-500/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-500/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Mod Menu</h2>
                  <p className="text-purple-300">Unleash ultimate power</p>
                </div>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              <Tabs defaultValue="cheats" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="cheats">Cheats</TabsTrigger>
                  <TabsTrigger value="powers">Powers</TabsTrigger>
                  <TabsTrigger value="multipliers">Multipliers</TabsTrigger>
                  <TabsTrigger value="unlocks">Unlocks</TabsTrigger>
                </TabsList>

                {/* Cheats Tab */}
                <TabsContent value="cheats" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Infinite Coins */}
                    <Card className="bg-slate-800/50 border-yellow-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-400">
                          <Coins className="w-5 h-5" />
                          Infinite Coins
                        </CardTitle>
                        <CardDescription>Get unlimited money</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button
                          onClick={applyInfiniteCoins}
                          className="w-full bg-yellow-600 hover:bg-yellow-700"
                        >
                          Give 999,999,999 Coins
                        </Button>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Custom amount"
                            value={coinInput}
                            onChange={(e) => setCoinInput(e.target.value)}
                            className="flex-1"
                          />
                          <Button onClick={addCoins} variant="outline">
                            Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Wave Selection */}
                    <Card className="bg-slate-800/50 border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-400">
                          <Crown className="w-5 h-5" />
                          Wave Control
                        </CardTitle>
                        <CardDescription>Jump to any wave</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Wave number"
                            value={targetWave}
                            onChange={(e) => setTargetWave(parseInt(e.target.value) || 1)}
                            className="flex-1"
                          />
                          <Button onClick={jumpToWave} variant="outline">
                            Jump
                          </Button>
                        </div>
                        <p className="text-sm text-gray-400">Current wave: {gameState.wave}</p>
                      </CardContent>
                    </Card>

                    {/* God Mode */}
                    <Card className="bg-slate-800/50 border-blue-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-400">
                          <Shield className="w-5 h-5" />
                          God Mode
                        </CardTitle>
                        <CardDescription>Become invincible</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={applyGodMode}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Activate God Mode
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Max Stats */}
                    <Card className="bg-slate-800/50 border-green-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-400">
                          <Star className="w-5 h-5" />
                          Max Stats
                        </CardTitle>
                        <CardDescription>Max all TAC-BAR stats</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={maxAllStats}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          Max All Stats
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Powers Tab */}
                <TabsContent value="powers" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specialPowers.map((power) => {
                      const Icon = power.icon
                      const isActive = modState.activePowers.includes(power.id)
                      
                      return (
                        <Card 
                          key={power.id} 
                          className={`cursor-pointer transition-all duration-300 ${
                            isActive 
                              ? `bg-gradient-to-r ${power.bgColor} border-2 ${power.color.replace('text-', 'border-')} shadow-lg` 
                              : 'bg-slate-800/50 border-slate-600/30 hover:border-purple-500/50'
                          }`}
                          onClick={() => togglePower(power.id)}
                        >
                          <CardHeader>
                            <CardTitle className={`flex items-center gap-2 ${isActive ? power.color : 'text-white'}`}>
                              <Icon className="w-5 h-5" />
                              {power.name}
                              {isActive && <Badge className="bg-green-500">Active</Badge>}
                            </CardTitle>
                            <CardDescription>{power.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>

                {/* Multipliers Tab */}
                <TabsContent value="multipliers" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Health Multiplier */}
                    <Card className="bg-slate-800/50 border-red-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-400">
                          <Shield className="w-5 h-5" />
                          Health x{modState.healthMultiplier}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Slider
                          value={[modState.healthMultiplier]}
                          onValueChange={(value) => updateHealthMultiplier(value[0])}
                          min={0.1}
                          max={10}
                          step={0.1}
                          className="w-full"
                        />
                      </CardContent>
                    </Card>

                    {/* Damage Multiplier */}
                    <Card className="bg-slate-800/50 border-orange-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-400">
                          <Sword className="w-5 h-5" />
                          Damage x{modState.damageMultiplier}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Slider
                          value={[modState.damageMultiplier]}
                          onValueChange={(value) => updateDamageMultiplier(value[0])}
                          min={0.1}
                          max={10}
                          step={0.1}
                          className="w-full"
                        />
                      </CardContent>
                    </Card>

                    {/* Speed Multiplier */}
                    <Card className="bg-slate-800/50 border-yellow-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-400">
                          <Zap className="w-5 h-5" />
                          Speed x{modState.speedMultiplier}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Slider
                          value={[modState.speedMultiplier]}
                          onValueChange={(value) => updateSpeedMultiplier(value[0])}
                          min={0.1}
                          max={10}
                          step={0.1}
                          className="w-full"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Unlocks Tab */}
                <TabsContent value="unlocks" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Unlock All Armor */}
                    <Card className="bg-slate-800/50 border-cyan-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-cyan-400">
                          <Shield className="w-5 h-5" />
                          Unlock All Armor
                        </CardTitle>
                        <CardDescription>Get every armor piece</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={unlockAllArmor}
                          className="w-full bg-cyan-600 hover:bg-cyan-700"
                        >
                          Unlock All Armor
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Reset Mods */}
                    <Card className="bg-slate-800/50 border-red-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-400">
                          <RefreshCw className="w-5 h-5" />
                          Reset Mods
                        </CardTitle>
                        <CardDescription>Clear all modifications</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={resetMods}
                          variant="destructive"
                          className="w-full"
                        >
                          Reset All Mods
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-purple-500/30 flex justify-between items-center">
                <p className="text-sm text-gray-400">Press <kbd className="bg-slate-700 px-2 py-1 rounded text-xs">Ctrl+M</kbd> to toggle mod menu</p>
                <Button onClick={saveMods} variant="outline" size="sm">
                  Save Settings
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
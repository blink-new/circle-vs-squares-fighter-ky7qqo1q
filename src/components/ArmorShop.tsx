import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { armorPieces, armorSlots, rarityColors, rarityGlow, type ArmorPiece } from '../data/armor'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Coins, 
  Shield, 
  ArrowLeft, 
  ShoppingCart, 
  Zap, 
  Star,
  Activity,
  Eye,
  Heart,
  Sword,
  Target
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ArmorShopProps {
  onBack: () => void
}

const slotIcons = {
  helmet: '🪖',
  chest: '🦺',
  legs: '👖',
  boots: '🥾',
  gloves: '🧤',
  shield: '🛡️'
}

const slotNames = {
  helmet: 'Helmet',
  chest: 'Chest Armor',
  legs: 'Leg Armor',
  boots: 'Boots',
  gloves: 'Gloves',
  shield: 'Shield'
}

export default function ArmorShop({ onBack }: ArmorShopProps) {
  const { gameState, buyArmor, equipArmor } = useGame()
  const [selectedSlot, setSelectedSlot] = useState<string>('helmet')
  const [selectedArmor, setSelectedArmor] = useState<ArmorPiece | null>(null)

  const filteredArmor = armorPieces.filter(armor => armor.slot === selectedSlot)
  const ownedArmor = gameState.player.ownedArmor
  const equippedArmor = gameState.player.armor

  const handleBuyArmor = (armor: ArmorPiece) => {
    if (ownedArmor.includes(armor.id)) {
      toast.error('You already own this armor!')
      return
    }
    
    if (buyArmor(armor.id, armor.cost)) {
      toast.success(`Purchased ${armor.name}!`)
    } else {
      toast.error('Not enough coins!')
    }
  }

  const handleEquipArmor = (armor: ArmorPiece) => {
    if (equipArmor(armor.id, armor.slot)) {
      toast.success(`Equipped ${armor.name}!`)
    } else {
      toast.error('Cannot equip this armor!')
    }
  }

  const handleUnequipArmor = (slot: string) => {
    if (equipArmor('', slot)) {
      toast.success('Armor unequipped!')
    }
  }

  const getTotalStats = () => {
    const totalStats = {
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
        const armor = armorPieces.find(a => a.id === armorId)
        if (armor) {
          totalStats.health += armor.stats.health
          totalStats.armor += armor.stats.armor
          totalStats.speed += armor.stats.speed
          totalStats.damage += armor.stats.damage
          totalStats.critChance += armor.stats.critChance
          totalStats.dodgeChance += armor.stats.dodgeChance
          totalStats.regenRate += armor.stats.regenRate
        }
      }
    })

    return totalStats
  }

  const totalStats = getTotalStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="absolute left-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              🛡️ ARMOR SHOP 🛡️
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 text-2xl mb-4">
            <Coins className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{gameState.player.coins.toLocaleString()}</span>
            <span className="text-purple-300">coins</span>
          </div>
          <p className="text-purple-300">Equip armor to enhance your combat abilities!</p>
        </motion.div>

        {/* Current Equipment & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Equipped Armor */}
          <Card className="bg-slate-800/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Equipped Armor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {armorSlots.map(slot => {
                  const equippedId = equippedArmor[slot as keyof typeof equippedArmor]
                  const equippedPiece = equippedId ? armorPieces.find(a => a.id === equippedId) : null
                  
                  return (
                    <div key={slot} className="text-center">
                      <div className="text-2xl mb-1">{slotIcons[slot as keyof typeof slotIcons]}</div>
                      <div className="text-xs text-gray-400 mb-2">{slotNames[slot as keyof typeof slotNames]}</div>
                      {equippedPiece ? (
                        <div>
                          <div 
                            className="text-sm font-bold mb-1"
                            style={{ color: rarityColors[equippedPiece.rarity] }}
                          >
                            {equippedPiece.name}
                          </div>
                          <Button
                            onClick={() => handleUnequipArmor(slot)}
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            Unequip
                          </Button>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500">None</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Total Stats */}
          <Card className="bg-slate-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Total Bonuses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">Health</span>
                  </div>
                  <span className="text-white font-bold">+{totalStats.health}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">Armor</span>
                  </div>
                  <span className="text-white font-bold">+{totalStats.armor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400">Speed</span>
                  </div>
                  <span className={`font-bold ${totalStats.speed >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalStats.speed >= 0 ? '+' : ''}{totalStats.speed}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sword className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-400">Damage</span>
                  </div>
                  <span className="text-white font-bold">+{totalStats.damage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400">Crit</span>
                  </div>
                  <span className="text-white font-bold">+{totalStats.critChance}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400">Dodge</span>
                  </div>
                  <span className="text-white font-bold">+{totalStats.dodgeChance}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Regen</span>
                  </div>
                  <span className="text-white font-bold">+{totalStats.regenRate}/s</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Armor Preview */}
          <Card className="bg-slate-800/50 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Armor Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedArmor ? (
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold mb-2"
                    style={{ color: rarityColors[selectedArmor.rarity] }}
                  >
                    {selectedArmor.name}
                  </div>
                  <Badge 
                    className="mb-4"
                    style={{ 
                      backgroundColor: rarityColors[selectedArmor.rarity],
                      color: 'white'
                    }}
                  >
                    {selectedArmor.rarity.toUpperCase()}
                  </Badge>
                  <div className="text-sm text-gray-300 mb-4">
                    {selectedArmor.description}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(selectedArmor.stats).map(([stat, value]) => (
                      value !== 0 && (
                        <div key={stat} className="flex justify-between">
                          <span className="capitalize">{stat}:</span>
                          <span className={value > 0 ? 'text-green-400' : 'text-red-400'}>
                            {value > 0 ? '+' : ''}{value}{stat.includes('Chance') || stat.includes('Rate') ? (stat.includes('Rate') ? '/s' : '%') : ''}
                          </span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Select an armor piece to preview
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Armor Shop */}
        <Tabs value={selectedSlot} onValueChange={setSelectedSlot} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            {armorSlots.map(slot => (
              <TabsTrigger key={slot} value={slot} className="flex items-center gap-2">
                <span className="text-lg">{slotIcons[slot as keyof typeof slotIcons]}</span>
                <span className="hidden sm:inline">{slotNames[slot as keyof typeof slotNames]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {armorSlots.map(slot => (
            <TabsContent key={slot} value={slot}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredArmor
                  .sort((a, b) => {
                    // Sort by rarity, then by cost
                    const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary']
                    const rarityDiff = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
                    return rarityDiff !== 0 ? rarityDiff : a.cost - b.cost
                  })
                  .map(armor => {
                    const owned = ownedArmor.includes(armor.id)
                    const equipped = equippedArmor[armor.slot as keyof typeof equippedArmor] === armor.id
                    const canAfford = gameState.player.coins >= armor.cost
                    
                    return (
                      <motion.div
                        key={armor.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        onMouseEnter={() => setSelectedArmor(armor)}
                        onMouseLeave={() => setSelectedArmor(null)}
                      >
                        <Card className={`relative overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
                          equipped ? 'ring-2 ring-purple-500' : ''
                        } ${owned ? 'bg-green-900/20' : ''} ${
                          rarityGlow[armor.rarity] ? 'shadow-lg' : ''
                        }`}
                        style={{
                          borderColor: rarityColors[armor.rarity] + '80',
                          boxShadow: rarityGlow[armor.rarity] ? `0 0 20px ${rarityColors[armor.rarity]}40` : undefined
                        }}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <CardTitle 
                                className="text-lg"
                                style={{ color: rarityColors[armor.rarity] }}
                              >
                                {armor.name}
                              </CardTitle>
                              <div className="flex flex-col gap-1">
                                {equipped && <Badge className="bg-purple-600 text-xs">Equipped</Badge>}
                                {owned && !equipped && <Badge variant="secondary" className="text-xs">Owned</Badge>}
                                <Badge 
                                  className="text-xs"
                                  style={{ 
                                    backgroundColor: rarityColors[armor.rarity],
                                    color: 'white'
                                  }}
                                >
                                  {armor.rarity.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                            <CardDescription className="text-xs">{armor.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-1 text-xs">
                              {Object.entries(armor.stats).map(([stat, value]) => (
                                value !== 0 && (
                                  <div key={stat} className="flex justify-between">
                                    <span className="capitalize text-gray-400">{stat}:</span>
                                    <span className={`font-bold ${value > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                      {value > 0 ? '+' : ''}{value}{stat.includes('Chance') || stat.includes('Rate') ? (stat.includes('Rate') ? '/s' : '%') : ''}
                                    </span>
                                  </div>
                                )
                              ))}
                            </div>

                            {/* Requirements */}
                            {armor.requirements && (
                              <div className="text-xs text-orange-400">
                                {armor.requirements.wave && `Requires Wave ${armor.requirements.wave}`}
                                {armor.requirements.kills && `Requires ${armor.requirements.kills} kills`}
                                {armor.requirements.level && `Requires Level ${armor.requirements.level}`}
                              </div>
                            )}

                            {/* Price and actions */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-yellow-400 font-bold">
                                <Coins className="w-4 h-4" />
                                <span className="text-sm">{armor.cost.toLocaleString()}</span>
                              </div>
                              {owned ? (
                                <Button
                                  onClick={() => handleEquipArmor(armor)}
                                  disabled={equipped}
                                  size="sm"
                                  className="bg-purple-600 hover:bg-purple-700 text-xs"
                                >
                                  {equipped ? 'Equipped' : 'Equip'}
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleBuyArmor(armor)}
                                  disabled={!canAfford}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-xs"
                                >
                                  <ShoppingCart className="w-3 h-3 mr-1" />
                                  Buy
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
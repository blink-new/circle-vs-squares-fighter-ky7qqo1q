import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { weapons, allies, weaponCategories } from '../data/weapons'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Coins, Sword, Users, Star, ShoppingCart, ArrowRight, TrendingUp, Shield as ShieldIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ShopProps {
  onContinue: () => void
  onOpenCosmetics?: () => void
  onOpenTacUpgrades?: () => void
  onOpenArmor?: () => void
}

export default function Shop({ onContinue, onOpenCosmetics, onOpenTacUpgrades, onOpenArmor }: ShopProps) {
  const { gameState, buyWeapon, buyAlly, updatePlayer } = useGame()
  const [selectedCategory, setSelectedCategory] = useState('Handguns')
  const [specialAlliesVisible] = useState(Math.random() < 0.3) // 30% chance for special allies

  const filteredWeapons = weapons.filter(weapon => weapon.category === selectedCategory)
  const ownedWeapons = gameState.player.weapons

  const handleBuyWeapon = (weapon: typeof weapons[0]) => {
    if (ownedWeapons.some(w => w.name === weapon.name)) {
      toast.error('You already own this weapon!')
      return
    }
    
    if (buyWeapon(weapon.name, weapon.cost)) {
      toast.success(`Purchased ${weapon.name}!`)
    } else {
      toast.error('Not enough coins!')
    }
  }

  const handleEquipWeapon = (weaponName: string) => {
    const weapons = [...gameState.player.weapons]
    const idx = weapons.findIndex(w => w.name === weaponName)
    if (idx === -1) return
    // If already primary, do nothing
    if (gameState.player.currentWeapon === weaponName) return
    // Swap primary and secondary
    if (weapons.length === 2) {
      const temp = weapons[0]
      weapons[0] = weapons[1]
      weapons[1] = temp
    }
    updatePlayer({
      weapons,
      currentWeapon: weapons[0].name,
      secondaryWeapon: weapons[1] ? weapons[1].name : null
    })
    toast.success(`Equipped ${weaponName}!`)
  }

  const handleBuyAlly = (ally: typeof allies[0]) => {
    if (gameState.player.allies.includes(ally.name)) {
      toast.error('You already recruited this ally!')
      return
    }
    
    if (buyAlly(ally.name, ally.cost)) {
      toast.success(`Purchased ${ally.name}!`)
    } else {
      toast.error('Not enough coins!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            WEAPON SHOP
          </h1>
          <div className="flex items-center justify-center gap-4 text-2xl">
            <Coins className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{gameState.player.coins.toLocaleString()}</span>
            <span className="text-purple-300">coins</span>
          </div>
          <p className="text-purple-300 mt-2">Wave {gameState.wave} Complete - Upgrade Your Arsenal!</p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="weapons" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="weapons" className="flex items-center gap-2">
              <Sword className="w-5 h-5" />
              Weapons
            </TabsTrigger>
            <TabsTrigger value="allies" className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Allies
            </TabsTrigger>
            <TabsTrigger value="armor" className="flex items-center gap-2">
              <ShieldIcon className="w-5 h-5" />
              Armor
            </TabsTrigger>
            <TabsTrigger value="cosmetics" className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Cosmetics
            </TabsTrigger>
            <TabsTrigger value="tac" className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              TAC-BAR
            </TabsTrigger>
          </TabsList>

          {/* Weapons Tab */}
          <TabsContent value="weapons" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {weaponCategories.map(category => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Weapons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWeapons.map(weapon => {
                const ownedWeapon = ownedWeapons.find(w => w.name === weapon.name)
                const owned = !!ownedWeapon
                const equipped = gameState.player.currentWeapon === weapon.name
                const canAfford = gameState.player.coins >= weapon.cost
                const durability = ownedWeapon ? ownedWeapon.durability : null
                return (
                  <motion.div
                    key={weapon.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`relative overflow-hidden transition-all hover:shadow-lg ${
                      equipped ? 'ring-2 ring-purple-500' : ''
                    } ${owned ? 'bg-green-900/20' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{weapon.name}</CardTitle>
                          {equipped && <Badge className="bg-purple-600">Equipped</Badge>}
                          {owned && !equipped && <Badge variant="secondary">Owned</Badge>}
                        </div>
                        <CardDescription>{weapon.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Durability bar */}
                        {owned && (
                          <div className="mb-2">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-gray-400">Durability:</span>
                              {durability === 0 ? (
                                <span className="text-red-500 font-bold">Broken</span>
                              ) : (
                                <span className="text-green-400 font-bold">{durability}/100</span>
                              )}
                            </div>
                            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                              <div
                                className={`h-full rounded-full ${durability === 0 ? 'bg-red-500' : 'bg-green-400'}`}
                                style={{ width: `${Math.max(0, durability ?? 0)}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-red-400">Damage:</span> {weapon.damage}
                          </div>
                          <div>
                            <span className="text-blue-400">Fire Rate:</span> {weapon.fireRate}
                          </div>
                          <div>
                            <span className="text-green-400">Range:</span> {weapon.range}
                          </div>
                          {weapon.ammo && (
                            <div>
                              <span className="text-yellow-400">Ammo:</span> {weapon.ammo}
                            </div>
                          )}
                        </div>

                        {/* Special badges */}
                        <div className="flex gap-2 flex-wrap">
                          {weapon.isAutomatic && <Badge variant="destructive">Auto</Badge>}
                          {weapon.isMelee && <Badge variant="outline">Melee</Badge>}
                          {weapon.cost === 0 && <Badge className="bg-green-600">Free</Badge>}
                        </div>

                        {/* Price and actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-yellow-400 font-bold">
                            <Coins className="w-4 h-4" />
                            {weapon.cost.toLocaleString()}
                          </div>
                          {owned ? (
                            <Button
                              onClick={() => handleEquipWeapon(weapon.name)}
                              disabled={equipped || durability === 0}
                              size="sm"
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              {durability === 0 ? 'Broken' : equipped ? 'Equipped' : 'Equip'}
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleBuyWeapon(weapon)}
                              disabled={!canAfford}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600"
                            >
                              <ShoppingCart className="w-4 h-4 mr-1" />
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

          {/* Allies Tab */}
          <TabsContent value="allies" className="space-y-6">
            {/* Regular Allies */}
            <div>
              <h3 className="text-2xl font-bold text-purple-300 mb-4">Regular Allies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allies.filter(ally => !ally.special).map(ally => {
                  const owned = gameState.player.allies.includes(ally.name)
                  const canAfford = gameState.player.coins >= ally.cost
                  
                  return (
                    <motion.div
                      key={ally.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className={`relative overflow-hidden transition-all hover:shadow-lg ${
                        owned ? 'bg-green-900/20' : ''
                      }`}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{ally.name}</CardTitle>
                            {owned && <Badge variant="secondary">Recruited</Badge>}
                          </div>
                          <CardDescription>{ally.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-red-400">Health:</span> {ally.health}
                            </div>
                            <div>
                              <span className="text-blue-400">Damage:</span> {ally.damage}
                            </div>
                          </div>

                          {/* Price and actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-yellow-400 font-bold">
                              <Coins className="w-4 h-4" />
                              {ally.cost.toLocaleString()}
                            </div>
                            {owned ? (
                              <Badge className="bg-green-600">Recruited</Badge>
                            ) : (
                              <Button
                                onClick={() => handleBuyAlly(ally)}
                                disabled={!canAfford}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
                              >
                                <Users className="w-4 h-4 mr-1" />
                                Recruit
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Special Allies */}
            {specialAlliesVisible && (
              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  Special Allies - Limited Time!
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allies.filter(ally => ally.special).map(ally => {
                    const owned = gameState.player.allies.includes(ally.name)
                    const canAfford = gameState.player.coins >= ally.cost
                    
                    return (
                      <motion.div
                        key={ally.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className={`relative overflow-hidden transition-all hover:shadow-lg border-2 border-red-500/50 ${
                          owned ? 'bg-green-900/20' : 'bg-red-900/20'
                        }`}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg text-red-400">{ally.name}</CardTitle>
                              {owned && <Badge variant="secondary">Recruited</Badge>}
                            </div>
                            <CardDescription>{ally.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-red-400">Health:</span> {ally.health}
                              </div>
                              <div>
                                <span className="text-blue-400">Damage:</span> {ally.damage}
                              </div>
                            </div>

                            <Badge className="bg-red-600 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              LEGENDARY
                            </Badge>

                            {/* Price and actions */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-yellow-400 font-bold">
                                <Coins className="w-4 h-4" />
                                {ally.cost.toLocaleString()}
                              </div>
                              {owned ? (
                                <Badge className="bg-green-600">Recruited</Badge>
                              ) : (
                                <Button
                                  onClick={() => handleBuyAlly(ally)}
                                  disabled={!canAfford}
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600"
                                >
                                  <Users className="w-4 h-4 mr-1" />
                                  Recruit
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Armor Tab */}
          <TabsContent value="armor" className="space-y-6">
            <div className="text-center py-12">
              <ShieldIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-300 mb-2">Armor Shop</h3>
              <p className="text-gray-400 mb-6">Equip powerful armor to enhance your combat abilities!</p>
              <div className="grid grid-cols-6 gap-4 max-w-md mx-auto mb-6">
                <div className="text-center">
                  <div className="text-2xl mb-1">🪖</div>
                  <div className="text-xs text-gray-400">Helmet</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🦺</div>
                  <div className="text-xs text-gray-400">Chest</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">👖</div>
                  <div className="text-xs text-gray-400">Legs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🥾</div>
                  <div className="text-xs text-gray-400">Boots</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🧤</div>
                  <div className="text-xs text-gray-400">Gloves</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🛡️</div>
                  <div className="text-xs text-gray-400">Shield</div>
                </div>
              </div>
              <Button
                onClick={onOpenArmor}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Open Armor Shop
              </Button>
            </div>
          </TabsContent>

          {/* Cosmetics Tab */}
          <TabsContent value="cosmetics" className="space-y-6">
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-purple-300 mb-2">Cosmetic Shop</h3>
              <p className="text-gray-400 mb-6">Customize your appearance with skins, trails, and more!</p>
              <Button
                onClick={onOpenCosmetics}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Open Cosmetic Shop
              </Button>
            </div>
          </TabsContent>

          {/* TAC-BAR Tab */}
          <TabsContent value="tac" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-cyan-300 mb-2">TAC-BAR Upgrades</h3>
              <p className="text-gray-400 mb-6">Enhance your combat abilities with stat upgrades!</p>
              <div className="grid grid-cols-5 gap-4 max-w-md mx-auto mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-cyan-400">{gameState.player.tac}</div>
                  <div className="text-xs text-gray-400">TAC</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">{gameState.player.dex}</div>
                  <div className="text-xs text-gray-400">DEX</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-400">{gameState.player.str}</div>
                  <div className="text-xs text-gray-400">STR</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-400">{gameState.player.awr}</div>
                  <div className="text-xs text-gray-400">AWR</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400">{gameState.player.end}</div>
                  <div className="text-xs text-gray-400">END</div>
                </div>
              </div>
              <Button
                onClick={onOpenTacUpgrades}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                Open TAC-BAR Upgrades
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <Button
            onClick={onContinue}
            size="lg"
            className="px-8 py-6 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Continue to Next Wave
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { cosmetics, rarityColors } from '../data/cosmetics'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Coins, Palette, Sparkles, Star, ShoppingCart } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface CosmeticShopProps {
  onBack: () => void
}

export default function CosmeticShop({ onBack }: CosmeticShopProps) {
  const { gameState, updatePlayer } = useGame()
  const [selectedCategory, setSelectedCategory] = useState<string>('skin')

  const filteredCosmetics = cosmetics.filter(cosmetic => cosmetic.category === selectedCategory)

  const buyCosmeticItem = (cosmetic: typeof cosmetics[0]) => {
    if (gameState.player.coins >= cosmetic.cost) {
      // Check if already owned
      const currentCosmetic = gameState.player.cosmetics[cosmetic.category as keyof typeof gameState.player.cosmetics]
      if (currentCosmetic === cosmetic.id) {
        toast.error('You already own this cosmetic!')
        return
      }

      // Purchase and equip
      updatePlayer({
        coins: gameState.player.coins - cosmetic.cost,
        cosmetics: {
          ...gameState.player.cosmetics,
          [cosmetic.category]: cosmetic.id
        }
      })
      toast.success(`Purchased and equipped ${cosmetic.name}!`)
    } else {
      toast.error('Not enough coins!')
    }
  }

  const equipCosmetic = (cosmetic: typeof cosmetics[0]) => {
    updatePlayer({
      cosmetics: {
        ...gameState.player.cosmetics,
        [cosmetic.category]: cosmetic.id
      }
    })
    toast.success(`Equipped ${cosmetic.name}!`)
  }

  const isOwned = (cosmetic: typeof cosmetics[0]) => {
    return gameState.player.cosmetics[cosmetic.category as keyof typeof gameState.player.cosmetics] === cosmetic.id
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
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
            COSMETIC SHOP
          </h1>
          <div className="flex items-center justify-center gap-4 text-2xl">
            <Coins className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{gameState.player.coins.toLocaleString()}</span>
            <span className="text-purple-300">coins</span>
          </div>
          <p className="text-purple-300 mt-2">Customize Your Warrior - Look Good, Fight Better!</p>
        </motion.div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="skin" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Skins
            </TabsTrigger>
            <TabsTrigger value="trail" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Trails
            </TabsTrigger>
            <TabsTrigger value="weapon_skin" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Weapon Skins
            </TabsTrigger>
            <TabsTrigger value="emote" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Emotes
            </TabsTrigger>
          </TabsList>

          {/* Cosmetics Grid */}
          <TabsContent value={selectedCategory} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCosmetics.map(cosmetic => {
                const owned = isOwned(cosmetic)
                const equipped = owned
                const canAfford = gameState.player.coins >= cosmetic.cost
                const rarityColor = rarityColors[cosmetic.rarity]
                
                return (
                  <motion.div
                    key={cosmetic.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`relative overflow-hidden transition-all hover:shadow-lg border-2 ${
                      equipped ? 'ring-2 ring-purple-500 border-purple-500' : ''
                    }`} style={{ borderColor: rarityColor }}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{cosmetic.name}</CardTitle>
                          {equipped && <Badge className="bg-purple-600">Equipped</Badge>}
                        </div>
                        <CardDescription>{cosmetic.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Preview */}
                        {cosmetic.previewColor && (
                          <div className="flex justify-center">
                            <div 
                              className="w-16 h-16 rounded-full border-2 border-gray-600 flex items-center justify-center"
                              style={{ backgroundColor: cosmetic.previewColor }}
                            >
                              {cosmetic.category === 'skin' && (
                                <div className="w-12 h-12 rounded-full" style={{ backgroundColor: cosmetic.previewColor }} />
                              )}
                              {cosmetic.category === 'trail' && (
                                <div className="w-2 h-12 rounded-full opacity-60" style={{ backgroundColor: cosmetic.previewColor }} />
                              )}
                              {cosmetic.category === 'weapon_skin' && (
                                <div className="w-10 h-3 rounded-sm" style={{ backgroundColor: cosmetic.previewColor }} />
                              )}
                              {cosmetic.category === 'emote' && (
                                <Sparkles className="w-8 h-8" style={{ color: cosmetic.previewColor || '#8B5CF6' }} />
                              )}
                            </div>
                          </div>
                        )}

                        {/* Rarity Badge */}
                        <div className="flex justify-center">
                          <Badge 
                            className="capitalize font-bold text-white border-2"
                            style={{ backgroundColor: rarityColor, borderColor: rarityColor }}
                          >
                            {cosmetic.rarity}
                          </Badge>
                        </div>

                        {/* Special Effects */}
                        {cosmetic.effect && (
                          <div className="text-center">
                            <Badge variant="outline" className="text-xs">
                              Special Effect: {cosmetic.effect}
                            </Badge>
                          </div>
                        )}

                        {/* Price and actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-yellow-400 font-bold">
                            <Coins className="w-4 h-4" />
                            {cosmetic.cost === 0 ? 'Free' : cosmetic.cost.toLocaleString()}
                          </div>
                          {equipped ? (
                            <Badge className="bg-green-600">Equipped</Badge>
                          ) : cosmetic.cost === 0 ? (
                            <Button
                              onClick={() => equipCosmetic(cosmetic)}
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Equip
                            </Button>
                          ) : (
                            <Button
                              onClick={() => buyCosmeticItem(cosmetic)}
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
        </Tabs>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
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
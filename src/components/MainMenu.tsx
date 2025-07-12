import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Sword, Shield, Zap, Star, Settings } from 'lucide-react'
import Shop from './Shop'
import { useState } from 'react'

interface MainMenuProps {
  onStartGame: () => void
  onOpenModMenu?: () => void
}

export default function MainMenu({ onStartGame, onOpenModMenu }: MainMenuProps) {
  const [showShop, setShowShop] = useState(false)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {showShop ? (
        <Shop onContinue={() => setShowShop(false)} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Game Title */}
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="relative">
              <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                CIRCLE
              </h1>
              <div className="flex items-center justify-center gap-4 text-4xl font-bold text-white">
                <span>VS</span>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-red-500 rotate-45"></div>
                  <div className="w-8 h-8 bg-red-500 rotate-45"></div>
                  <div className="w-8 h-8 bg-red-500 rotate-45"></div>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-purple-300">SQUARES</h2>
            </div>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Survive endless waves of square enemies in this intense 2D fighter. 
              Collect coins, upgrade your arsenal, and become the ultimate circle warrior!
            </p>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-8 text-purple-300"
          >
            <div className="text-center">
              <Sword className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">60+ Weapons</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Block & Defend</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Power Allies</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Endless Waves</p>
            </div>
          </motion.div>

          {/* Game Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30"
          >
            <div className="relative w-96 h-48 mx-auto bg-slate-900 rounded-lg overflow-hidden">
              {/* Preview Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                />
              </div>
              
              {/* Enemy squares */}
              <motion.div
                animate={{ x: [0, 300, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 left-4 w-6 h-6 bg-red-500 rotate-45"
              />
              <motion.div
                animate={{ x: [380, 80, 380] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-4 right-4 w-6 h-6 bg-red-500 rotate-45"
              />
              
              {/* Particles */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              onClick={onStartGame}
              size="lg"
              className="px-12 py-6 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40"
            >
              START BATTLE
            </Button>
            <div className="flex gap-4">
              <Button
                onClick={() => setShowShop(true)}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-xl font-bold border-2 border-purple-400 text-purple-200 hover:bg-purple-900/30 hover:text-white transition-all duration-300"
              >
                OPEN SHOP
              </Button>
              <Button
                onClick={onOpenModMenu}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-xl font-bold border-2 border-green-400 text-green-200 hover:bg-green-900/30 hover:text-white transition-all duration-300"
              >
                <Settings className="w-5 h-5 mr-2" />
                MOD MENU
              </Button>
            </div>
          </motion.div>

          {/* Controls hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-sm text-purple-300 space-y-2"
          >
            <p>WASD - Move • Mouse - Aim & Shoot • Space - Block with Sword</p>
            <p>R - Reload • E - Open Shop (between waves)</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
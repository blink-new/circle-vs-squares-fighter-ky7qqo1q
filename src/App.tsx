import { useState, useEffect } from 'react'
import GameArena from './components/GameArena'
import MainMenu from './components/MainMenu'
import Shop from './components/Shop'
import CosmeticShop from './components/CosmeticShop'
import TacUpgrades from './components/TacUpgrades'
import ArmorShop from './components/ArmorShop'
import GameHUD from './components/GameHUD'
import ModMenu from './components/ModMenu'
import { GameProvider } from './context/GameContext'
import { motion } from 'framer-motion'

function App() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'shop' | 'cosmetics' | 'tac-upgrades' | 'armor' | 'gameOver'>('menu')
  const [modMenuOpen, setModMenuOpen] = useState(false)
  
  // Keyboard shortcut for mod menu (Ctrl+M)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault()
        setModMenuOpen(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {gameState === 'menu' && (
            <MainMenu onStartGame={() => setGameState('playing')} onOpenModMenu={() => setModMenuOpen(true)} />
          )}
          
          {gameState === 'playing' && (
            <div className="relative">
              <GameHUD />
              <GameArena onGameOver={() => setGameState('gameOver')} onOpenShop={() => setGameState('shop')} />
            </div>
          )}
          
          {gameState === 'shop' && (
            <Shop 
              onContinue={() => setGameState('playing')} 
              onOpenCosmetics={() => setGameState('cosmetics')}
              onOpenTacUpgrades={() => setGameState('tac-upgrades')}
              onOpenArmor={() => setGameState('armor')}
            />
          )}
          
          {gameState === 'cosmetics' && (
            <CosmeticShop onBack={() => setGameState('shop')} />
          )}
          
          {gameState === 'tac-upgrades' && (
            <TacUpgrades onBack={() => setGameState('shop')} />
          )}
          
          {gameState === 'armor' && (
            <ArmorShop onBack={() => setGameState('shop')} />
          )}
          
          {gameState === 'gameOver' && (
            <div className="flex items-center justify-center min-h-screen">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center text-white"
              >
                <h1 className="text-6xl font-bold mb-4 text-red-400">GAME OVER</h1>
                <button
                  onClick={() => setGameState('menu')}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
                >
                  Return to Menu
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
        
        {/* Mod Menu - Available in all states */}
        <ModMenu isOpen={modMenuOpen} onClose={() => setModMenuOpen(false)} />
      </div>
    </GameProvider>
  )
}

export default App
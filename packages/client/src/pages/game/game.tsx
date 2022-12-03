import React, { useEffect, useRef } from 'react'
import View from '@/game/classesGame/View/View'
import GameTank from '@/game/classesGame/Game/Game'
import Sprite from '@/game/classesGame/Sprite/Sprite'
import spritePNG from '@/game/spriteGame/sprite_1.png'
import styles from './game.module.scss'
import Input from '@/game/classesGame/Input/Input'
import { levels } from '@/game/helpersGame/levels'

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const sprite: Sprite = new Sprite(spritePNG)
      const game = new GameTank({
        input: new Input(),
        view: new View(canvas, sprite),
        levels
      })
      game.init().then(() => game.start())
    }
  }, [])

  return (
    <section className={styles['canvas']}>
      <canvas ref={canvasRef} width='640' height='640' className={styles['canvas__game']}></canvas>
    </section>
  )
}

export default Game

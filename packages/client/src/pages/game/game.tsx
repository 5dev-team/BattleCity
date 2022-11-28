import React, {useEffect, useRef} from 'react';
import World from "../../game/classesGame/World";
import View from "../../game/classesGame/View";
import GameTank from "../../game/classesGame/Game";
import {levels} from "../../game/helpersGame/levels";
import spriteMap from "../../game/helpersGame/sprite.map";
import Sprite from "../../game/classesGame/Sprite";
import spritePNG from '../../game/spriteGame/sprite_1.png'
import { ISprite } from '../../game/classesGame/types/types'

import styles from './game.module.scss'

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const sprite: ISprite = new Sprite(spritePNG, spriteMap);
      const game =  new GameTank({
        world: new World(),
        view: new View(canvas, sprite),
        levels,
      });
      game.init().then(() =>  game.start());
    }

  },[])

  return (
    <section className={styles['canvas']}>
      <canvas ref={canvasRef} width='640' height='640' className={styles['canvas__game']}></canvas>
    </section>
  )
}

export default Game

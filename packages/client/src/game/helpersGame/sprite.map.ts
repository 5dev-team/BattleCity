import { IObjectDefaultSprite } from '../classesGame/types/types'



const spriteMap: IObjectDefaultSprite = {
    0: [22 * 48, 0, 48, 48], // empty
    1: [16 * 48, 0, 48, 48], // full wall
    2: [17 * 48, 0, 48, 48], // right wall
    3: [18 * 48, 0, 48, 48], // bottom wall
    4: [19 * 48, 0, 48, 48], // left wall
    5: [20 * 48, 0, 48, 48], // top wall
    10: [20 * 48, 48, 48, 48],

    // Player1Tank
    11: [48, 0, 48, 48], // top
    12: [48, 0, 48, 48],
    13: [6 * 48, 0, 48, 48], // right
    14: [7 * 48, 0, 48, 48],
    15: [4 * 48, 0, 48, 48], // bottom
    16: [5 * 48, 0, 48, 48],
    17: [2 * 48, 0, 48, 48], // left
    18: [3 * 48, 0, 48, 48],
}
export default spriteMap;

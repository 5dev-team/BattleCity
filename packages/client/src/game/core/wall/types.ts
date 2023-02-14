import { GameObjectArgs } from '@/game/core/types'

export type WallArgs = {type: undefined | string} & Pick<GameObjectArgs, 'pos' | 'sprites'>

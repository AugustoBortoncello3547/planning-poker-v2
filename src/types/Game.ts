import { GameStatusEnum } from '../enums/GameStatus'
import { IPlayer } from './Player'

export interface IGame {
  key: string
  name: string
  status: GameStatusEnum
  players: {
    [key: string]: IPlayer
  }
}

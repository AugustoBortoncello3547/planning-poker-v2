import { GameStatusEnum } from '../enums/GameStatus'
import { IPlayer } from './Player'

export interface IGame {
  key: string
  name: string
  hashSenha: string
  status: GameStatusEnum
  players: {
    [key: string]: IPlayer
  }
}

import { IPlayer } from './Player'

export interface IGame {
  name: string
  players: {
    [key: string]: IPlayer
  }
}

import { IGame } from '../types/Game'
import { IPlayer } from '../types/Player'

export function parseGamePlayers(
  game: IGame,
  currentPlayer?: IPlayer
): IPlayer[] {
  // Add current player to the object, if not exist
  if (!game?.players) game.players = {}
  if (currentPlayer) game.players[currentPlayer?.key] = currentPlayer

  const players: IPlayer[] = []
  Object.keys(game?.players).forEach((key) => {
    players.push(game?.players?.[key])
  })
  return players
}

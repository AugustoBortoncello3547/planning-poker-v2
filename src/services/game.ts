import { GAME_KEY, PLAYER_KEY, db } from '../providers/firebase'

import {
  ref,
  push,
  child,
  set,
  get,
  onValue,
  DataSnapshot,
  remove,
} from 'firebase/database'
import { IGame } from '../types/Game'
import { IPlayer } from '../types/Player'
import { GameStatusEnum } from '../enums/GameStatus'

export async function getGame(gameId: string): Promise<IGame | null> {
  const game = await get(ref(db, `${GAME_KEY}/${gameId}`))
  return game?.val()
}

export async function createGame(name: string): Promise<string | null> {
  const newGameKey = push(child(ref(db), GAME_KEY)).key
  if (!newGameKey) return null

  const data: IGame = {
    key: newGameKey,
    name,
    status: GameStatusEnum.IDLE,
    players: {},
  }
  await set(ref(db, `${GAME_KEY}/${newGameKey}`), data)

  return newGameKey
}

export async function addPlayerToGame(gameId: string, player: IPlayer) {
  await set(
    ref(db, `${GAME_KEY}/${gameId}/${PLAYER_KEY}/${player.key}`),
    player
  )
}

export async function removePlayerFromGame(gameId: string, player: IPlayer) {
  await remove(ref(db, `${GAME_KEY}/${gameId}/${PLAYER_KEY}/${player.key}`))
}

export async function startListenGameChanges(
  gameId: string,
  callback: (snapshot: DataSnapshot) => unknown
) {
  onValue(ref(db, `${GAME_KEY}/${gameId}`), callback)
}

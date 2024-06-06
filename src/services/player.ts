import { GAME_KEY, PLAYER_KEY, db } from '../providers/firebase'

import { ref, push, child, set } from 'firebase/database'
import { IPlayer } from '../types/Player'

export async function createPlayer(
  gameKey: string,
  name: string
): Promise<IPlayer | null> {
  const data = { name }

  const url = `${GAME_KEY}/${gameKey}/${PLAYER_KEY}`
  const newPlayerKey = push(child(ref(db), url)).key
  await set(ref(db, `${url}/${newPlayerKey}`), data)

  const player: IPlayer = { key: newPlayerKey || '', name }
  return player
}

export async function upsertPlayerVote(
  gameKey: string,
  player: IPlayer
): Promise<void> {
  await set(
    ref(db, `${GAME_KEY}/${gameKey}/${PLAYER_KEY}/${player.key}`),
    player
  )
}

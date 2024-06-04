import { IPlayer } from '../types/Player'

const PLAYER_KEY = 'player'

export function checkHasUsername(): boolean {
  return !!getPlayer()
}

export function setPlayer(player: IPlayer) {
  localStorage.setItem(PLAYER_KEY, JSON.stringify(player))
}

export function getPlayer(): IPlayer | null {
  try {
    const resp = localStorage.getItem(PLAYER_KEY)
    if (resp) {
      const player: IPlayer = JSON.parse(resp)
      if (player.key && player.name) return player
    }
    return null
  } catch (e) {
    console.error('Erro obtendo usuário', e)
    return null
  }
}

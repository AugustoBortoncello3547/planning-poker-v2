import React from 'react'
import './CardSelector.scss'
import Card from '../Card'

import { FIBONACCI_VOTING_SYSTEM } from '../../helpers/vote'
import { upsertPlayerVote } from '../../services/player'

import { CardVariant } from '../../enums/CardVariant'
import { IGame } from '../../types/Game'
import { IPlayer } from '../../types/Player'
import { GameStatusEnum } from '../../enums/GameStatus'
import { setPlayer } from '../../helpers/user'

interface CardSelectorProps {
  game: IGame | null
  player: IPlayer | null
  setCurrentPlayer: (player: IPlayer) => void
}

export default function CardSelector({
  game,
  player,
  setCurrentPlayer,
}: CardSelectorProps) {
  const voteOptions = FIBONACCI_VOTING_SYSTEM

  async function handleSelectCard(value: string) {
    if (value && game?.key && player?.key) {
      if (player?.selectedCard === value) player.selectedCard = ''
      else player.selectedCard = value
      setPlayer(player)
      setCurrentPlayer(player)
      await upsertPlayerVote(game?.key, player)
    }
  }

  const disabled = [GameStatusEnum.SHOWED, GameStatusEnum.SHOW].includes(
    game?.status || GameStatusEnum.IDLE
  )

  return (
    <div className="card-selector-container">
      <ul className="card-selector-list">
        {voteOptions?.map((vote) => (
          <li className="card-selector-list__card-container" key={vote}>
            <Card
              value={vote}
              variant={
                player?.selectedCard === vote
                  ? CardVariant.SELECTED
                  : CardVariant.SHOW
              }
              onClick={handleSelectCard}
              disabled={disabled}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

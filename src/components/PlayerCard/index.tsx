import React from 'react'
import './PlayerCard.scss'

import Card from '../Card'

import { IPlayer } from '../../types/Player'
import { IGame } from '../../types/Game'
import { GameStatusEnum } from '../../enums/GameStatus'
import { CardVariant } from '../../enums/CardVariant'

interface PlayerCardProps {
  game: IGame | null
  player?: IPlayer
}

export default function PlayerCard({ game, player }: PlayerCardProps) {
  if (!player || !game) return null

  return (
    <div className="player-container">
      <Card
        value={
          game.status === GameStatusEnum.SHOWED ? player?.selectedCard : ''
        }
        variant={
          game?.status === GameStatusEnum.IDLE
            ? player?.selectedCard
              ? CardVariant.SELECTED
              : CardVariant.EMPTY
            : game?.status === GameStatusEnum.SHOW
            ? (player.selectedCard !== "" ? CardVariant.SELECTED : CardVariant.EMPTY)
            : (player.selectedCard !== "" ? CardVariant.SHOW : CardVariant.EMPTY)
        }
      />
      <h6 className="player-container__name">{player.name}</h6>
    </div>
  )
}

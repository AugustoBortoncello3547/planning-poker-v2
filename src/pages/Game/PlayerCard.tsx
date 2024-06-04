import React from 'react'
import { IPlayer } from '../../types/Player'

interface PlayerCardProps {
  player?: IPlayer
}

export default function PlayerCard({ player }: PlayerCardProps) {
  if (!player) return null

  return (
    <div className="player-container">
      <div className="player-container__card mb-1">
        <h2 className="player-container__card__selected">4</h2>
      </div>
      <h6 className="player-container__name">{player.name}</h6>
    </div>
  )
}

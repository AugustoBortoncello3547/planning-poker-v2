import React from 'react'
import './PlayerCard.scss'

import { IPlayer } from '../../types/Player'
import Card from '../Card'

interface PlayerCardProps {
  player?: IPlayer
}

export default function PlayerCard({ player }: PlayerCardProps) {
  if (!player) return null

  return (
    <div className="player-container">
      <Card value="4" />
      <h6 className="player-container__name">{player.name}</h6>
    </div>
  )
}

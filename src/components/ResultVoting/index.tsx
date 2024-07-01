import React from 'react'
import { IGame } from '../../types/Game'
import Card from '../Card'
import './ResultVoting.scss'

type TPropsResultVoting = {
  game: IGame
}

interface TResultVotingItem {
  card: string
  count: number
}

function ResultVoting({ game }: TPropsResultVoting) {
  let total = 0
  const result: TResultVotingItem[] = []

  const incrementCardCount = (card: string) => {
    const item = result.find((item) => item.card === card)
    if (item) {
      item.count++
    } else {
      result.push({ card, count: 1 })
    }
  }

  Object.values(game.players).forEach((player) => {
    if (!player.selectedCard) {
      return
    }

    const card = player.selectedCard.toString()
    const numerParsed = Number(player.selectedCard)

    if (!isNaN(numerParsed)) {
      total += numerParsed
    }

    incrementCardCount(card)
  })

  const totalCartasValidas = Object.values(game.players).filter((player) => {
    if (!player.selectedCard){
      return false;
    }

    return !isNaN(Number(player.selectedCard));
  })

  const media = total / totalCartasValidas?.length;
  return (
    <div className="space-result-voting">
      <div className="space-cards">
        <ul className="card-result-list">
          {result.map((item) => (
            <li className="card-result-item" key={item.card}>
              <Card value={item.card} />
              <span className="vote-count">{item.count} {item.count === 1 ? "Voto" : "Votos"}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="average">
        Média: {isNaN(media) ? 0 : media.toFixed(2)}
      </div>
    </div>
  )
  
}

export default ResultVoting

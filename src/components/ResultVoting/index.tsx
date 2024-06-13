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

  // Função auxiliar para encontrar ou criar um item no array de resultados
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

  return (
    <div className="space-result-voting">
      <div className="space-cards">
        <ul className="card-result-list">
          {result.map((item) => (
            <li className="card-selector-list__card-container" key={item.card}>
              <Card value={item.card}></Card>
              Count: {item.count}
            </li>
          ))}
        </ul>
      </div>
      <div className="average">
        Average: {total / Object.values(game.players).length}
      </div>
    </div>
  )
}

export default ResultVoting

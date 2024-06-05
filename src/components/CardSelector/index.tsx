import React from 'react'
import './CardSelector.scss'
import { FIBONACCI_VOTING_SYSTEM } from '../../helpers/vote'
import Card from '../Card'
import { CardVariant } from '../../enums/CardVariant'

// interface CardSelectorProps {}

export default function CardSelector() {
  const voteOptions = FIBONACCI_VOTING_SYSTEM

  return (
    <div className="card-selector-container">
      <ul className="card-selector-list">
        {voteOptions?.map((vote) => (
          <li className="card-selector-list__card-container" key={vote}>
            <Card value={vote} variant={CardVariant.SHOW} />
          </li>
        ))}
      </ul>
    </div>
  )
}

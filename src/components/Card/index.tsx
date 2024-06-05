import React from 'react'
import './Card.scss'
import { CardVariant } from '../../enums/CardVariant'

interface CardProps {
  value: string | number
  variant?: CardVariant
}

export default function Card({
  value,
  variant = CardVariant.EMPTY,
}: CardProps) {
  return (
    <div className={`card-container ${variant?.toLowerCase()} mb-1`}>
      <h2 className="card-container__text">{value}</h2>
    </div>
  )
}

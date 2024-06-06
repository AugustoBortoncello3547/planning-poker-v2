import React from 'react'
import './Card.scss'
import { CardVariant } from '../../enums/CardVariant'

interface CardProps {
  value: string | undefined
  variant?: CardVariant
  onClick?: (value: string) => void
}

export default function Card({
  value,
  onClick,
  variant = CardVariant.EMPTY,
}: CardProps) {
  return (
    <div
      className={`card-container ${variant?.toLowerCase()} mb-1`}
      onClick={onClick && value ? () => onClick(value) : undefined}
    >
      <h2 className="card-container__text">{value}</h2>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import './Game.scss'

import { Container } from 'react-bootstrap'

import { IPlayer } from '../../types/Player'

import PlayerCard from './PlayerCard'
import ModalPickUsername from '../../components/Modal/ModalPickUsername'
import { checkHasUsername, getPlayer } from '../../helpers/user'
import { useNavigate, useParams } from 'react-router-dom'
import { addPlayerToGame, getGame } from '../../services/game'

export default function Game() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [isLoadingGame, setIsLoadingGame] = useState(true)
  const [shouldPickUsername, setShouldPickUsername] = useState(false)

  const [players, setPlayers] = useState<IPlayer[]>([])

  useEffect(() => {
    handleGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleGame() {
    if (gameId) {
      const game = await getGame(gameId)
      if (!game) return navigate('/')
      setIsLoadingGame(false)

      if (!checkHasUsername()) {
        setShouldPickUsername(true)
        return
      } else {
        const player = getPlayer()
        if (player) {
          addPlayerToGame(gameId, player)
          setPlayers([player])
        }
      }
    } else navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  if (isLoadingGame)
    return (
      <span
        className="spinner-grow text-primary position-absolute top-50 start-50"
        role="status"
        aria-hidden="true"
      ></span>
    )

  if (shouldPickUsername)
    return (
      <ModalPickUsername
        gameKey={gameId || ''}
        show={shouldPickUsername}
        setShow={setShouldPickUsername}
      />
    )

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Container className="table-container">
        <div />
        <div className="table-container__top">
          <PlayerCard player={players?.[1]} />
          <PlayerCard player={players?.[3]} />
          <PlayerCard player={players?.[5]} />
        </div>
        <div />
        <div className="table-container__left">
          <PlayerCard player={players?.[6]} />
        </div>
        <div className="table-container__table">Escolha sua carta</div>
        <div className="table-container__right">
          <PlayerCard player={players?.[7]} />
        </div>
        <div />

        <div className="table-container__bottom">
          <PlayerCard player={players?.[0]} />
          <PlayerCard player={players?.[2]} />
          <PlayerCard player={players?.[4]} />
        </div>
        <div />
      </Container>
    </Container>
  )
}

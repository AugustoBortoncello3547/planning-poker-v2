import React, { useEffect, useState } from 'react'
import './Game.scss'

import { Button, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { DataSnapshot } from 'firebase/database'

import PlayerCard from '../../components/PlayerCard'
import ModalPickUsername from '../../components/Modal/ModalPickUsername'

import { IPlayer } from '../../types/Player'
import { IGame } from '../../types/Game'

import { checkHasUsername, getPlayer } from '../../helpers/user'
import {
  addPlayerToGame,
  getGame,
  removePlayerFromGame,
  startListenGameChanges,
  updateGameStatus,
} from '../../services/game'
import { parseGamePlayers } from '../../helpers/game'
import CardSelector from '../../components/CardSelector'
import { GameStatusEnum } from '../../enums/GameStatus'

export default function Game() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [isLoadingGame, setIsLoadingGame] = useState(true)
  const [shouldPickUsername, setShouldPickUsername] = useState(false)

  const [currentPlayer, setCurrentPlayer] = useState<IPlayer | null>(null)
  const [currentGame, setCurrentGame] = useState<IGame | null>(null)
  const [players, setPlayers] = useState<IPlayer[]>([])

  // Handle game changes
  // ------------------------------------------
  useEffect(() => {
    handleGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleGame() {
    if (gameId) {
      const game = await getGame(gameId)
      if (!game) return navigate('/')
      setIsLoadingGame(false)
      startListenGameChanges(gameId, handleGameChanges)

      if (!checkHasUsername()) {
        setShouldPickUsername(true)
        return
      } else {
        const player = getPlayer()
        if (player) {
          addPlayerToGame(gameId, player)
          setCurrentPlayer(player)
        }
      }
    } else navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  function handleGameChanges(snapshot: DataSnapshot) {
    const gameChanges: IGame = snapshot.val()
    if (gameChanges) {
      setCurrentGame(gameChanges)
      console.log(gameChanges)
      setPlayers([...parseGamePlayers(gameChanges)])
    } else {
      // Should return to home, game does not exist
      navigate('/')
    }
  }

  // Handle player leave page
  // ------------------------------------------
  useEffect(() => {
    window.addEventListener('beforeunload', handlePlayerLeaveGame)

    return () =>
      window.removeEventListener('beforeunload', handlePlayerLeaveGame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer])

  async function handlePlayerLeaveGame() {
    if (gameId && currentPlayer)
      await removePlayerFromGame(gameId, currentPlayer)
  }

  // Reveal all player cards
  // ------------------------------------------
  async function handleRevealCardsClick() {
    if (gameId) await updateGameStatus(gameId, GameStatusEnum.SHOW)
  }

  // Render
  // ------------------------------------------
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
        setCurrentPlayer={setCurrentPlayer}
      />
    )

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 p-relative">
      <Container className="table-container">
        <div />
        <div className="table-container__top">
          <PlayerCard game={currentGame} player={players?.[1]} />
          <PlayerCard game={currentGame} player={players?.[3]} />
          <PlayerCard game={currentGame} player={players?.[5]} />
        </div>
        <div />
        <div className="table-container__left">
          <PlayerCard game={currentGame} player={players?.[6]} />
        </div>
        <div className="table-container__table">
          {currentGame?.status === GameStatusEnum.IDLE ? (
            currentPlayer?.selectedCard ? (
              <Button onClick={handleRevealCardsClick}>Revelar cartas</Button>
            ) : (
              'Escolha sua carta'
            )
          ) : (
            <div>
              <Button onClick={() => {}}>Iniciar nova votação</Button>
            </div>
          )}
        </div>
        <div className="table-container__right">
          <PlayerCard game={currentGame} player={players?.[7]} />
        </div>
        <div />

        <div className="table-container__bottom">
          <PlayerCard game={currentGame} player={players?.[0]} />
          <PlayerCard game={currentGame} player={players?.[2]} />
          <PlayerCard game={currentGame} player={players?.[4]} />
        </div>
        <div />
      </Container>

      <CardSelector
        game={currentGame}
        player={currentPlayer}
        setPlayer={setCurrentPlayer}
      />
    </Container>
  )
}

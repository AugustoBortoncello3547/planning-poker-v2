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
import Timer from '../../components/Timer'
import { upsertPlayerVote } from '../../services/player'
import ResultVoting from '../../components/ResultVoting'

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
      const player = getPlayer()
      if (player && gameChanges.players) {
        setCurrentPlayer(gameChanges.players[player.key])
      }
      setCurrentGame(gameChanges)
      setPlayers([...parseGamePlayers(gameChanges)])
    } else {
      // Should return to home, game does not exist
      navigate('/')
    }
  }

  const handleStartNewVoting = () => {
    handleSatarNewVoting().then(async () => {
      if (gameId && currentGame) {
        const game = await getGame(gameId)
        if (game) {
          const idsPlayers = Object.keys(game.players)
          if (idsPlayers.length > 0) {
            idsPlayers.map(async (idPlayer) => {
              const player: IPlayer = game.players[idPlayer]
              player.selectedCard = ''

              await upsertPlayerVote(currentGame.key, player)
            })
          }
        }
      }
    })
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

  // Start new voting
  // ------------------------------------------
  async function handleSatarNewVoting() {
    if (gameId) await updateGameStatus(gameId, GameStatusEnum.IDLE)
  }

  // Init counter
  // ------------------------------------------
  async function handleInitCounterRevealCardsClick() {
    if (gameId) await updateGameStatus(gameId, GameStatusEnum.SHOW)
  }

  // Reveal all player cards
  // ------------------------------------------
  async function handleFinishCouterRevealCards() {
    if (gameId) await updateGameStatus(gameId, GameStatusEnum.SHOWED)
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
    <>
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
                <Button onClick={handleInitCounterRevealCardsClick}>
                  Revelar cartas
                </Button>
              ) : (
                'Escolha sua carta'
              )
            ) : (
              <></>
            )}
            {currentGame?.status === GameStatusEnum.SHOWED && (
              <div>
                <Button onClick={handleStartNewVoting}>
                  Iniciar nova votação
                </Button>
              </div>
            )}
            {currentGame?.status === GameStatusEnum.SHOW && (
              <Timer onFinishTimer={handleFinishCouterRevealCards} />
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

        {currentGame?.status === GameStatusEnum.SHOWED ? (
          <ResultVoting game={currentGame} />
        ) : (
          <CardSelector
            game={currentGame}
            player={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
        )}
      </Container>
    </>
  )
}

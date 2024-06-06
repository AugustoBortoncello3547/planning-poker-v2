import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

import { createPlayer } from '../../services/player'
import { setPlayer } from '../../helpers/user'
import { addPlayerToGame } from '../../services/game'

import { IPlayer } from '../../types/Player'

interface ModalProps {
  gameKey: string
  show: boolean
  setShow: (value: boolean) => void
  setCurrentPlayer?: (player: IPlayer) => void
}

function ModalPickUsername({
  gameKey,
  show,
  setShow,
  setCurrentPlayer,
}: ModalProps) {
  const [name, setName] = useState('')

  async function handleSaveUsername() {
    if (!name) {
      alert('Preencha o nome')
      return
    }

    const player = await createPlayer(gameKey, name)
    if (player) {
      setPlayer(player)
      await addPlayerToGame(gameKey, player)
      if (setCurrentPlayer) setCurrentPlayer(player)
    }

    setShow(false)
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  return (
    <Modal show={show} backdrop="static" centered keyboard={false}>
      <Modal.Body>
        <h4> Digite seu nome...</h4>
        <Form>
          <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Gabriel"
              value={name}
              onChange={handleNameChange}
            />
            <Button className="mt-3 w-100" onClick={handleSaveUsername}>
              Salvar
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalPickUsername

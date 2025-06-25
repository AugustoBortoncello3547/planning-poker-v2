import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

import { setPlayer } from '../../helpers/user'
import { addPlayerToGame, getGame } from '../../services/game'
import { createPlayer } from '../../services/player'

import { IPlayer } from '../../types/Player'
import InputSenha from '../InputPassword'

import { compare } from 'bcryptjs'

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
  const [name, setName] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  async function handleSaveUsername() {
    if (!name) {
      alert('Preencha o nome')
      return
    }

    if (!senha) {
      alert('Preencha a senha')
      return
    }

    // Validar a senha
    const game = await getGame(gameKey)
    if (!game) {
      alert('Sala não encontrada')
      return
    }

    const senhaCorreta = await compare(senha, game.hashSenha)
    if (!senhaCorreta) {
      alert('Senha informada não é a correta')
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

  function handleSenhaChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSenha(e.target.value)
  }

  return (
    <Modal show={show} backdrop="static" centered keyboard={false}>
      <Modal.Body>
        <h4> Digite seu nome e a senha da sala</h4>
        <Form>
          <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Gabriel"
              value={name}
              onChange={handleNameChange}
            />
            <InputSenha handleSenhaChange={handleSenhaChange} />
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

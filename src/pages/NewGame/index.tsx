import React, { useState } from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { createGame } from '../../services/game'
import InputSenha from '../../components/InputPassword'

export default function NewGame() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const navigate = useNavigate()

  async function handleCreateGame() {
    if (!name) {
      alert('Preencha o nome')
      return
    }

    if (!senha) {
      alert('Preencha a senha')
      return
    }

    if (isLoading) return
    setIsLoading(true)

    const gameKey = await createGame(name, senha)
    navigate(`/jogo/${gameKey}`)
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function handleSenhaChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSenha(e.target.value)
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Container className="w-50">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nome da sala</Form.Label>
            <Form.Control
              type="text"
              placeholder="UCS"
              onChange={handleNameChange}
            />
            <InputSenha handleSenhaChange={handleSenhaChange} />
            <Button
              className="mt-3 w-100"
              onClick={handleCreateGame}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                'Criar Sala'
              )}
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Container>
  )
}

import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'

const InputSenha = ({
  handleSenhaChange,
}: {
  handleSenhaChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false)

  const toggleSenha = () => setMostrarSenha(!mostrarSenha)

  return (
    <Form.Group>
      <Form.Label>Senha da sala</Form.Label>
      <InputGroup>
        <Form.Control
          type={mostrarSenha ? 'text' : 'password'}
          onChange={handleSenhaChange}
        />
        <Button variant="outline-secondary" onClick={toggleSenha}>
          {mostrarSenha ? <EyeSlashFill /> : <EyeFill />}
        </Button>
      </InputGroup>
    </Form.Group>
  )
}

export default InputSenha

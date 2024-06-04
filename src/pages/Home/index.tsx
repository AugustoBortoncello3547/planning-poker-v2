import React from 'react'
import { Container, Image } from 'react-bootstrap'
import ButtonLink from '../../components/ButtonLink'

export default function Home() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Container className="text-center">
        <Image src="logo.png" fluid style={{ width: 360, height: 60 }} />
        <h5 className="my-4 text-secondary">
          Uma maneira divertida de estimar os pontos das histórias
        </h5>
        <ButtonLink to="/novo-jogo" variant="primary" className="btn-lg px-5">
          Criar Jogo
        </ButtonLink>
      </Container>

      <Container className="text-center">
        <h5 className="mt-4 mb-2 text-secondary">Criado pela:</h5>
        <div style={{ filter: 'grayscale(1)' }}>
          <Image src="ucs.png" fluid style={{ width: 120, height: 60 }} />
        </div>
      </Container>
    </Container>
  )
}

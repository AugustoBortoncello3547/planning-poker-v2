import React from 'react'
import { Container } from 'react-bootstrap'
import ButtonLink from '../../components/ButtonLink'

export default function NotFound() {
  return (
    <Container>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            <span className="text-danger">Opps!</span> Página não encontrada.
          </p>
          <p className="lead">A página que você está procurando não existe</p>
          <ButtonLink to="/" variant="primary" className="btn-lg">
            Voltar
          </ButtonLink>
        </div>
      </div>
    </Container>
  )
}

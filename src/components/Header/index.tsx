import React from 'react'

import { Link } from 'react-router-dom'

import { Image } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function Header() {
  return (
    <Navbar bg="light" style={{ position: 'fixed', width: '100%', top: 0 }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src="../logo.png" fluid style={{ width: 240, height: 40 }} />
        </Navbar.Brand>
        <Nav className="me-auto">
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header

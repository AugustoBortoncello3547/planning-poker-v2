import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { Button, Image } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { QrCode } from 'react-bootstrap-icons';
import ModalQrCodeGame from '../Modal/ModalQrCodeGame'

function Header() {
  const [show, setShow] = useState(false)

  const handleOpenModalQrCodeGame = () => {
    setShow(true)
  }

  return (
    <>
      <ModalQrCodeGame
        show={show}
        setShow={setShow}
      />
      <Navbar className='justify-content-between' bg="light" style={{ position: 'fixed', width: '100%', top: 0 }}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src="../logo.png" fluid style={{ width: 240, height: 40 }} />
          </Navbar.Brand>
        </Container>
        <Container style={{display: "grid", placeContent: "end"}}>
          <Button onClick={handleOpenModalQrCodeGame} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8}}> <QrCode/> Convidar Jogadores </Button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header

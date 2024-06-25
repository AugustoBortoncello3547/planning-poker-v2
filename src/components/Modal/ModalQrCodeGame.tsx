import React from 'react'
import { Modal } from 'react-bootstrap'
import QRCode from "react-qr-code";
import { useLocation } from 'react-router-dom';

interface ModalProps {
  show: boolean
  setShow: (value: boolean) => void
}

function ModalQrCodeGame({
  show,
  setShow,
}: ModalProps) {
    const location = window.location.href;

    const handleClose = () => {
        setShow(false)
    }

  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Body className='d-flex justify-content-center'>
        <QRCode value={location} />
      </Modal.Body>
    </Modal>
  )
}

export default ModalQrCodeGame

import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'

const BookDetails = ({ book, onClose }) => {
  if (!book) return false

  return (
    <Modal show onHide={onClose} dialogClassName="book-details-modal">
      <Modal.Header closeButton>
        <Modal.Title>{book.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{book.description || (<span>No description</span>)}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

BookDetails.propTypes = {
  book: PropTypes.object,
  onClose: PropTypes.func.isRequired
}

export default BookDetails

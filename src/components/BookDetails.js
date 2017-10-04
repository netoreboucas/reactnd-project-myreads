import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'

class BookDetails extends Component {
  static propTypes = {
    book: PropTypes.object,
    onClose: PropTypes.func.isRequired
  }

  close = () => {
    this.props.onClose()
  }

  render () {
    const { book } = this.props
    if (!book) return false

    return (
      <Modal show onHide={this.close} dialogClassName="book-details-modal">
        <Modal.Header closeButton>
          <Modal.Title>{book.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{book.description || (<span>No description</span>)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default BookDetails

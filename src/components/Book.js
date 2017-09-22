import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DropdownButton, MenuItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

import { shelves } from '../shared/Constants'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    renderingOutsideBookshelf: PropTypes.bool
  }

  static defaultProps = {
    renderingOutsideBookshelf: false
  }

  render () {
    const { book, onChangeShelf, renderingOutsideBookshelf } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`,
            opacity: (renderingOutsideBookshelf && book.shelf !== 'none' ? 0.25 : 1)
          }} />
          <div className="book-shelf-changer">
            <DropdownButton bsStyle="success" title="" id={`dropdown-${book.id}`} onSelect={(eventKey) => onChangeShelf(book, eventKey)}>
              {shelves.map(shelf => (
                <MenuItem eventKey={shelf.key} active={book.shelf === shelf.key}>{shelf.title}</MenuItem>
              ))}
              <MenuItem divider />
              <MenuItem eventKey="none" active={book.shelf === 'none'}>None</MenuItem>
            </DropdownButton>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
      </div>
    )
  }
}

export default Book

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DropdownButton, MenuItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

class BooksGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    applyOpacityWhenOnBookshelf: PropTypes.bool,
    onChangeShelf: PropTypes.func.isRequired
  }

  static defaultProps = {
    applyOpacityWhenOnBookshelf: false
  }

  render () {
    const { books, applyOpacityWhenOnBookshelf, onChangeShelf } = this.props

    return (
      <ol className="books-grid">
        {books.map(book =>
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`,
                  opacity: (applyOpacityWhenOnBookshelf && book.shelf !== 'none' ? 0.25 : 1)
                }} />
                <div className="book-shelf-changer">
                  <DropdownButton bsStyle="success" title="" id={`dropdown-${book.id}`} onSelect={(eventKey) => onChangeShelf(book, eventKey)}>
                    <MenuItem eventKey="currentlyReading" active={book.shelf === 'currentlyReading'}>Currently Reading</MenuItem>
                    <MenuItem eventKey="wantToRead" active={book.shelf === 'wantToRead'}>Want to Read</MenuItem>
                    <MenuItem eventKey="read" active={book.shelf === 'read'}>Read</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="none" active={book.shelf === 'none'}>None</MenuItem>
                  </DropdownButton>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
            </div>
          </li>
        )}
      </ol>
    )
  }
}

export default BooksGrid

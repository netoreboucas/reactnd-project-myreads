import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

class BooksGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    renderingOutsideBookshelf: PropTypes.bool
  }

  static defaultProps = {
    renderingOutsideBookshelf: false
  }

  render () {
    const { books, onChangeShelf, renderingOutsideBookshelf } = this.props

    return (
      <ol className="books-grid">
        {books.map(book =>
          <li key={book.id}>
            <Book
              book={book}
              onChangeShelf={onChangeShelf}
              renderingOutsideBookshelf={renderingOutsideBookshelf}
            />
          </li>
        )}
      </ol>
    )
  }
}

export default BooksGrid

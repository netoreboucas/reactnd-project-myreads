import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

const BooksGrid = ({ books, onChangeShelf, onChangeCheck, showBookDetails, renderingOutsideBookshelf }) => {
  return (
    <ol className="books-grid">
      {books.map(book =>
        <li key={book.id}>
          <Book
            book={book}
            onChangeShelf={onChangeShelf}
            onChangeCheck={onChangeCheck}
            showBookDetails={showBookDetails}
            renderingOutsideBookshelf={renderingOutsideBookshelf}
          />
        </li>
      )}
    </ol>
  )
}

BooksGrid.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  showBookDetails: PropTypes.func.isRequired,
  renderingOutsideBookshelf: PropTypes.bool
}

export default BooksGrid

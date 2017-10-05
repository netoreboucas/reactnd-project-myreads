import React from 'react'
import PropTypes from 'prop-types'

import './css/Bookshelf.css'

import BooksGrid from './BooksGrid'

const Bookshelf = ({ title, books, onChangeShelf, onChangeCheck, showBookDetails }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BooksGrid
          books={books}
          onChangeShelf={onChangeShelf}
          onChangeCheck={onChangeCheck}
          showBookDetails={showBookDetails}
        />
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  showBookDetails: PropTypes.func.isRequired
}

export default Bookshelf

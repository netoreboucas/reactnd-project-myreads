import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BooksGrid from './BooksGrid'

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    onChangeCheck: PropTypes.func.isRequired,
    showBookDetails: PropTypes.func.isRequired
  }

  render () {
    const { title, books, onChangeShelf, onChangeCheck, showBookDetails } = this.props

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
}

export default Bookshelf

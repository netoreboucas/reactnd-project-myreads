import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BooksGrid from './BooksGrid'

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render () {
    const { title, books, onChangeShelf } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <BooksGrid books={books} onChangeShelf={onChangeShelf} />
        </div>
      </div>
    )
  }
}

export default Bookshelf

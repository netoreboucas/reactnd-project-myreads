import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render () {
    const { books, onChangeShelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              title="Currently Reading"
              books={books.filter(b => b.shelf === 'currentlyReading')}
              onChangeShelf={onChangeShelf}
            />
            <Bookshelf
              title="Want to Read"
              books={books.filter(b => b.shelf === 'wantToRead')}
              onChangeShelf={onChangeShelf}
            />
            <Bookshelf
              title="Read"
              books={books.filter(b => b.shelf === 'read')}
              onChangeShelf={onChangeShelf}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks

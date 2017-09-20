import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
                  <select value={book.shelf} onChange={(event) => onChangeShelf(book, event.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading" disabled={book.shelf === 'currentlyReading'}>Currently Reading</option>
                    <option value="wantToRead" disabled={book.shelf === 'wantToRead'}>Want to Read</option>
                    <option value="read" disabled={book.shelf === 'read'}>Read</option>
                    <option value="none" disabled={book.shelf === 'none'}>None</option>
                  </select>
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
          <ol className="books-grid">
            {books.map(book =>
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
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
                  <div className="book-authors">{book.authors.join(', ')}</div>
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf

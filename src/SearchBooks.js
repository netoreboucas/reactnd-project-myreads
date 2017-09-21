import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { debounce } from 'throttle-debounce'

import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'

class SearchBooks extends Component {
  static propTypes = {
    bookshelf: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    setProgress: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: [],
    empty: false
  }

  lastPromise = null

  constructor (props) {
    super(props)
    this.updateQueryAjax = debounce(200, this.updateQueryAjax)
  }

  componentDidMount () {
    this.searchInput.focus()
  }

  updateQuery (query) {
    query = query.trim()
    this.setState({ query })
    this.updateQueryAjax(query)
  }

  updateQueryAjax (query) {
    if (query) {
      const { setProgress } = this.props
      setProgress(true)
      let currentPromise
      (this.lastPromise = currentPromise = BooksAPI.search(query)).then((books) => {
        if (this.lastPromise === currentPromise) { // render only if it is the last request
          if (!books.error) {
            this.setState({ books, empty: false })
          } else {
            this.setState({ books: [], empty: true })
          }
        }
      }).then(() => {
        setProgress(false)
      }).catch(() => {
        setProgress(false)
      })
    } else {
      this.setState({ books: [], empty: false })
    }
  }

  render () {
    const { bookshelf, onChangeShelf } = this.props
    const { query, books, empty } = this.state

    books.forEach(book => {
      book.shelf = book.id in bookshelf ? bookshelf[book.id] : 'none'
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              ref={(input) => { this.searchInput = input }}
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {empty && (<div className="search-books-noresult">Sorry! No result found :-(</div>)}
          <BooksGrid books={books} onChangeShelf={onChangeShelf} applyOpacityWhenOnBookshelf />
        </div>
      </div>
    )
  }
}

export default SearchBooks

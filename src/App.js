import React from 'react'
import './App.css'

import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((shelves) => {
      this.setState({
        books: this.state.books.map(book => {
          if (Object.keys(shelves).every(key => {
            return !shelves[key].includes(book.id) || !(book.shelf = key)
          })) {
            book.shelf = 'none'
          }

          return book
        })
      })
    })
  }

  render () {
    return (
      <div className="app">
        <ListBooks books={this.state.books} onChangeShelf={this.changeShelf} />
      </div>
    )
  }
}

export default BooksApp

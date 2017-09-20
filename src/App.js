import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'

import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

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
      let books = this.state.books.map(book => {
        if (Object.keys(shelves).every(key => {
          return !shelves[key].includes(book.id) || !(book.shelf = key)
        })) {
          book.shelf = 'none'
        }

        return book
      })

      if (!books.find(b => b.id === book.id)) {
        book.shelf = shelf
        books.push(book)
      }

      this.setState({ books })
    })
  }

  render () {
    let bookshelf = this.state.books.reduce((acc, book) => {
      acc[book.id] = book.shelf
      return acc
    }, {})

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks
            bookshelf={bookshelf}
            onChangeShelf={this.changeShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp

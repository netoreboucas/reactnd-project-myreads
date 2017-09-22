import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'

import Progress from 'react-progress-2'
import 'react-progress-2/main.css'

import * as BooksAPI from './shared/BooksAPI'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount () {
    this.setProgress(true)
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    }).then(() => {
      this.setProgress(false)
    }).catch(() => {
      this.setProgress(false)
    })
  }

  changeShelf = (book, shelf) => {
    if (book.shelf === shelf) return // Nothing changed

    this.setProgress(true)
    BooksAPI.update(book, shelf).then((shelves) => {
      let books = this.state.books.map(book => {
        if (Object.keys(shelves).every(key => {
          return !shelves[key].includes(book.id) || !(book.shelf = key)
        })) {
          book.shelf = 'none'
        }

        return book
      })

      if (!books.find(b => b.id === book.id)) { // new book
        book.shelf = shelf
        books.push(book)
      }

      this.setState({ books })
    }).then(() => {
      this.setProgress(false)
    }).catch(() => {
      this.setProgress(false)
    })
  }

  setProgress = (visible) => {
    Progress[visible ? 'show' : 'hide']()
  }

  render () {
    let bookshelf = this.state.books.reduce((acc, book) => {
      acc[book.id] = book.shelf
      return acc
    }, {})

    return (
      <div className="app">
        <Progress.Component
          thumbStyle={{background: '#60ac5d'}} />

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
            setProgress={this.setProgress}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp

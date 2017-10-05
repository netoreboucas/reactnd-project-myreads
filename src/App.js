import React from 'react'
import { Route } from 'react-router-dom'
import Progress from 'react-progress-2'

import 'bootstrap/dist/css/bootstrap.css'
import 'react-progress-2/main.css'
import './App.css'

import * as BooksAPI from './shared/BooksAPI'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import BookDetails from './components/BookDetails'

class BooksApp extends React.Component {
  state = {
    books: [],
    selectedBook: null
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

  onChangeShelf = (book, shelf) => {
    if (book.shelf === shelf) return // Nothing changed

    this.setProgress(true)
    return BooksAPI.update(book, shelf).then((shelves) => {
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

  onChangeCheck = (book) => {
    this.setState(({ books }) => (
      books.map(b => {
        if (b.id === book.id) b.checked = !b.checked
        return b
      })
    ))
  }

  onClearChecks = () => {
    this.setState(({ books }) => (
      books.map(b => {
        b.checked = false
        return b
      })
    ))
  }

  onCheckAll = () => {
    this.setState(({ books }) => (
      books.map(b => {
        b.checked = true
        return b
      })
    ))
  }

  onMultiChangeShelf = (shelf) => {
    let promise = Promise.resolve()
    this.state.books.forEach((book) => {
      if (book.checked) {
        promise = promise.then(() => {
          if (shelf === 'none') book.checked = false
          return this.onChangeShelf(book, shelf)
        })
      }
    })
  }

  showBookDetails = (book) => {
    this.setState({ selectedBook: book })
  }

  setProgress = (visible) => {
    Progress[visible ? 'show' : 'hide']()
  }

  render () {
    const { books } = this.state

    let bookshelf = this.state.books.reduce((acc, book) => {
      acc[book.id] = book.shelf
      return acc
    }, {})

    return (
      <div className="app">
        <Progress.Component thumbStyle={{background: '#60ac5d'}} />

        <BookDetails book={this.state.selectedBook} onClose={() => this.setState({ selectedBook: null })} />

        <Route exact path="/" render={() => (
          <ListBooks
            books={books}
            onChangeShelf={this.onChangeShelf}
            onChangeCheck={this.onChangeCheck}
            onClearChecks={this.onClearChecks}
            onCheckAll={this.onCheckAll}
            onMultiChangeShelf={this.onMultiChangeShelf}
            showBookDetails={this.showBookDetails}
          />
        )} />

        <Route path="/search" render={() => (
          <SearchBooks
            bookshelf={bookshelf}
            onChangeShelf={this.onChangeShelf}
            showBookDetails={this.showBookDetails}
            setProgress={this.setProgress}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp

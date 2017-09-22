import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DropdownButton, Label, MenuItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

import { shelves } from '../shared/Constants'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    renderingOutsideBookshelf: PropTypes.bool
  }

  static defaultProps = {
    renderingOutsideBookshelf: false
  }

  render () {
    const { book, onChangeShelf } = this.props
    const renderingOutsideBookshelf = this.props.renderingOutsideBookshelf && book.shelf !== 'none'

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`,
            opacity: (renderingOutsideBookshelf ? 0.25 : 1)
          }} />
          {renderingOutsideBookshelf && (
            <Label bsStyle="primary">{shelves[book.shelf]}</Label>
          )}
          <div className="book-shelf-changer">
            <DropdownButton bsStyle="success" title="" id={`dropdown-${book.id}`} onSelect={(eventKey) => onChangeShelf(book, eventKey)}>
              {Object.keys(shelves).map(key => (
                <MenuItem eventKey={key} active={book.shelf === key}>{shelves[key]}</MenuItem>
              ))}
              <MenuItem divider />
              <MenuItem eventKey="none" active={book.shelf === 'none'}>None</MenuItem>
            </DropdownButton>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
      </div>
    )
  }
}

export default Book

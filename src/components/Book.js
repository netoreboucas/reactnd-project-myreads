import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, Label, MenuItem } from 'react-bootstrap';

import './css/Book.css';

import { shelves } from '../shared/Constants';

const Book = ({ book, onChangeShelf, onChangeCheck, showBookDetails, renderingOutsideBookshelf }) => {
  const onShelf = renderingOutsideBookshelf && book.shelf !== 'none';

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`,
            opacity: onShelf ? 0.25 : 1
          }}
          onClick={() => showBookDetails(book)}
        />
        {onShelf && <Label bsStyle="primary">{shelves[book.shelf]}</Label>}
        <div className={'book-check ' + (book.checked ? 'checked' : 'unchecked')} onClick={() => onChangeCheck(book)} />
        <div className="book-shelf-changer">
          <DropdownButton bsStyle="success" title="" id={`dropdown-${book.id}`} onSelect={(eventKey) => onChangeShelf(book, eventKey)}>
            {Object.keys(shelves).map(key => (
              <MenuItem key={key} eventKey={key} active={book.shelf === key}>{shelves[key]}</MenuItem>
            ))}
            <MenuItem divider />
            <MenuItem eventKey="none" active={book.shelf === 'none'}>None</MenuItem>
          </DropdownButton>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  showBookDetails: PropTypes.func.isRequired,
  renderingOutsideBookshelf: PropTypes.bool
};

export default Book;

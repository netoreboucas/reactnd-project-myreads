import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './css/ListBooks.css';

import Bookshelf from './Bookshelf';
import MultiShelfChanger from './MultiShelfChanger';
import { shelves } from '../shared/Constants';

const ListBooks = ({ books, onChangeShelf, onChangeCheck, onClearChecks, onCheckAll, onMultiChangeShelf, showBookDetails }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(shelves).map(key => (
            <Bookshelf
              key={key}
              title={shelves[key]}
              books={books.filter(b => b.shelf === key)}
              onChangeShelf={onChangeShelf}
              onChangeCheck={onChangeCheck}
              showBookDetails={showBookDetails}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
      {books.some(b => b.checked) && (
        <MultiShelfChanger
          onClearChecks={onClearChecks}
          onCheckAll={onCheckAll}
          onMultiChangeShelf={onMultiChangeShelf}
        />
      )}
    </div>
  );
};

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  onClearChecks: PropTypes.func.isRequired,
  onCheckAll: PropTypes.func.isRequired,
  onMultiChangeShelf: PropTypes.func.isRequired,
  showBookDetails: PropTypes.func.isRequired
};

export default ListBooks;

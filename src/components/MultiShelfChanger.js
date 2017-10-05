import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import './css/MultiShelfChanger.css'

import { shelves } from '../shared/Constants'

const MultiShelfChanger = ({ onClearChecks, onCheckAll, onMultiChangeShelf }) => {
  return (
    <div className="multi-shelf-changer">
      <div className="close" onClick={onClearChecks} />
      <span>Move to:</span>
      {Object.keys(shelves).map(key => (
        <Button key={key} onClick={() => onMultiChangeShelf(key)}>
          {shelves[key]}
        </Button>
      ))}
      <Button onClick={() => onMultiChangeShelf('none')}>
        None
      </Button>
      <div className="separator" />
      <Button bsStyle="link" onClick={onCheckAll}>check all</Button>
    </div>
  )
}

MultiShelfChanger.propTypes = {
  onClearChecks: PropTypes.func.isRequired,
  onCheckAll: PropTypes.func.isRequired,
  onMultiChangeShelf: PropTypes.func.isRequired
}

export default MultiShelfChanger

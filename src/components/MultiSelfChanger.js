import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import { shelves } from '../shared/Constants'

const MultiSelfChanger = ({ onClearChecks, onMultiChangeShelf }) => {
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
    </div>
  )
}

MultiSelfChanger.propTypes = {
  onClearChecks: PropTypes.func.isRequired,
  onMultiChangeShelf: PropTypes.func.isRequired
}

export default MultiSelfChanger

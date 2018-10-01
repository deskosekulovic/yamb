import React from 'react';
import PropTypes from 'prop-types';
import StyledDice from '../styles/StyledDice';

const Dice = ({ dice, name, toggleSelectDice, rollCounter, selected }) => (
  <StyledDice
    type="button"
    selected={selected}
    disabled={rollCounter === 0 && true}
    onClick={toggleSelectDice}
    name={name}
    value={dice || 'roll'}
  />
);

Dice.propTypes = {
  dice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  toggleSelectDice: PropTypes.func.isRequired,
  rollCounter: PropTypes.number.isRequired,
  selected: PropTypes.bool
};

export default Dice;

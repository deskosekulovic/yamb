import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from '../styles/Button';

const Button = ({ rollDice, rollCounter, disabled }) => (
  <StyledButton
    type="button"
    onClick={rollDice}
    disabled={(disabled || rollCounter === 3) && true}
  >
    {rollCounter ? rollCounter + '. bacanje' : 'Baci kocke!'}
  </StyledButton>
);

Button.propTypes = {
  rollDice: PropTypes.func.isRequired,
  rollCounter: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default Button;

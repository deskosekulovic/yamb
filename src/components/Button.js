import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from '../styles/Button';

const Button = ({ rollDice, rollCounter }) =><StyledButton
    type="button"
    onClick={rollDice}
    disabled={rollCounter===3 && true}
>
    {rollCounter ? rollCounter+'. bacanje' : 'Baci kocke!'}
</StyledButton>;

Button.propTypes={
    rollDice: PropTypes.func,
    rollCounter: PropTypes.number,
};

export default Button;

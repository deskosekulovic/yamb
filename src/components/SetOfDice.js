import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dice from './Dice';
import { setOfDice } from '../utilities/Fields';
import StyledSetOfDice from '../styles/StyledSetOfDice';
import Button from '../styles/Button';

class SetOfDices extends Component{
    render(){
        const { rollDice, dice, toggleSelectDice, rollCounter, selected, numberOfDice } = this.props;
        return(
            <StyledSetOfDice>
                {setOfDice.slice(0,numberOfDice).map((el,i) =>
                    <Dice
                        key={el}
                        name={el}
                        rollCounter={rollCounter}
                        toggleSelectDice={toggleSelectDice}
                        selected={selected[i]}
                        dice={dice[i]}
                    />)}
                <Button
                    type="button"
                    onClick={rollDice}
                    disabled={rollCounter===3 && true}
                >
                    {rollCounter ? rollCounter+'. bacanje' : 'Baci kocke!'}
                </Button>
            </StyledSetOfDice>
        );
    }
}
SetOfDices.propTypes = {
    dice: PropTypes.array.isRequired,
    rollDice: PropTypes.func.isRequired,
    toggleSelectDice: PropTypes.func.isRequired,
    rollCounter: PropTypes.number.isRequired,
    selected: PropTypes.array,
    numberOfDice: PropTypes.string
};

export default SetOfDices;

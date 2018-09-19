import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dice from './Dice';
import { setOfDice } from '../utilities/Fields';
import StyledSetOfDice from '../styles/StyledSetOfDice';

class SetOfDices extends Component{
    render(){
        const { dice, toggleSelectDice, rollCounter, selected, numberOfDice } = this.props;
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
            </StyledSetOfDice>
        );
    }
}
SetOfDices.propTypes = {
    dice: PropTypes.array,
    toggleSelectDice: PropTypes.func,
    rollCounter: PropTypes.number,
    selected: PropTypes.array,
    numberOfDice: PropTypes.string
};

export default SetOfDices;

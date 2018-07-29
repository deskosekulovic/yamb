import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dice from './Dice';
import { dices } from '../utilities/Fields';
import StyledSetOfDice from '../styles/StyledSetOfDice';
import Button from '../styles/Button';

class SetOfDices extends Component{
    render(){
        const { rollDices, value, toggleSelectDice, rollCounter, selected } = this.props;
        return(
            <StyledSetOfDice>
                {dices.map((dice,i) =>
                    <Dice
                        key={dice}
                        name={dice}
                        rollCounter={rollCounter}
                        toggleSelectDice={toggleSelectDice}
                        selected={selected[i]}
                        value={value[i]}
                    />)}
                <Button
                    type="button"
                    onClick={rollDices}
                    disabled={rollCounter===3 && true}
                >
                Baci kocke!
                </Button>
            </StyledSetOfDice>
        );
    }
}
SetOfDices.propTypes = {
    value: PropTypes.array.isRequired,
    rollDices: PropTypes.func.isRequired,
    toggleSelectDice: PropTypes.func.isRequired,
    rollCounter: PropTypes.number.isRequired,
    selected: PropTypes.array.isRequired
};

export default SetOfDices;

import React from 'react';
import PropTypes from 'prop-types';
import { StyledTopListSettings, Settings } from '../styles/StyledTopList';
import ComponentAnimation from '../styles/ComponentAnimation';
import Form from './Form';

const TopListSettings = ({ showTopListSettings, localNumberOfDice, localNumberOfColumns, numberOfResults, toggleTopListSettings, handleChange }) => (
    <StyledTopListSettings>
        <Settings onClick={toggleTopListSettings}>Podešavanje Top Liste</Settings>
        {showTopListSettings &&
        (<ComponentAnimation>
            <h2>Broj kockica:</h2>
            <Form
                array={[5,6]}
                name='localNumberOfDice'
                value={localNumberOfDice}
                handleChange={handleChange}
            />

            <h2>Broj kolona:</h2>
            <Form
                array={[4,5,6,7]}
                name='localNumberOfColumns'
                value={localNumberOfColumns}
                handleChange={handleChange}
            />

            <h2>Broj rezultata:</h2>
            <Form
                array={[10,20,50]}
                name='numberOfResults'
                value={numberOfResults}
                handleChange={handleChange}
            />
        </ComponentAnimation>)}
    </StyledTopListSettings>
);

TopListSettings.propTypes={
    showTopListSettings: PropTypes.bool,
    localNumberOfDice: PropTypes.string,
    localNumberOfColumns: PropTypes.string,
    numberOfResults: PropTypes.string,
    toggleTopListSettings: PropTypes.func,
    handleChange: PropTypes.func
};

export default TopListSettings;

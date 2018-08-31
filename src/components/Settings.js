import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyledSettings, Container } from '../styles/StyledSettings';
import Button from '../styles/Button';
import { dynamicColumns } from '../utilities/Fields';
import Checkbox from './Checkbox';
import { saveSettings } from '../utilities/store';
import { setExtraColumns } from '../utilities/Functions';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.saveSettings = this.saveSettings.bind(this);
    }
    saveSettings(){
        const { numberOfDice, columnsToAdd } = this.props;
        saveSettings(numberOfDice, columnsToAdd);
        setExtraColumns(columnsToAdd);
    }
    render(){
        const { numberOfDice, columnsToAdd, handleChange } = this.props;
        return(
            <StyledSettings>
                <h1>Dobro došli u podešavanja!</h1>
                <div>
                    <h2>Broj kockica:</h2>
                    <select name='numberOfDice' value={numberOfDice} onChange={handleChange}>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                    </select>
                </div>
                <div>
                    <h2>Izaberi kolone:</h2>
                    {
                        dynamicColumns.map(item => (
                            <Container key={Object.keys(item)[0]}>
                                <Checkbox
                                    type='checkbox'
                                    name={Object.keys(item)[0]}
                                    checked={columnsToAdd[Object.keys(item)[0]]}
                                    onChange={handleChange}
                                />
                                {Object.keys(item)[0]}
                            </Container>
                        ))
                    }
                </div>
                <Link to='/'><Button onClick={this.saveSettings}>Save</Button></Link>
            </StyledSettings>
        );
    }
}

Settings.propTypes={
    numberOfDice: PropTypes.string.isRequired,
    columnsToAdd: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Settings;

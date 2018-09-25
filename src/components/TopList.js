import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledTopList from '../styles/StyledTopList';
import { Link } from 'react-router-dom';
import TopListSettings from './TopListSettings';
import DisplayTopList from './DisplayTopList';
import Button from '../styles/Button';
import { saveTopListSettings, getDataSettings } from '../utilities/store';

class TopList extends Component{
    constructor(props){
        super(props);
        const dataSettings = getDataSettings('topListSettings');
        this.state={
            localNumberOfDice: dataSettings['localNumberOfDice'] || '6',
            localNumberOfColumns: dataSettings['localNumberOfColumns'] || '7',
            numberOfResults: dataSettings['numberOfResults'] || '10',
            showTopListSettings: false
        };
        this.handleChange=this.handleChange.bind(this);
        this.toggleTopListSettings=this.toggleTopListSettings.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        saveTopListSettings(name, value);
        this.setState({
            [name]: value
        });
    }
    toggleTopListSettings() {
        this.setState({
            showTopListSettings: !this.state.showTopListSettings
        });
    }
    render(){
        const { localNumberOfDice, localNumberOfColumns, numberOfResults, showTopListSettings } = this.state;

        return(
            <StyledTopList>
                <TopListSettings
                    showTopListSettings={showTopListSettings}
                    localNumberOfDice={localNumberOfDice}
                    localNumberOfColumns={localNumberOfColumns}
                    numberOfResults={numberOfResults}
                    toggleTopListSettings={this.toggleTopListSettings}
                    handleChange={this.handleChange}
                />
                <DisplayTopList
                    localNumberOfDice={localNumberOfDice}
                    localNumberOfColumns={localNumberOfColumns}
                    numberOfResults={numberOfResults}
                />
                <Link to='/'><Button>Nazad</Button></Link>
            </StyledTopList>
        );
    }
}

TopList.propTypes={
    totalResult: PropTypes.number,
    numberOfDice: PropTypes.string,
    numberOfColumns: PropTypes.number,
    match: PropTypes.object
};

export default TopList;

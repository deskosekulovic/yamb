import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledTopList from '../styles/StyledTopList';
import { Link } from 'react-router-dom';
import TopListSettings from './TopListSettings';
import DisplayTopList from './DisplayTopList';
import Button from '../styles/Button';
import { saveTopListSettings, getDataSettings } from '../utilities/store';

class TopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localNumberOfDice: '6',
      localNumberOfColumns: '7',
      numberOfResults: '10',
      showTopListSettings: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleTopListSettings = this.toggleTopListSettings.bind(this);
  }
  componentDidMount() {
    const dataSettings = getDataSettings('topListSettings');
    const localNumberOfDice =
      dataSettings['localNumberOfDice'] || this.state.localNumberOfDice;
    const localNumberOfColumns =
      dataSettings['localNumberOfColumns'] || this.state.localNumberOfColumns;
    this.setState({
      localNumberOfDice,
      localNumberOfColumns
    });
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
  render() {
    const {
      localNumberOfDice,
      localNumberOfColumns,
      numberOfResults,
      showTopListSettings
    } = this.state;
    const data = getDataSettings(localNumberOfDice)[localNumberOfColumns];
    return (
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
          data={data}
        />
        <Link to="/">
          <Button>Nazad</Button>
        </Link>
      </StyledTopList>
    );
  }
}

TopList.propTypes = {
  totalResult: PropTypes.number,
  numberOfDice: PropTypes.string,
  numberOfColumns: PropTypes.number,
  match: PropTypes.object
};

export default TopList;

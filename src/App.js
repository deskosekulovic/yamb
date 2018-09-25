import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { theme } from './styles/App';
import Main from './components/Main';
import Settings from './components/Settings';
import TopList from './components/TopList';
import { setExtraColumns } from './utilities/Functions';
import { getDataSettings } from './utilities/store';
import { columns, rowsToSelect } from './utilities/Fields';

const dataSettings = getDataSettings('dataSettings');

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfDice: dataSettings['numberOfDice'] || '6'
        };
        this.handleChange=this.handleChange.bind(this);
    }
    componentDidMount() {
        const rest = dataSettings['columnsToAdd'];
        this.setState({...rest});
        setExtraColumns({...rest});
    }
    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }
    render() {
        const { numberOfDice, ...rest } = this.state;
        let bonusLength = 0;
        Object.keys(rest).map(item=>{
            rest[item] && bonusLength++;
        });
        const numberOfFields = (columns.length - 1 + bonusLength) * rowsToSelect.length;
        return (
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route
                        exact path='/'
                        render={props=>
                            <Main
                                {...props}
                                columns={columns}
                                columnsToAdd={rest}
                                numberOfColumns={columns.length-1+bonusLength}
                                numberOfDice={numberOfDice}
                                numberOfFields={numberOfFields}
                            />}
                    />
                    <Route
                        path='/settings'
                        render={props=>
                            <Settings
                                {...props}
                                columnsToAdd={rest}
                                numberOfDice={numberOfDice}
                                handleChange={this.handleChange}
                            />}
                    />
                    <Route
                        path='/toplists'
                        render={props=>
                            <TopList
                                {...props}
                                numberOfColumns={columns.length-1+bonusLength}
                                columnsToAdd={rest}
                                numberOfDice={numberOfDice}
                            />}
                    />
                </Switch>
            </ThemeProvider>
        );
    }
}

injectGlobal`
  * {
    margin: 0px;
    padding: 0px;
  }
  body {
    background-color: #DCDCDC;
  }
`;

export default App;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledTopList, { TopListSettings, Table } from '../styles/StyledTopList';
import { saveData } from '../utilities/store';
import { Link } from 'react-router-dom';
import Button from '../styles/Button';

class TopList extends Component{
    constructor(props){
        super(props);
        this.state={
            data:{},
            localNumberOfDice: '6',
            localNumberOfColumns: '7'
        };
        this.handleChange=this.handleChange.bind(this);
    }
    componentDidMount(){
        const { data } = this.state;
        const { totalResult, numberOfDice, numberOfColumns, match } = this.props;
        if(match.path==='/'){
            let name=prompt('Unesite ime', '').trim();
            name = name.length>0 ? name : 'Neznani junak';
            const columns = ((data || {})[numberOfDice] || {})[numberOfColumns];
            this.setState({
                data:{...data, [numberOfDice]:{...data[numberOfDice],[numberOfColumns]:{...columns,[totalResult]:name}}}
            });
            saveData(name,totalResult, numberOfDice, numberOfColumns);
        }

    }
    handleChange(e){
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    render(){
        const { totalResult, numberOfDice, numberOfColumns, match } = this.props;
        const { localNumberOfDice, localNumberOfColumns } = this.state;
        let diceNumber = (match.path==='/toplists') ? localNumberOfDice : numberOfDice;
        let columnNumber = (match.path==='/toplists') ? localNumberOfColumns : numberOfColumns;
        let message = (match.path==='/toplists') ? 'Još niste odigrali nijednu partiju!' : 'Niste u top 10!';
        let listLength = (match.path==='/toplists') ? 20 : 10;
        let sortedResults;
        let dataBase;
        if(JSON.parse(localStorage.getItem('data'))){
            dataBase = JSON.parse(localStorage.getItem('data'));
            const results = ((dataBase || {})[diceNumber] || {})[columnNumber];
            sortedResults = results && Object.keys(results).reverse().slice(0,listLength);
        }
        return(
            <StyledTopList center={match.path==='/toplists'}>
                {(match.path==='/toplists') &&
                <TopListSettings>
                    <h2>Broj kockica:</h2>
                    <form>
                        {[5,6].map(i=>{
                            return (
                                <label key={i}>
                                    <input
                                        type='radio'
                                        name='localNumberOfDice'
                                        value={i}
                                        checked={localNumberOfDice==i}
                                        onChange={this.handleChange}
                                    />
                                    {i}
                                </label>
                            );
                        })}
                    </form>
                    <h2>Broj kolona:</h2>
                    <form>
                        {[4,5,6,7].map(i=>{
                            return (
                                <label key={i}>
                                    <input
                                        type='radio'
                                        name='localNumberOfColumns'
                                        value={i}
                                        checked={localNumberOfColumns==i}
                                        onChange={this.handleChange}
                                    />
                                    {i}
                                </label>
                            );
                        })}
                    </form>
                </TopListSettings>}

                <h2>Lista sa { columnNumber } kolona i {diceNumber} kockica:</h2>
                {sortedResults && (sortedResults.length<10 || totalResult>=sortedResults[9] || (match.path==='/toplists'))  ?
                    <Table>
                        <tbody>
                            <tr>
                                <th>Mesto</th>
                                <th>Ime</th>
                                <th>Bodovi</th>
                            </tr>
                            {
                                sortedResults.map(
                                    (rez,i)=>
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{dataBase[diceNumber][columnNumber][rez]}</td>
                                            <td>{rez}</td>
                                        </tr>

                                )
                            }
                        </tbody>
                    </Table>
                    : <h2>{message}</h2>
                }
                {match.path==='/toplists' && <Link to='/'><Button>Nazad</Button></Link>}
            </StyledTopList>
        );
    }
}

TopList.propTypes={
    totalResult: PropTypes.number,
    numberOfDice: PropTypes.string.isRequired,
    numberOfColumns: PropTypes.number,
    match: PropTypes.object
};

export default TopList;

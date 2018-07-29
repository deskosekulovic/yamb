import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../styles/StyledTopList';
import { saveData } from '../utilities/store';

class TopList extends Component{
    constructor(props){
        super(props);
        this.state={
            data:{}
        };
    }
    componentDidMount(){
        const { data } = this.state;
        const { totalResult } = this.props;
        let name=prompt('Unesite ime', 'Đika');
        this.setState({
            data:{...data, [totalResult]:name}
        });
        saveData(name,totalResult);
    }
    render(){
        const { totalResult } = this.props;
        let sortedResults;
        const dataBase = JSON.parse(localStorage.getItem('data'));
        if(dataBase){
            const results = Object.keys(dataBase);
            sortedResults = results.reverse().slice(0,10);
        }
        return(
            <div>
                {sortedResults && (sortedResults.length<10 || totalResult>=sortedResults[9]) ?
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
                                            <td>{dataBase[rez]}</td>
                                            <td>{rez}</td>
                                        </tr>

                                )
                            }
                        </tbody>
                    </Table>
                    : <h2>Niste u top 10!</h2>
                }
            </div>
        );
    }
}

TopList.propTypes={
    totalResult: PropTypes.number.isRequired
};

export default TopList;

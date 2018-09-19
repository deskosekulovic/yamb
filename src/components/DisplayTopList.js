import React from 'react';
import PropTypes from 'prop-types';
import { StyledDisplayTopList, Table } from '../styles/StyledTopList';

const DisplayTopList = ({ localNumberOfDice, localNumberOfColumns, numberOfResults }) => {
    let sortedResults, dataBase;
    if(JSON.parse(localStorage.getItem('data'))){
        dataBase = JSON.parse(localStorage.getItem('data'));
        const results = ((dataBase || {})[localNumberOfDice] || {})[localNumberOfColumns];
        sortedResults = results && Object.keys(results).reverse().slice(0,numberOfResults);
    }
    return (
        <StyledDisplayTopList>
            <h2>Lista sa { localNumberOfColumns } kolona i {localNumberOfDice} kockica</h2>
            <br />
            <h2>Top { numberOfResults }</h2>
            {sortedResults && sortedResults.length>0  ?
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
                                        <td>{dataBase[localNumberOfDice][localNumberOfColumns][rez]}</td>
                                        <td>{rez}</td>
                                    </tr>

                            )
                        }
                    </tbody>
                </Table>
                : <h2>{'Još niste odigrali nijednu partiju!'}</h2>
            }
        </StyledDisplayTopList>
    );
};

DisplayTopList.propTypes={
    localNumberOfDice: PropTypes.string,
    localNumberOfColumns: PropTypes.string,
    numberOfResults: PropTypes.string
};

export default DisplayTopList;

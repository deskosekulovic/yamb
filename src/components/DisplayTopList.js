import React from 'react';
import PropTypes from 'prop-types';
import { StyledDisplayTopList, Table } from '../styles/StyledTopList';

const DisplayTopList = ({
  localNumberOfDice,
  localNumberOfColumns,
  numberOfResults,
  data
}) => {
  const sortedResults =
    data &&
    Object.keys(data)
      .reverse()
      .slice(0, numberOfResults);
  return (
    <StyledDisplayTopList>
      <h2>
        Lista sa {localNumberOfColumns} kolona i {localNumberOfDice} kockica
      </h2>
      <br />
      <h2>Top {numberOfResults}</h2>
      {sortedResults && sortedResults.length > 0 ? (
        <Table>
          <tbody>
            <tr>
              <th>Mesto</th>
              <th>Ime</th>
              <th>Bodovi</th>
            </tr>
            {sortedResults.map((rez, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{data[rez]}</td>
                <td>{rez}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h2>{'Još niste odigrali nijednu partiju!'}</h2>
      )}
    </StyledDisplayTopList>
  );
};

DisplayTopList.propTypes = {
  localNumberOfDice: PropTypes.string.isRequired,
  localNumberOfColumns: PropTypes.string.isRequired,
  numberOfResults: PropTypes.string.isRequired,
  data: PropTypes.object
};

export default DisplayTopList;

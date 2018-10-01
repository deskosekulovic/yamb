import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import { rows } from '../utilities/Fields';
import { decodeHTML } from '../utilities/Functions';

const Fields = ({
  handleInput,
  fields,
  permission,
  rollCounter,
  najavljeno,
  handleMouseOver,
  handleMouseOut,
  columns
}) => (
  <div style={{ gridArea: 'field' }}>
    {rows.map(row => {
      const rowLabel = row.slice(0, 4) === 'suma' ? decodeHTML('&sum;') : row;
      return (
        <div key={row} id={row}>
          {columns.map(column => (
            <Field
              key={Object.keys(column)}
              id={`${Object.keys(column)}-${row}`}
              row={row}
              column={Object.keys(column)[0]}
              label={decodeHTML(Object.values(column)[0]) || rowLabel}
              value={fields}
              permission={permission}
              rollCounter={rollCounter}
              najavljeno={najavljeno}
              handleInput={handleInput}
              handleMouseOver={handleMouseOver}
              handleMouseOut={handleMouseOut}
            />
          ))}
        </div>
      );
    })}
  </div>
);

Fields.propTypes = {
  handleInput: PropTypes.func,
  handleMouseOver: PropTypes.func,
  handleMouseOut: PropTypes.func,
  fields: PropTypes.object,
  permission: PropTypes.object,
  columns: PropTypes.array,
  rollCounter: PropTypes.number,
  najavljeno: PropTypes.bool
};

export default Fields;

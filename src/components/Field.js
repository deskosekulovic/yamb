import React from 'react';
import PropTypes from 'prop-types';
import { StyledField } from '../styles/StyledField';

const Field = ({ id, value, permission, row, column, rollCounter, najavljeno, handleInput, handleMouseOver, handleMouseOut }) => (
    <StyledField
        id={id}
        row={row}
        column={column}
        permission={permission && permission[id]}
        disabled={(permission!==undefined && !permission[id])}
        rollCounter={rollCounter}
        najavljeno={najavljeno}
        onClick={handleInput}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
    >
        {value[id]}&nbsp;
    </StyledField>
);

Field.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.object,
    permission: PropTypes.object,
    row: PropTypes.string,
    rollCounter: PropTypes.number,
    column: PropTypes.string,
    najavljeno: PropTypes.bool,
    handleInput: PropTypes.func,
    handleMouseOver: PropTypes.func,
    handleMouseOut: PropTypes.func
};

export default Field;

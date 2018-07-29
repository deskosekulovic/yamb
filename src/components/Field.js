import React from 'react';
import PropTypes from 'prop-types';
import { StyledField } from '../styles/App';

const Field = ({ id, value, permission }) => (
    <StyledField
        id={id}
        permission={permission.per && permission.per[id]}
        disabled={(permission.per!==undefined && !permission.per[id])}
    >
        <b>{value[id]}</b>&nbsp;
    </StyledField>
);

Field.propTypes = {
    id: PropTypes.string.isRequired,
    handleInput: PropTypes.func,
    value: PropTypes.object,
    permission: PropTypes.object
};

export default Field;

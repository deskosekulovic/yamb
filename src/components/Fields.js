import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RowName, ColumnName, StyledField } from '../styles/App';
import Field from './Field';
import { rows, columns } from '../utilities/Fields';

class Fields extends Component {
    render(){
        const { handleInput, fields, permission } = this.props;
        return(
            <div>
                <ColumnName>
                    <StyledField disabled={true}>&nbsp;</StyledField>
                    <StyledField disabled={true}>&darr;</StyledField>
                    <StyledField disabled={true}>&darr; &uarr;</StyledField>
                    <StyledField disabled={true}>&uarr;</StyledField>
                    <StyledField disabled={true}>N</StyledField>
                    <StyledField disabled={true}>R</StyledField>
                    <StyledField disabled={true}>&harr;</StyledField>
                    <StyledField disabled={true}>&#8597;</StyledField>
                </ColumnName>
                {rows.map(row => {
                    return(
                        <div key={row} id={row} onClick={handleInput}>
                            <RowName disabled={true}>{row}</RowName>
                            {columns.map(column =>
                                <Field
                                    key={column}
                                    id={`${column}-${row}`}
                                    value={fields}
                                    permission={permission}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        );


    }
}

Fields.propTypes = {
    handleInput: PropTypes.func,
    fields: PropTypes.object,
    permission: PropTypes.object
};

export default Fields;

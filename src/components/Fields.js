import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RowName, ColumnName, StyledField } from '../styles/StyledField';
import Field from './Field';
import { rows, columns } from '../utilities/Fields';
import { decodeHTML } from '../utilities/Functions';

class Fields extends Component {
    render(){
        const { handleInput, fields, permission, rollCounter, najavljeno, handleMouseOver, handleMouseOut } = this.props;
        let { columnsToAdd } = this.props;
        let extraColumns=Object.keys(columnsToAdd);
        let mergedColumns=[...columns];
        extraColumns.map(
            item=>{
                if(columnsToAdd[item]){
                    mergedColumns=[...mergedColumns,...[{[item]:item=='rucno'?'R':item}]];
                }
            }
        );
        return(
            <div style={{'gridArea': 'field'}}>
                <ColumnName>
                    <StyledField row={'columnName'} disabled={true}>&nbsp;</StyledField>
                    {mergedColumns.map((column,i) =>
                        <StyledField
                            key={i}
                            disabled={true}
                            row={'columnName'}
                        >{decodeHTML(Object.values(column))}</StyledField>
                    )}
                </ColumnName>
                {rows.map(row => {
                    return(
                        <div key={row} id={row}>
                            <RowName
                                row={row}
                                disabled={true}
                            >
                                {row.slice(0,4)==='suma' ? decodeHTML('&sum;') : row}
                            </RowName>
                            {mergedColumns.map(column =>
                                <Field
                                    key={Object.keys(column)}
                                    id={`${Object.keys(column)}-${row}`}
                                    row={row}
                                    column={Object.keys(column)[0]}
                                    value={fields}
                                    permission={permission}
                                    rollCounter={rollCounter}
                                    najavljeno={najavljeno}
                                    handleInput={handleInput}
                                    handleMouseOver={handleMouseOver}
                                    handleMouseOut={handleMouseOut}
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
    handleMouseOver: PropTypes.func,
    handleMouseOut: PropTypes.func,
    fields: PropTypes.object,
    permission: PropTypes.object,
    columnsToAdd: PropTypes.object,
    rollCounter: PropTypes.number,
    najavljeno: PropTypes.bool
};

export default Fields;

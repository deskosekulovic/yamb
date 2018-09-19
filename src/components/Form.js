import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ array, name, value, handleChange }) => (
    <form>
        {array.map(i=>{
            return (
                <label key={i}>
                    <input
                        type='radio'
                        name={name}
                        value={i}
                        checked={value==i}
                        onChange={handleChange}
                    />
                    {i}
                </label>
            );
        })}
    </form>
);

Form.propTypes={
    array: PropTypes.array,
    name: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func
};

export default Form;

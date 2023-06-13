import React from "react";
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({value, onChange }) =>{
    return (
        <>
            <h2 className={css.FilterH}> Find contacts by name </h2>
            <label>
                <input type="text" value={value} onChange={onChange} className={css.FilterInput} />
            </label>
        </>
    )
}
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Filter;
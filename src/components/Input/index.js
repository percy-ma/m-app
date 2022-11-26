import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Input = (props) => {
  const { value = '', label = '', type = 'text', onValidate, error, ...rest } = props;

  const blurHandler = () => {
    onValidate && onValidate();
  };

  return (
    <div className="app-input">
      <input
        type={type}
        value={value}
        onBlur={() => blurHandler()}
        className={`${value ? 'has-value' : ''} ${error ? 'has-error' : ''}`}
        {...rest}
      />
      {label && <label>{label}</label>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
};

export default Input;

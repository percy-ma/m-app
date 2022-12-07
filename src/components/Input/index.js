import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Input = (props) => {
  const {
    value = '',
    label = '',
    type = 'text',
    onValidate,
    error,
    ...rest
  } = props;
  const [passwordType, setPasswordType] = useState('password');

  const blurHandler = () => {
    onValidate && onValidate();
  };

  const togglePasswordVisible = (e) => {
    e.stopPropagation()
    passwordType === 'password'
      ? setPasswordType('text')
      : setPasswordType('password');
  };

  return (
    <div className="app-input">
      <input
        type={type !== 'password' ? type : passwordType}
        value={value}
        onBlur={() => blurHandler()}
        className={`${value ? 'has-value' : ''} ${error ? 'has-error' : ''}`}
        {...rest}
      />
      {type === 'password' && (
        <div className={`password-visible ${passwordType!=='password'&&'visible'}`} onClick={togglePasswordVisible}></div>
      )}
      {label && <label>{label}</label>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
};

export default Input;

import React from 'react';
import './index.scss';

const Input = (props) => {
  const { value = '', onValidate, ...rest } = props;

  const blurHandler = () => {
    onValidate && onValidate();
  };
  
  return (
    <input
      value={value}
      className="app-input"
      onBlur={() => blurHandler()}
      {...rest}
    />
  );
};

export default Input;

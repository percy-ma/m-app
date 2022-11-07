import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const AppSelect = (props) => {
  const {
    children,
    name,
    onChange,
    onValidate,
    options,
    placeholder = 'Please Select',
    ...rest
  } = props;
  const [optionShow, setOptionShow] = useState(false);
  const [value, setValue] = useState('');
  const [text, setText] = useState('');

  const toggleOptions = () => {
    setOptionShow(!optionShow);
  };

  const selectHandle = (option) => {
    setOptionShow(false);
    onChange(option.value);
    setValue(option.value);
    setText(option.text);
    onValidate && onValidate();
  };

  return (
    <div className="app-select">
      <div
        className={optionShow ? "app-select-input active" : "app-select-input"}
        onClick={() => {
          toggleOptions();
        }}
        {...rest}
      >
        {placeholder && value === '' && (
          <span className="app-select-placeholder">{placeholder}</span>
        )}
        {value && <span className="app-select-value">{text}</span>}
      </div>
      <div
        className={optionShow ? 'app-options active' : 'app-options'}
      >
        {options.map((option) => (
          <div
            className="app-option"
            key={option.value}
            value={option.value}
            onClick={() => selectHandle(option)}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>
  );
};

AppSelect.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default AppSelect;

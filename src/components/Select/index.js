import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const AppSelect = (props) => {
  const {
    label,
    onChange,
    onValidate,
    error,
    options,
    selectValue,
    showArrow = true,
    selectClassName = '',
    selectActiveClassName = '',
    optionsClassName = '',
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

  useEffect(() => {
    onChange(selectValue);
    setValue(selectValue);
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === selectValue) {
        setText(options[i].text);
        break;
      }
    }
  }, [selectValue])

  useEffect(() => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].default) {
        onChange(options[i].value);
        setValue(options[i].value);
        setText(options[i].text);
        break;
      }
    }
  }, []);

  return (
    <div
      className={`app-select ${error ? 'has-error' : ''} ${selectClassName} ${optionShow ? selectActiveClassName : ''}`}
      onClick={() => {
        toggleOptions();
      }}
    >
      <div
        className={`app-select-input ${optionShow ? 'active' : ''} ${
          showArrow ? 'arrow-show' : ''
        }`}
      >
        {value && <span className="app-select-value">{text}</span>}
      </div>
      <div
        className={`app-options ${
          optionShow ? 'active' : ''
        } ${optionsClassName}`}
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
      {label && (
        <label className={optionShow || value ? 'transform' : ''}>
          {label}
        </label>
      )}
    </div>
  );
};

AppSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  selectClassName: PropTypes.string,
  selectActiveClassName: PropTypes.string,
  optionsClassName: PropTypes.string,
  showArrow: PropTypes.bool,
  onChange: PropTypes.func,
};

export default AppSelect;

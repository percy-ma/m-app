import './index.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function App_Input(props) {
  const {
    name,
    value,
    label,
    placeholder,
    onChange,
    onFocus,
    onBlur,
  } = props;

  const [val, setVal] = useState(value);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
      setVal(e.target.value);
    }
  };
  const handleFocus = () => {
    onFocus && onFocus();
  };
  const handleBlur = () => {
    onBlur && onBlur();
  };

  return (
    <div className="app-input">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

App_Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

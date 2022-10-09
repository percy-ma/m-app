import './index.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function App_Input(props) {
  const { name, value, label, placeholder, onChange, onBlur, onSubmit } = props;

  const [val, setVal] = useState(value);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
      setVal(e.target.value);
    }
  };
  const handleBlur = () => {
    onBlur && onBlur();
  };
  const handleSubmit = (e) => {
    if(onSubmit) {
      e.preventDefault();
      onSubmit()
    }
  };

  return (
    <div className="app-input">
      {label && <label htmlFor={name}>{label}</label>}
      {props.type !== 'submit' ? (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={val}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <input type="submit" value={value} onClick={handleSubmit} />
      )}
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
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func,
};

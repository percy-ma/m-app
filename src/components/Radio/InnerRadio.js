import PropTypes from 'prop-types';

export default function Radio(props) {
  const { name, value, children, defaultChecked, onValidate, onChange } = props;

  const changeHandler = (e) => {
    onChange(e.target.value)
    onValidate && onValidate()
  }

  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        onChange={changeHandler}
        defaultChecked={defaultChecked}
        className="app-radio"
      ></input>
      <span>{children}</span>
    </label>
  );
}

Radio.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  defaultChecked: PropTypes.bool
};

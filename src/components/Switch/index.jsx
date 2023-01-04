import PropTypes from 'prop-types';
import './index.scss';

function Switch(props) {
  const changeVal = (e) => {
    console.log(e.target);  
  };
  return (
    <>
      <label className="app-switch">
        <input type="checkbox" onChange={changeVal} />
        <span className="app-switch-box">
          <span className="app-switch-handle"></span>
        </span>
      </label>
    </>
  );
}

Switch.propTypes = {
  onChange: PropTypes.func,
  checkedValue: PropTypes.string,
  uncheckedValue: PropTypes.string
};

export default Switch;

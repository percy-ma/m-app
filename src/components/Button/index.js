import './index.scss';
import PropTypes from 'prop-types';

function Button(props) {
  const { children, className = '', type, ...args } = props;
  return (
    <button
      className={`app-button ${className} ${
        type === 'primary' || type === 'submit' ? 'primary-btn' : ''
      } ${type === 'link' ? 'link-btn' : ''}`}
      {...args}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;

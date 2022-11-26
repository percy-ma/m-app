import './index.scss';

function Button(props) {
  const { children, className = '', type, ...args } = props;
  return (
    <button
      className={`app-button ${className} ${
        type === 'primary' || type === 'submit' ? 'primary-btn' : ''
      }`}
      {...args}
    >
      {children}
    </button>
  );
}

export default Button;

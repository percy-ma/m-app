import PropTypes from 'prop-types';

export default function Message(props) {
  const { type, text } = props;

  return (
    <div className={`message message-${type}`}>
      <div className="text">{text}</div>
    </div>
  );
};

Message.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string
}



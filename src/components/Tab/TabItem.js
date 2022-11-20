import PropTypes from 'prop-types';

function TabItem({ children }) {
  return <div>{children}</div>;
}
TabItem.displayName = 'tabItem';

TabItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TabItem;

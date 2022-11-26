import PropTypes from 'prop-types';

function TabItem({ children }) {
  return <>{children}</>;
}
TabItem.displayName = 'tabItem';

TabItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TabItem;

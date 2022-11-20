import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import TabItem from './TabItem';
import './index.scss'

function Tab(props) {
  const { children, onChange } = props;
  const activeIndex = useRef(null);
  const [, forceUpdate] = useState({});
  const tabList = [];
  let renderChildren = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type.displayName === 'tabItem') {
      const { props } = child;
      const { name, label } = props;
      const tabItem = {
        name,
        label,
        active: name === activeIndex.current,
        component: child,
      };
      if (name === activeIndex.current) renderChildren = child;
      tabList.push(tabItem);
    }
  });
  if (!renderChildren && tabList.length > 0) {
    const firstChildren = tabList[0];
    renderChildren = firstChildren.component;
    activeIndex.current = firstChildren.component.props.name;
    firstChildren.active = true;
  }

  const changeTab = (name) => {
    activeIndex.current = name;
    forceUpdate({});
    onChange && onChange(name);
  };

  return (
    <div>
      <div className="tab-header">
        {tabList.map((tab, index) => (
          <div
            className={tab.active ? "tab-header-item active" : "tab-header-item"}
            key={index}
            onClick={() => changeTab(tab.name)}
          >
            <div>{tab.label}</div>
          </div>
        ))}
      </div>
      <div>{renderChildren}</div>
    </div>
  );
}

Tab.Item = TabItem;
Tab.propTypes = {
  onChange: PropTypes.func,
};

export default Tab;

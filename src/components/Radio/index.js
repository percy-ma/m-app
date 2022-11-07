import React from 'react';
import PropTypes from 'prop-types';
import InnerRadio from './InnerRadio';

const Group = (props) => {
  const { children, name, onChange, onValidate, ...rest } = props;
  return (
    <div className="app-radio-group" {...rest}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          name: name ? name : 'radio',
          onChange,
          onValidate,
        });
      })}
    </div>
  );
};

Group.propTypes = {
  name: PropTypes.string,
};

const Radio = InnerRadio;
Radio.Group = Group;
export default Radio;

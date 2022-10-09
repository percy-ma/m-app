import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FormItem from './FormItem';
import './index.scss';

const FormContext = React.createContext({
  values: {},
  onChange: () => {},
  onSubmit: () => {}
});

export function Form(props) {
  const { children, values, onChange, onSubmit, ...rest } = props;
  const value = { values, onChange, onSubmit };

  return (
    <FormContext.Provider value={value}>
      <form className="app-form" {...rest}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

Form.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export function withFormContext(Component) {
  return (props) => {
    const { name } = props;
    const { values, onChange, onSubmit } = useContext(FormContext);
    return (
      <Component
        value={values[name]}
        onChange={onChange}
        onSubmit={onSubmit}
        {...props}
      />
    );
  };
}
export const FormItemContext = withFormContext(FormItem);

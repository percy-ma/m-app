import React, { useState, useImperativeHandle } from 'react';
import { Field } from 'rc-field-form';
import PropTypes from 'prop-types';
import Schema from 'async-validator';

const FormItem = React.forwardRef((props, ref) => {
  const { children, name, label, rules, className = '', form } = props;

  const [error, setError] = useState(null);

  useImperativeHandle(ref, () => {
    return {
      validateField,
    };
  });

  const validateField = async () => {
    if (rules) {
      const validator = new Schema({ [name]: rules });
      try {
        await validator.validate({ [name]: form.getFieldValue(name) });
        setError(null);
      } catch (err) {
        const { errors } = err;
        setError(errors[0]);
        return false;
      }
    }
    return true;
  };

  const child = React.Children.only(children);
  return (
    <div className={`app-form-item ${className} ${error ? 'is-error' : ''}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <Field name={name}>
        {React.cloneElement(child, {
          name,
          error,
          onValidate: validateField,
        })}
      </Field>
      <span className={`error-msg ${error&&'show'}`}>{error && error.message}</span>
    </div>
  );
});

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  rules: PropTypes.array,
};

export default FormItem;

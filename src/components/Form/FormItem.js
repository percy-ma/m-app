import React, { useState, useImperativeHandle } from 'react';
import { Field } from 'rc-field-form';
import PropTypes from 'prop-types';
import Schema from 'async-validator';

const FormItem = React.forwardRef((props, ref) => {
  const { children, name, label, rules, form } = props;

  const [error, setError] = useState(null);

  useImperativeHandle(ref, () => {
    return {
      validateField,
    };
  });

  const validateField = async () => {
    console.log(form.getFieldValue(name))
    const validator = new Schema({ [name]: rules });
    try {
      await validator.validate({ [name]: form.getFieldValue(name) });
      setError(null);
    } catch (err) {
      const { errors } = err;
      setError(errors[0]);
      return false;
    }
    return true;
  };

  const child = React.Children.only(children);
  return (
    <div className={error ? 'app-form-item is-error' : 'app-form-item'}>
      {label && <label htmlFor={name}>{label}</label>}
      <Field name={name}>
        {React.cloneElement(child, {
          name,
          onValidate: validateField,
        })}
      </Field>
      {error && <span className="error-msg">{error.message}</span>}
    </div>
  );
});

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.array,
};

export default FormItem;

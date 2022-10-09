import { Input } from '../../components';
import PropTypes from 'prop-types';

export default function FormItem(props) {
  const { name, type, label, value, required, onChange, onSubmit, ...rest } =
    props;
  const changeHandler = (e) => {
    if (onChange) {
      onChange(name, e);
    }
  };
  const submitHandler = () => {
    onSubmit && onSubmit();
  };
  const validateHandler = () => {
    let reg;
    if (required && value == '') {
      console.log('no');
    } else {
      if (type === 'email') {
        reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (reg.test(value)) {
          console.log('yes');
        } else console.log('no');
      }
    }
  };

  if (type == 'submit') {
    return (
      <div className="app-form-item">
        <Input
          type="submit"
          value={value || ''}
          onSubmit={submitHandler}
          {...rest}
        />
      </div>
    );
  } else {
    return (
      <div className="app-form-item">
        {label && <label htmlFor={name}>{label}</label>}
        <Input
          name={name}
          value={value || ''}
          onChange={changeHandler}
          onBlur={validateHandler}
          {...rest}
        />
      </div>
    );
  }
}

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

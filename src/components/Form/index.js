import React, { useState, useEffect, useImperativeHandle } from 'react';
import RcForm from 'rc-field-form';
import PropTypes from 'prop-types';
import AppFormItem from './FormItem';
import { Button } from '../index'
import './index.scss';

function AppForm(props, ref) {
  const {
    children,
    onFinish,
    submitBtn = 'Submit',
    hasResetBtn = false,
    resetBtn = 'Reset',
  } = props;
  const [rcform] = RcForm.useForm();
  const [refArr, setRefArr] = useState([]);

  useImperativeHandle(
    ref,
    () => ({
      resetForm
    })
  )

  useEffect(() => {
    const temp_refArr = [];
    for (let i = 0; i < React.Children.count(children); i++) {
      temp_refArr.push(React.createRef());
    }
    setRefArr(temp_refArr);
  }, []);

  const submitForm = async (e) => {
    e.preventDefault()
    let validateSuccess = true
    for (let i = 0; i < refArr.length; i++) {
      let fieldValid = await refArr[i].current.validateField()
      !fieldValid && (validateSuccess = fieldValid)
    }
    if(validateSuccess) {
      rcform.submit()
    }
  };
  const resetForm = () => {
    rcform.resetFields();
  };

  return (
    <RcForm
      form={rcform}
      className="app-form"
      onFinish={onFinish}
    >
      {React.Children.map(children, (child, index) =>
        child.props.name
          ? React.cloneElement(child, {
              form: rcform,
              ref: refArr[index],
            })
          : child
      )}
      <Button type='submit' className='form-btn' onClick={submitForm}>{submitBtn}</Button>
      {hasResetBtn && <button className='primary-btn form-btn' onClick={resetForm}>{resetBtn}</button>}
    </RcForm>
  );
}

const Form = React.forwardRef(AppForm)

Form.Item = AppFormItem;

export default Form;

Form.propTypes = {
  submitBtn: PropTypes.string,
  resetBtn: PropTypes.string,
  hasResetBtn: PropTypes.bool,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func
};

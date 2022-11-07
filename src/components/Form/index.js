import React, { useState, useEffect } from 'react';
import Form from 'rc-field-form';
import PropTypes from 'prop-types';
import AppFormItem from './FormItem';
import './index.scss';

function AppForm(props) {
  const {
    children,
    onFinish,
    submitBtn = 'Submit',
    hasResetBtn = false,
    resetBtn = 'Reset',
  } = props;
  const [form] = Form.useForm();
  const [refArr, setRefArr] = useState([]);

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
      form.submit()
    }
  };
  const resetForm = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      className="app-form"
      onFinish={onFinish}
    >
      {React.Children.map(children, (child, index) =>
        child.props.name
          ? React.cloneElement(child, {
              form,
              ref: refArr[index],
            })
          : child
      )}
      <button onClick={submitForm}>{submitBtn}</button>
      {hasResetBtn && <button onClick={resetForm}>{resetBtn}</button>}
    </Form>
  );
}

AppForm.Item = AppFormItem;

export default AppForm;

AppForm.propTypes = {
  submitBtn: PropTypes.string,
  resetBtn: PropTypes.string,
  hasResetBtn: PropTypes.bool,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
};

// import { Form, Radio } from '../../components';
import {useState} from 'react'
// import Form, { Field } from 'rc-field-form';
import { Form, Input, Select, Radio } from '../../components';

export default function Website() {
  const submit = (data) => {
    console.log(data);
  };
  const submitFailed = (value) => {
    console.log(value)
  }
  return (
    <div>
      <Form onFinish={submit} onFinishFailed={submitFailed} hasResetBtn>
        <Form.Item name="name" rules={[{required: true, message: 'Empty!'}, {max: 3, message: 'Max 3!!!'}]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" rules={[{required: true, message: 'Empty!'}]}>
          <Select options={[{value: 1, text: 1}, {value: 2, text: 2}]}/>
        </Form.Item>
        <Form.Item name='Eng' rules={[{required: true, message: 'Empty!'}]}>
          <Radio.Group>
            <Radio value='a' defaultChecked>A</Radio>
            <Radio value='b'>B</Radio>
          </Radio.Group>
        </Form.Item>
        {/* <button type='submit'>SUbmit</button> */}
      </Form>
      <ul>
        <li>
          <a href="https://dribbble.com/">Dribble</a>
        </li>
        <li>
          <a href="https://collectui.com/designs">Collect UI</a>
        </li>
        <li>
          <a href="https://www.colorsandfonts.com/">Color and Fonts</a>
        </li>
        <li>
          <a href="https://www.shapedivider.app/">Shape Divider App</a>
        </li>
        <li>
          <a href="https://www.frontendmentor.io/">Frontend Mentor</a>
        </li>
        <li>
          <a href="https://www.codewell.cc/">Codewell</a>
        </li>
      </ul>
    </div>
  );
}

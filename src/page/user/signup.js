import React from 'react';
import request from '../../api/request';
import { Form, Input, message } from '../../components';

export default function Signup() {
  const signUpSubmit = (data) => {
    request
      .post('/user/signup', {
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        email: data.email,
      })
      .then((res) => {
        message.success('Sign Up Successfully!!!');
        console.log('success', res);
      })
      .catch((err) => {
        message.error('Sign Up Failed!!!');
        console.log('error', err);
      });
  };
  return (
    <>
      <h3 className="title">Sign Up</h3>
      <Form onFinish={signUpSubmit} submitBtn="Sign Up">
        {/* First Name */}
        <Form.Item
          name="firstname"
          rules={[
            { required: true, message: 'Firstname required!!' },
          ]}
          className="form-item-name"
        >
          <Input label="Firstname"/>
        </Form.Item>
        {/* Last Name */}
        <Form.Item
          name="lastname"
          rules={[{ required: true, message: 'Lastname required!!' }]}
          className="form-item-name"
        >
          <Input label="Lastname"/>
        </Form.Item>
        {/* Email */}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Email required!!',
            },
            {
              type: 'email',
              message: 'Email invalid!!',
            },
          ]}
        >
          <Input label="Email"/>
        </Form.Item>
        {/* Password */}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Password required!!',
            },
            {
              min: 6,
              message: 'At least 6 character!',
            },
          ]}
        >
          <Input type='password' label="Password"/>
        </Form.Item>
      </Form>
    </>
  );
}

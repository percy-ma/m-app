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
          label="First Name"
          rules={[{ required: true, message: 'Please enter your first name!!' }]}
        >
          <Input />
        </Form.Item>
        {/* Last Name */}
        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter your last name!!' }]}
        >
          <Input />
        </Form.Item>
        {/* Email */}
        <Form.Item
          name="email"
          label="Email"
          rules={[{
            required: true,
            message: 'Please enter your email address!'
          }, {
            type: 'email',
            message: 'Email invalid!'
          }]}
        >
          <Input />
        </Form.Item>
        {/* Password */}
        <Form.Item
          name="password"
          label="Password"
          rules={[{
            required: true,
            message: 'Please enter your pasword!!'
          }, {
            min: 6,
            message: 'At least 6 character!'
          }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
}

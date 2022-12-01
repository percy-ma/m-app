import Cookie from 'js-cookie';
import request from '../../api/request';
import { Form, Input, message } from '../../components';
import { useReducerContext } from '../../utils/auth'

export default function Login() {
  const [state, dispatch] = useReducerContext()
  const loginSubmit = (data) => {
    console.log(data);
    request
      .post('/user/login', {
        password: data.password,
        email: data.email,
      })
      .then((res) => {
        if (res.code === 200) {
          message.success('Login Successfully!!!');
          console.log('login success', res);
          let token_expire = new Date(
            new Date() * 1 + res.data.tokenInfo.expire_in * 1000
          );
          Cookie.set('app_token', res.data.tokenInfo.token, {
            expires: token_expire,
          });
          dispatch({type: "login", payload: 'test'})
          console.log(state.authStatus)
        }
      })
      .catch((err) => {
        message.error('Login Failed!!!');
        console.log('error', err);
      });
  };
  return (
    <>
      <h3 className="title">Login</h3>
      <Form onFinish={loginSubmit} submitBtn='Login'>
        {/* Email */}
        <Form.Item
          name="email"
          // label="Email"
          rules={[{
            required: true,
            message: 'Email required!!!'
          }, {
            type: 'email',
            message: 'Email invalid!!!'
          }]}
        >
          <Input label='Email'/>
        </Form.Item>
        {/* Password */}
        <Form.Item
          name="password"
          rules={[{
            required: true,
            message: 'Password required!!!'
          }]}
        >
          <Input label="Password" type='password' />
        </Form.Item>
      </Form>
    </>
  );
}

import { useState, useEffect } from 'react';
import { Modal, Form, Input, message, Button } from '../../components';
import Cookie from 'js-cookie';
import request from '../../api/request';
import { useReducerContext } from '../../utils/auth';
import './index.scss';

function LoginModal(props) {
  const [visible, setVisible] = useState(false);

  const changeToSignUp = () => {

  }

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  useEffect(() => {
    if (Cookie.get('app_token')) {
      dispatch({
        type: 'login',
        payload: Cookie.get('app_token_username'),
      });
    }
  }, []);

  const [state, dispatch] = useReducerContext();
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
          Cookie.set(
            'app_token_username',
            res.data.userInfo.firstname + ' ' + res.data.userInfo.lastname,
            {
              expires: token_expire,
            }
          );
          dispatch({
            type: 'login',
            payload:
              res.data.userInfo.firstname + ' ' + res.data.userInfo.lastname,
          });
          props.closeModal();
        } else {

        }
      })
      .catch((err) => {
        message.error('Login Failed!!!');
        console.log('error', err);
      });
  };

  return (
    <Modal
      className="login-modal"
      visible={visible}
      onCancel={props.closeModal}
    >
      <h2 className="modal-title">Log In</h2>
      <Form onFinish={loginSubmit} submitBtn="Login">
        {/* Email */}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Email required!!!',
            },
            {
              type: 'email',
              message: 'Email invalid!!!',
            },
          ]}
        >
          <Input label="Email" />
        </Form.Item>
        {/* Password */}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Password required!!!',
            }
          ]}
        >
          <Input label="Password" type="password" />
        </Form.Item>
      </Form>
      <Button type='link'>Sign Up</Button>
    </Modal>
  );
}

export default LoginModal;

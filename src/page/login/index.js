import { useState } from 'react';
import Cookie from 'js-cookie';
import request from '../../api/request';
import { Form, FormItem } from '../../components';

export default function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [signupForm, setSignupForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChangeSignup = (name, value) => {
    let tempForm = { ...signupForm };
    tempForm[name] = value;
    setSignupForm(tempForm);
  };
  const handleSubmitSignup = () => {
    signUpSubmit(signupForm);
  };

  const handleChangeLogin = (name, value) => {
    let tempForm = { ...loginForm };
    tempForm[name] = value;
    setLoginForm(tempForm);
  };
  const handleSubmitLogin = () => {
    loginSubmit(loginForm);
  };

  const signUpSubmit = (form) => {
    request
      .post('/user/signup', {
        firstname: form.firstname,
        lastname: form.lastname,
        password: form.password,
        email: form.email,
      })
      .then((res) => {
        console.log('success', res);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  const loginSubmit = (form) => {
    request
      .post('/user/login', {
        password: form.password,
        email: form.email,
      })
      .then((res) => {
        if (res.code === 200) {
          console.log('login success', res);
          let token_expire = new Date(
            new Date() * 1 + res.tokenInfo.expire_in * 1000
          );
          Cookie.set('app_token', res.tokenInfo.token, {
            expires: token_expire,
          });
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  const logout = () => {
    Cookie.remove('app_token');
  };

  return (
    <div className="content-middle">
      <div className="form-select">
        <span onClick={() => setIsLoginForm(false)}>Sign Up</span>
        <span onClick={() => setIsLoginForm(true)}>Login</span>
      </div>
      <div className="card" style={{ display: isLoginForm ? 'none' : 'block' }}>
        <h3 className="title">Sign Up</h3>
        <Form
          onChange={handleChangeSignup}
          onSubmit={handleSubmitSignup}
          values={signupForm}
        >
          <FormItem name="firstname" label="First Name"></FormItem>
          <FormItem name="lastname" label="Last Name"></FormItem>
          <FormItem name="email" label="Email"></FormItem>
          <FormItem name="password" label="Password"></FormItem>
          <FormItem type="submit" name="submit" value="Sign Up" />
        </Form>
      </div>
      <div className="card" style={{ display: isLoginForm ? 'block' : 'none' }}>
        <h3 className="title">Login</h3>
        <Form
          onChange={handleChangeLogin}
          onSubmit={handleSubmitLogin}
          values={loginForm}
        >
          <FormItem type="email" name="email" label="Email"></FormItem>
          <FormItem name="password" label="Password"></FormItem>
          <FormItem type="submit" name="submit" value="Login" />
        </Form>
      </div>
      <button className="primary-btn" onClick={logout}>
        Log Out
      </button>
    </div>
  );
}

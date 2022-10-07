import { useState } from 'react';
import axios from 'axios';
import request from '../../api/request';
import { Input } from '../../components';

export default function Login() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [email2, setEmail2] = useState('');
  const [password2, setPassword2] = useState('');

  const signUpSubmit = (e) => {
    e.preventDefault();
    console.log(firstname, lastname, email, password);
    axios
      .post('/user/signup', {
        firstname,
        lastname,
        password,
        email,
      })
      .then((res) => {
        console.log('success', res);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  const signInSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    request
      .post('/user/login', {
        password: password2,
        email: email2,
      })
      .then((res) => {
        console.log('login success', res);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  return (
    <div className="content-middle">
      <div className="card">
        <h3 className='title'>Sign Up</h3>
        <form>
          <Input
            name="firstname"
            label="First Name"
            value={firstname}
            onChange={setFirstname}
          />
          <Input
            name="lastname"
            label="Last Name"
            value={lastname}
            onChange={setLastname}
          />
          <Input name="email" label="Email" value={email} onChange={setEmail} />
          <Input
            name="password"
            label="Password"
            value={password}
            onChange={setPassword}
          />
          <input type="submit" value="Sign Up" onClick={signUpSubmit} />
        </form>
      </div>
      <div className="card">
        <h3 className='title'>Login</h3>
        <form>
          <Input
            name="email2"
            label="Email"
            value={email2}
            onChange={setEmail2}
          />
          <Input
            name="password2"
            label="Password"
            value={password2}
            onChange={setPassword2}
          />
          <input type="submit" value="Login" onClick={signInSubmit} />
        </form>
      </div>
    </div>
  );
}

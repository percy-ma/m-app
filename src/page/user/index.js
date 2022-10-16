import { useState } from 'react';
import Cookie from 'js-cookie';
import Login from './login'
import Signup from './signup'

export default function User() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  
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
        <Signup />
      </div>
      <div className="card" style={{ display: isLoginForm ? 'block' : 'none' }}>
        <Login />
      </div>
      <button className="primary-btn" onClick={logout}>
        Log Out
      </button>
    </div>
  );
}

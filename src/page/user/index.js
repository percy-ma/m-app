import { Tab } from '../../components';
import Login from './login';
import Signup from './signup';
import './index.scss'

export default function User() {

  return (
    <div className="content-middle">
      <Tab>
        <Tab.Item name="login" label="Login">
          <div className="card user-card">
            <Login />
          </div>
        </Tab.Item>
        <Tab.Item name="signup" label="Sign Up">
          <div className="card user-card">
            <Signup />
          </div>
        </Tab.Item>
      </Tab>
    </div>
  );
}

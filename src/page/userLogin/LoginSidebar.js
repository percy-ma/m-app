import { useState } from 'react';
import Cookie from 'js-cookie';
import { useReducerContext } from '../../utils/auth';
import { Button, message } from '../../components';
import LoginModal from './LoginModal';
import './index.scss';

function LoginSidebar() {
  const [modalShow, setModalShow] = useState(false);
  const [state, dispatch] = useReducerContext();

  const logout = () => {
    Cookie.remove('app_token');
    Cookie.remove('app_token_username');
    dispatch({
      type: 'logout',
    });
    message.success('Log out successfully!')
  };
  const showLoginModal = () => {
    setModalShow(true);
  };
  return (
    <div className="sidebar-user">
      {state.userStatus ? (
        <>
          <div>{state.userName}</div>
          <Button type="link" onClick={logout}>
            Log Out
          </Button>
        </>
      ) : (
        <>
          <Button type="link" onClick={showLoginModal}>
            Log In
          </Button>
          <LoginModal
            visible={modalShow}
            closeModal={() => {
              setModalShow(false);
            }}
          ></LoginModal>
        </>
      )}
    </div>
  );
}

export default LoginSidebar;

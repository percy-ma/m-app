import { useForm } from 'react-hook-form';
import Cookie from 'js-cookie';
import request from '../../api/request';
import { message } from '../../components';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const loginSubmit = (data) => {
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
      <form onSubmit={handleSubmit(loginSubmit)}>
        <div className={!errors.email ? 'form-field' : 'form-field error'}>
          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            {...register('email', {
              required: true,
              pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            })}
          />
          {errors.email?.type === 'required' && (
            <span className="err-msg">Please enter your email address!</span>
          )}
          {errors.email?.type === 'pattern' && (
            <span className="err-msg">Email invalid</span>
          )}
        </div>

        {/* Password */}
        <div className={!errors.password ? 'form-field' : 'form-field error'}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password?.type === 'required' && (
            <span className="err-msg">Please enter your password!</span>
          )}
        </div>
        <input type="submit" value="Login" />
      </form>
    </>
  );
}

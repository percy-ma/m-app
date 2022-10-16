import { useForm } from 'react-hook-form';
import Cookie from 'js-cookie';
import request from '../../api/request';
import { message } from '../../components'

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const signUpSubmit = (data) => {
    request
      .post('/user/signup', {
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        email: data.email,
      })
      .then((res) => {
        message.success('Sign Up Successfully!!!')
        console.log('success', res);
      })
      .catch((err) => {
        message.error('Sign Up Failed!!!')
        console.log('error', err);
      });
  };
  return (
    <>
      <h3 className="title">Sign Up</h3>
      <form onSubmit={handleSubmit(signUpSubmit)}>
        {/* First Name */}
        <div className={!errors.firstname ? 'form-field' : 'form-field error'}>
          <label htmlFor="firstname">First Name</label>
          <input
            {...register('firstname', {
              required: true,
            })}
          />
          {errors.firstname?.type === 'required' && (
            <span className="err-msg">Please enter your first name!</span>
          )}
        </div>

        {/* Last Name */}
        <div className={!errors.lastname ? 'form-field' : 'form-field error'}>
          <label htmlFor="lastname">Last Name</label>
          <input {...register('lastname', { required: true })} />
          {errors.lastname?.type === 'required' && (
            <span className="err-msg">Please enter your last name!</span>
          )}
        </div>

        {/* Email */}
        <div className={!errors.email ? 'form-field' : 'form-field error'}>
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
            <span className="err-msg">Email invalid!</span>
          )}
        </div>

        {/* Password */}
        <div className={!errors.password ? 'form-field' : 'form-field error'}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors.password?.type === 'required' && (
            <span className="err-msg">Please enter your password!</span>
          )}
          {errors.password?.type === 'minLength' && (
            <span className="err-msg">At least 6 character!</span>
          )}
        </div>

        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
}

import React, { Fragment, useState, useEffect } from 'react';
import './css/register.css';
import MetaData from '../../components/MetaData';
import { NavLink } from 'react-router-dom';
import signpic from '../../assets/images/register1.svg';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, userRegister } from '../../redux/actions/userActions';

import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector(state => state.user);

  const [user, setUser] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  });

  const { fullname, username, email, password } = user;

  const registerSubmit = e => {
    e.preventDefault();
    const JSON = {
      fullname: fullname,
      username: username,
      email: email,
      password: password
    };
    dispatch(userRegister(JSON));
  };
  const registerDataChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const redirect = window.location.search ? window.location.search.split('=')[1] : '/login';
  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, redirect]);

  return (
    <Fragment>
      <MetaData title='Samadhan: Register' />
      <section className='signup'>
        <div className='container mt-3'>
          <div className='signup-content'>
            <div className='signup-form'>
              <h2 className='form-title'>Sign Up</h2>
              <form className='register-form' id='register-form' onSubmit={registerSubmit}>
                <div className='form-group'>
                  <label htmlFor='fullname' className='form-label'>
                    <i className='zmdi zmdi-account zmdi-hc-lg'></i>
                  </label>
                  <input
                    className='inputField'
                    type='text'
                    name='fullname'
                    id='fullname'
                    autoComplete='off'
                    placeholder='Full Name'
                    size='40'
                    onChange={registerDataChange}
                    value={fullname}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='name' className='form-label'>
                    <i className='zmdi zmdi-slideshow zmdi-hc-lg'></i>
                  </label>
                  <input
                    className='inputField'
                    type='text'
                    name='username'
                    id='username'
                    autoComplete='off'
                    placeholder='User Name'
                    onChange={registerDataChange}
                    value={username}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='email' className='form-label'>
                    <i className='zmdi zmdi-email zmdi-hc-lg'></i>
                  </label>
                  <input
                    className='inputEmail'
                    type='email'
                    name='email'
                    id='email'
                    autoComplete='off'
                    placeholder='Your Email'
                    onChange={registerDataChange}
                    value={email}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='password' className='form-label'>
                    <i className='zmdi zmdi-lock zmdi-hc-lg'></i>
                  </label>
                  <input
                    className='inputPassword'
                    type='password'
                    name='password'
                    id='password'
                    autoComplete='off'
                    placeholder='Password'
                    onChange={registerDataChange}
                    value={password}
                  />
                </div>

                <div className='form-group form-button'>
                  <input
                    className='inputSubmit'
                    type='submit'
                    name='signup'
                    id='signup'
                    value='register'
                  />
                </div>
              </form>
            </div>

            <div className='signup-image'>
              <figure>
                <img src={signpic} alt='registration pic' width='350px' />
              </figure>
              <NavLink to='/login' className='signup-image-link'>
                Already Have An Account
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Register;

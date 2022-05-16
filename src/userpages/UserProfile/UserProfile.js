import React, { Fragment, useEffect } from 'react';
import './css/UserProfile.css';
import Page from '../../components/Page';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// import { getUserDetails, clearErrors } from '../../redux/actions/userActions';

const UserProfile = () => {
  const navigate = useNavigate();
  let { username } = useParams();
  const dispatch = useDispatch();

  const { error, user } = useSelector(state => state.userDetail);

  const userName = username;

  useEffect(() => {
    // dispatch(getUserDetails(userName));

    if (error) {
      // dispatch(clearErrors());
    }
  }, []);

  return (
    <Fragment>
      <Page title='Samadhan: UserProfile' />

      <Page className='content-page'>
        {/* cover pic and avatar */}

        <div
          className='profile-banner'
          style={{
            background:
              'url(https://static.fandomspot.com/images/09/9101/24-zegred-black-cover-anime.jpg)'
          }}
        >
          <div className='col-sm-3 avatar-container'>
            <img
              src={
                user.profilePhoto && user.profilePhoto.hasPhoto && user.profilePhoto.url
                  ? user.profilePhoto.url
                  : 'http://www.beautifulpeople.com/cdn/beautifulpeople/images/default_profile/signup_male.png'
              }
              className='img-circle profile-avatar'
              alt='User avatar'
            />
          </div>

          <div className='profile-actions'>
            <button type='button' className='btn btn-success btn-sm'>
              <i className='fa fa-check'></i> Follow
            </button>
            <button type='button' className='btn btn-primary btn-sm'>
              <i className='fa fa-envelope'></i> Send Message
            </button>
          </div>
        </div>

        {/* profile navbar */}
        <div className='buttonNav'>
          <p>hello</p>
        </div>

        {/* User Card Info */}

        <div class='col-md-4 mb-3'>
          <div class='usercard'>
            <div className='aboutUser'>
              <p className='aboutuserpara'>About User</p>
            </div>
            <hr className='border-light m-0' />

            <div className='aboutUserDetailcard'>
              <p>I help needy people, after being paid</p>
              <p>Follower: 1B</p>
            </div>
            <hr className='border-light m-0' />
            <div className='card-body'>
              <p className='mb-2'>Name: {user.username}</p>
              <p className='mb-2'>Sector: Krishne Basantay</p>
              <p>Created Dec 12 0101</p>
            </div>
          </div>
        </div>
      </Page>
    </Fragment>
  );
};

export default UserProfile;

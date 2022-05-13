import React, { useState, useEffect } from 'react';
import '../../css/updateprofile/updateprofiledetail.css';
import { Link } from 'react-router-dom';
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, updateProfileImage } from '../../../../actions/userActions';

const UpdateProfileDetail = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const { error, isAuthenticated, user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      setUsername(user.username);
      setEmail(user.email);
      setFullName(user.fullName);
    }
  }, [user]);

  const onFormSubmit = e => {
    e.preventDefault();
    console.log('Hello');
    const userData = {
      username,
      email,
      fullName
    };
    dispatch(updateProfile(userData));
  };

  const onFileChange = e => {
    const selectedFile = e.target.files[0];

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('profileImage', selectedFile);

    // console.log(formData);

    dispatch(updateProfileImage(formData));
  };

  return (
    <div className='container-xl px-4 mt-4'>
      <hr className='mt-0 mb-4' />
      <div className='row'>
        <div className='col-xl-4'>
          {/* <!-- Profile picture card--> */}
          <div className='card mb-4 mb-xl-0'>
            <div className='card-header'>Profile Picture</div>
            <div className='card-body text-center'>
              {/* <!-- Profile picture image--> */}
              {user && user.profilePhoto && user.profilePhoto.hasPhoto ? (
                <img
                  src={user.profilePhoto.url}
                  className='img-account-profile rounded-circle mb-2'
                  alt='Profile'
                />
              ) : (
                <img
                  className='img-account-profile rounded-circle mb-2'
                  src='https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='
                  alt=''
                />
              )}
              {/* <!-- Profile picture help block--> */}
              <div className='small font-italic text-muted mb-4'>
                JPG or PNG no larger than 5 MB
              </div>
              {/* <!-- Profile picture upload button--> */}
              <input type='file' onChange={onFileChange} />
              {/* <button
                className="btn btn-primary btn-saveimg"
                onChange={""}
                type="button"
              >
                Upload new image
              </button> */}
            </div>
          </div>
        </div>
        <div className='col-xl-8'>
          {/* <!-- Account details card--> */}
          <div className='card mb-4'>
            <div className='card-header'>Account Details</div>
            <div className='card-body'>
              <form onSubmit={onFormSubmit}>
                {/* <!-- Form Group (username)--> */}
                <div className='mb-3'>
                  <label className='small mb-1' for='inputUsername'>
                    Username (how your name will appear to other users on the site)
                  </label>
                  <input
                    className='form-control'
                    id='inputUsername'
                    type='text'
                    placeholder='Enter your username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                </div>
                {/* <!-- Form Row--> */}
                <div className='row gx-3 mb-1'>
                  {/* <!-- Form Group (first name)--> */}
                  <label className='small mb-1' for='inputFirstName'>
                    Full Name
                  </label>
                  <input
                    className='form-control'
                    id='inputFirstName'
                    type='text'
                    placeholder='Enter your first name'
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                  />
                </div>
                {/* <!-- Form Group (email address)--> */}
                <div className='mb-3'>
                  <label className='small mb-1' for='inputEmailAddress'>
                    Email address
                  </label>
                  <input
                    className='form-control'
                    id='inputEmailAddress'
                    type='email'
                    placeholder='Enter your email address'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* <!-- Form Row--> */}
                <div className='row gx-3 mb-3'>
                  {/* <!-- Form Group (phone number)--> */}
                  <div className='col-md-6'>
                    <label className='small mb-1' for='inputPhone'>
                      Phone number
                    </label>
                    <input
                      className='form-control'
                      id='inputPhone'
                      type='tel'
                      placeholder='Enter your phone number'
                    />
                  </div>
                  {/* <!-- Form Group (birthday)--> */}
                  <div className='col-md-6'>
                    <label className='small mb-1' for='inputBirthday'>
                      Extra
                    </label>
                    <input
                      className='form-control'
                      id='inputBirthday'
                      type='text'
                      name='birthday'
                      placeholder='Enter your birthday'
                    />
                  </div>
                </div>
                {/* <!-- Save changes button--> */}
                <button className='btn btn-primary btn-savechange' type='submit'>
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileDetail;

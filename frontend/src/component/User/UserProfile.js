import React, { Fragment } from 'react';
import MetaData from "../MetaData";
import './css/UserProfile.css';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  return (
    <Fragment>
        <MetaData title="Samadhan: UserProfile" />
        

        {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/> */}
        <div className="content-page">
            {/* <div className="profile-banner" style="background:url(https://bootdey.com/img/Content/bg1.jpg);"> */}
            <div className="profile-banner" style={{background:"url(https://static.fandomspot.com/images/09/9101/24-zegred-black-cover-anime.jpg)"}}>
                <div className="col-sm-3 avatar-container">
                    <img src="http://www.beautifulpeople.com/cdn/beautifulpeople/images/default_profile/signup_male.png"
                     className="img-circle profile-avatar" alt="User avatar"/>
                </div>
               
                <div className="profile-actions">
                    <button type="button" className="btn btn-success btn-sm"><i className="fa fa-check"></i> Follow</button>
                    <button type="button" className="btn btn-primary btn-sm"><i className="fa fa-envelope"></i> Send Message</button>
                </div>

            </div>
            <div className='buttonNav'>
                <p>hello</p>
            </div>
            {/* User Card Info */}
           
            <div class="col-md-4 mb-3">
              <div class="usercard">

                <div className="aboutUser">
                    <p className='aboutuserpara'>About User</p>
                </div>
                <hr className="border-light m-0"/>

                <div className="aboutUserDetailcard">
                    <p>I help needy people, after being paid</p>
                    <p>Follower: 1B</p>     
                </div>
                    <hr className="border-light m-0"/>
                <div className="card-body">
                    <p className="mb-2">Name: Meydhi Vai</p>
                    <p className="mb-2">Sector: Krishne Basantay</p>
                    <p>Created Dec 12 0101</p>
                </div>
                </div>
            </div>
            
        </div>
    </Fragment>
  )
}

export default UserProfile;
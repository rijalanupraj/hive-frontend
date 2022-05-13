import React from "react";
import "../../css/updateprofile/updateprofiledetail.css";
import { Link } from "react-router-dom";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const UpdateProfileDetail = () => {
  return (
    <div class="container-xl px-4 mt-4">
      <hr class="mt-0 mb-4" />
      <div class="row">
        <div class="col-xl-4">
          {/* <!-- Profile picture card--> */}
          <div class="card mb-4 mb-xl-0">
            <div class="card-header">Profile Picture</div>
            <div class="card-body text-center">
              {/* <!-- Profile picture image--> */}
              <img
                class="img-account-profile rounded-circle mb-2"
                src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                alt=""
              />
              {/* <!-- Profile picture help block--> */}
              <div class="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              {/* <!-- Profile picture upload button--> */}
              <button class="btn btn-primary btn-saveimg" type="button">
                Upload new image
              </button>
            </div>
          </div>
        </div>
        <div class="col-xl-8">
          {/* <!-- Account details card--> */}
          <div class="card mb-4">
            <div class="card-header">Account Details</div>
            <div class="card-body">
              <form>
                {/* <!-- Form Group (username)--> */}
                <div class="mb-3">
                  <label class="small mb-1" for="inputUsername">
                    Username (how your name will appear to other users on the
                    site)
                  </label>
                  <input
                    class="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                  />
                </div>
                {/* <!-- Form Row--> */}
                <div class="row gx-3 mb-3">
                  {/* <!-- Form Group (first name)--> */}
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputFirstName">
                      First name
                    </label>
                    <input
                      class="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                    />
                  </div>
                  {/* <!-- Form Group (last name)--> */}
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputLastName">
                      Last name
                    </label>
                    <input
                      class="form-control"
                      id="inputLastName"
                      type="text"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                {/* <!-- Form Row        --> */}
                <div class="row gx-3 mb-3">
                  {/* <!-- Form Group (organization name)--> */}
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputOrgName">
                      Organization name
                    </label>
                    <input
                      class="form-control"
                      id="inputOrgName"
                      type="text"
                      placeholder="Enter your organization name"
                    />
                  </div>
                  {/* <!-- Form Group (location)--> */}
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputLocation">
                      Location
                    </label>
                    <input
                      class="form-control"
                      id="inputLocation"
                      type="text"
                      placeholder="Enter your location"
                    />
                  </div>
                </div>
                {/* <!-- Form Group (email address)--> */}
                <div class="mb-3">
                  <label class="small mb-1" for="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    class="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>
                {/* <!-- Form Row--> */}
                <div class="row gx-3 mb-3">
                  {/* <!-- Form Group (phone number)--> */}
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputPhone">
                      Phone number
                    </label>
                    <input
                      class="form-control"
                      id="inputPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {/* <!-- Form Group (birthday)--> */}
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputBirthday">
                      Birthday
                    </label>
                    <input
                      class="form-control"
                      id="inputBirthday"
                      type="text"
                      name="birthday"
                      placeholder="Enter your birthday"
                    />
                  </div>
                </div>
                {/* <!-- Save changes button--> */}
                <button class="btn btn-primary btn-savechange" type="button">
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

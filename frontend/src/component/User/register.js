import React from "react";
import "./css/register.css";
import { NavLink } from "react-router-dom";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import signpic from "../../images/register1.svg";

const register = () => {
  return (
    <>
      <section className="signup">
        <div className="container mt-3">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign Up</h2>
              <form className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <i class="zmdi zmdi-account zmdi-hc-lg"></i>
                  </label>
                  <input
                    className="inputField"
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    placeholder="Your Name"
                    size="40"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <i class="zmdi zmdi-email zmdi-hc-lg"></i>
                  </label>
                  <input
                    className="inputEmail"
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <i class="zmdi zmdi-phone-in-talk zmdi-hc-lg"></i>
                  </label>
                  <input
                    className="inputNumber"
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    placeholder="Your Phone No."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="work" className="form-label">
                    <i class="zmdi zmdi-slideshow zmdi-hc-lg"></i>
                  </label>
                  <input
                    className="inputField"
                    type="text"
                    name="work"
                    id="work"
                    autoComplete="off"
                    placeholder="Your Profession"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    <i class="zmdi zmdi-lock zmdi-hc-lg"></i>
                  </label>
                  <input
                    className="inputPassword"
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword" className="form-label">
                    <i class="zmdi zmdi-lock zmdi-hc-lg"></i>
                  </label>
                  <input
                    className="inputPassword"
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    placeholder="Conform Password"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    className="inputSubmit"
                    type="submit"
                    name="signup"
                    id="signup"
                    value="register"
                  />
                </div>
              </form>
            </div>

            <div className="signup-image">
              <figure>
                <img src={signpic} alt="registration pic" width="350px" />
              </figure>
              <NavLink to="/login" className="signup-image-link">
                Already Have An Account
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default register;

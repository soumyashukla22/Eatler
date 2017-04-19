import React, { Component } from 'react';
import './index.css'

class LandingPage extends Component {
  render() {
    return (
      <div className="center">
        <div className="row base-div">
          <div className="col-sm-12 col-md-12 food-image">
            <img src='/images/food_stall.JPG' alt='food-image' />
            <div className="col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 details">
              <div className="row">
                <h1 className="logo">Eatler</h1>
              </div>
              <div className="row contact">
                {/* <p>Contact us</p> */}
                <div className="col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-2">
                  <div className="social-button">
                    <a href="https://www.facebook.com/eatler" target="_blank"><span className="fa fa-facebook-square">Facebook</span></a>
                  </div>
                </div>
                <div className="col-sm-4 col-md-4">
                  <div className="social-button">
                    <a href="https://www.instagram.com/hungry.eatler/" target="_blank"><span className="fa fa-instagram">Instagram</span></a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;

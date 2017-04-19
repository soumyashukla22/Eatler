import React from 'react';
import './Nav.css';

const PageNav = ({activeView, showLoader}) => {
  return (
    <div className="top-nav col-sm-2">
      <div className="row">
        <div className="col-sm-3"><span className="nav-img">&nbsp;</span></div>
      </div>
      <div className="row">
        <div className="col-sm-offset-2 col-sm-2 contact-icon"><a href="/" ><span className="fa fa-facebook-square fa-2x"></span></a></div>
        <div className="col-sm-2 contact-icon"><a href="/" ><span className="fa fa-instagram fa-2x"></span></a></div>
        <div className="col-sm-2 contact-icon"><a href="/" ><span className="fa fa-pinterest fa-2x"></span></a></div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <table className="nav-table">
            <tbody>
              <tr><td><i className="fa fa-search nav-icon"></i></td><td>About</td></tr>
              <tr><td><i className="fa fa-birthday-cake nav-icon"></i></td><td>Order</td></tr>
              <tr><td><i className="fa fa-envelope nav-icon"></i></td><td>Contact</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}

  export default PageNav

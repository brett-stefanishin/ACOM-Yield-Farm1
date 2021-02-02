import React, { Component } from "react";
import acom_logo from "../assets/imgs/ACOM.png";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar fixed-top bg-dark flex-md-nowrap shadow nav-color">
        <div className="navbar-brand addressBold">
          <div className="title-text">
            &nbsp; ACOM Yield Farm
          </div>
        </div>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <b className="addressBold">Address:&nbsp;</b>
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

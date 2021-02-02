import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Pairs.css";
import backroundAsset from "../../assets/imgs/ACOM_YF_V2.svg";
import backroundAssetB from "../../assets/imgs/ACOM_YF_TEST_2.svg";
import axios from 'axios';

class Pairs extends Component {

  API() {
    // Node.js style require
    const axios = require('axios');
    return (
      <div>
        TEST
      </div>
    );
  }

  render() {
    return (
      <div>
        <h5> Welcome to the ACOM Yield Farm on Binance Smart Chain </h5>

        <img className="backgroundAsset" src={backroundAssetB} alt="pairs backgroundAsset." />

        <div className="pair-table-container">
          <h5 className="stakePoolDisplay">
            ACOM-AGOV (ETH)
          </h5>
          <h5 className="stakePoolDisplay">
            CONNECT TO API
          </h5>

          <h5 className="stakePoolDisplay">
            ACOM-AGOV (BNB)
          </h5>
          <h5 className="stakePoolDisplay">
            CONNECT TO API
          </h5>
      </div>

      <div className="stake-button-container">
        <button className="stakeButton">
          <Link
            to="/acom-agov/eth"
            >
              STAKE NOW
              </Link>
        </button>

        <button className="stakeButton">
          <Link
            to="/acom-agov/bnb"
            >
            STAKE NOW
            </Link>
        </button>
      </div>
    </div>
    );
  }
}

export default Pairs;

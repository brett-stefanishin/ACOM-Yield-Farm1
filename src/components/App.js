import React, { Component } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import "./App.css";
import Web3 from "web3";
//import AcomToken from "../abis/AcomToken.json";
import AgovToken from "../abis/AgovToken.json";
import TokenFarm from "../abis/TokenFarm.json";
import EntryScreen from "../screens";
import { BrowserRouter as Router } from "react-router-dom";
//import * as net from "net";
//import AbiArray from "../testcontracts/AcomArray.json"

var abiArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"totalSupply","type":"uint256"},{"name":"feeReceiver","type":"address"},{"name":"tokenOwnerAddress","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];

// 0x643fd19acbb31e5247ef652e15368f744e2a265a ETH mainnet ACOM Address ||  0xf67BC5ad4CC64F6acf1825a0bb3A5F3B999Ed42C ropsten mock ACOM Address || 0x50ECbDE759Eb6f23FFefd65CF7Ea8F305bbd0279 local testnetmock ACOM Address

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0],});

    const acomToken = await new web3.eth.Contract(
      abiArray,
      '0x643fd19acBb31E5247EF652e15368f744e2a265a'
    );

    // const networkId = await web3.eth.net.getId();

    if (typeof acomToken !== undefined) {
      this.setState({ acomToken });
      window.acomToken = acomToken;
      let acomTokenBalance = await acomToken.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({
        acomTokenBalance: acomTokenBalance.toString(),
      });
    }

    const agovTokenData = true;
    if (agovTokenData) {
      const agovToken = new web3.eth.Contract(
        AgovToken.abi,
          "0x8Db94b765d76474ceFF19072f663fCf11bcbBA46"
      );
      this.setState({ agovToken });
      window.agovToken = agovToken;
      let agovTokenBalance = await agovToken.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({
        agovTokenBalance: agovTokenBalance.toString(),
      });
    } else {
      window.alert("AgovToken contract not deployed to detected network");
    }

    // load Token Farm
    const tokenFarmData = true;
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(
        TokenFarm.abi,
          "0x9f82FAcd0De79b44aF2E5A18f105f6285CE6a681"
      );
      this.setState({ tokenFarm });
      window.tokenFarm = tokenFarm;
      let stakingBalance = await tokenFarm.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({
        stakingBalance: stakingBalance.toString(),
      });
    } else {
      window.alert("TokenFarm contract not deployed to detected network");
    }

    this.setState({ loading: false });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  stakeTokens = (amount) => {
    this.setState({ loading: true });

    this.state.acomToken.methods.allowance("0x07b37E682B100208C6288F2F121298A4D60D103c", "0x9f82facd0de79b44af2e5a18f105f6285ce6a681").call().then(allowance => {
      allowance = window.web3.utils.fromWei(allowance);

      if (allowance < window.web3.utils.fromWei(amount)) {
        this.state.acomToken.methods
            .approve(this.state.tokenFarm._address, amount)
            .send({ from: this.state.account })
            .on("transactionHash", () => {
              this.state.tokenFarm.methods
                  .stakeTokens(amount)
                  .send({ from: this.state.account })
                  .on("transactionHash", () => {
                    this.setState({ loading: false });
                  });
            });
      } else {
        this.state.tokenFarm.methods
            .stakeTokens(amount)
            .send({ from: this.state.account })
            .on("transactionHash", () => {
              this.setState({ loading: false });
            });
      }
    })
  };

  unstakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.tokenFarm.methods
      .unstakeTokens()
      .send({ from: this.state.account })
      .on("transactionHash", () => {
        this.setState({ loading: false });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      acomToken: {},
      agovToken: {},
      tokenFarm: {},
      withdrawEnabled: false,
      acomTokenBalance: "0",
      agovTokenBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  render() {
    let content;
    if (this.state.loading) {
      content = (
        <p id="loader" className="text-center">
          Loading...
        </p>
      );
    } else {
      content = (
        <Main
          acomTokenBalance={this.state.acomTokenBalance}
          agovTokenBalance={this.state.agovTokenBalance}
          stakingBalance={this.state.stakingBalance}
          stakeTokens={this.stakeTokens}
          unstakeTokens={this.unstakeTokens}
        />
      );
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <Router>
            <EntryScreen />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;

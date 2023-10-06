import React, { Component } from 'react';
import DariToken from '../abis/DariToken.json';
import CoolToken from '../abis/CoolToken.json';
import TokenFarm from '../abis/TokenFarm.json';
import Web3 from 'web3';

import Navigation from './Navbar';
import MyCarousel from './Carousel';
import Main from "./Main";
import {ethers} from 'ethers'

class App extends Component {

  async componentDidMount() {
    // 1. Carga de Web3
    await this.loadWeb3()
    // 2. Carga de datos de la Blockchain
    await this.loadBlockchainData()
  }

  // 1. Carga de Web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Accounts: ', accounts)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('¡Deberías considerar usar Metamask!')
    }
  }

  // 2. Carga de datos de la Blockchain
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Ganache -> 5777, Rinkeby -> 4, BSC -> 97
    const networkId = await web3.eth.net.getId()
    
    // Carga del DariToken
    const dariTokenData = DariToken.networks[networkId]
    if(dariTokenData){
      const dariToken = new web3.eth.Contract(DariToken.abi, dariTokenData.address)
      this.setState({dariToken : dariToken})
      let dariTokenBalance = await dariToken.methods.balanceOf(this.state.account).call()
      this.setState({dariTokenBalance: dariTokenBalance.toString()})
    }else{
      window.alert("El DariToken no se ha desplegado en la red, utilice Mumbai Polygon Tesnet")
    }

    // Carga de CoolToken
    const coolTokenData = CoolToken.networks[networkId]
    if(coolTokenData){
      const coolToken = new web3.eth.Contract(CoolToken.abi, coolTokenData.address)
      this.setState({coolToken: coolToken})
      let coolTokenBalance = await coolToken.methods.balanceOf(this.state.account).call()
      this.setState({coolTokenBalance: coolTokenBalance.toString()})
    }else{
      window.alert("El CoolToken no se ha desplegado en la red, utilice Mumbai Polygon Tesnet")
    }

    // Carga de TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData){
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({tokenFarm: tokenFarm})
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({stakingBalance: stakingBalance.toString()})
    }else{
      window.alert("El TokenFarm no se ha desplegado en la red, utilice Mumbai Polygon Tesnet")
    }
    this.setState({loading: false})

  }

  stakeTokens = (amount) => {
    this.setState({loading: true})
    this.state.dariToken.methods.approve(this.state.tokenFarm._address, amount).send({from: this.state.account}).on("transactionHash", (hash) => {
      this.state.tokenFarm.methods.stakeTokens(amount).send({from: this.state.account}).on("transactionHash", (hash) => {
        this.setState({loading: false})
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({loading: true})
    this.state.tokenFarm.methods.unstakeTokens().send({from: this.state.account}).on("transactionHash", (hash) => {
      this.setState({loading: false})
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      loading: true,
      dariToken: {},
      dariTokenBalance: "0",
      coolToken: {},
      coolTokenBalance: "0",
      tokenFarm: {},
      stakingBalance: "0",
    }
  }

  render() {

    let content 
    if(this.state.loading){
      content = <p id = "loader" className='text-center'>Loading...</p>
    }else{
      content = <Main
        dariTokenBalance = {this.state.dariTokenBalance}
        coolTokenBalance = {this.state.coolTokenBalance}
        stakingBalance = {this.state.stakingBalance}
        stakeTokens = {this.stakeTokens}
        unstakeTokens = {this.unstakeTokens}
        purchaseTokens = {this.purchaseTokens}
      />
    }

    return (
      <div>
        <Navigation account={this.state.account} />
        <MyCarousel />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import List from './components/list/List';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
export default class App extends Component {
  state = {getInput:null}
  getInput = (data)=>{
    this.setState({getInput:data})
  }
  render() {
    return (
      <div id="container">
        <Header func={this.getInput}/>
        <List newData={this.state.getInput}/>
        <Footer/>
      </div>
    );
  }
}

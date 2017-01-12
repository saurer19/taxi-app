import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Web from './webview';
import ListTaxi from './listtaxi'
import Home from './home';

export default class App extends Component {
  render() {
      return (
    <Router>
      <Scene key="root">
        <Scene key="home"
          component={Home}
            hideNavBar={true}
          initial
        />
        <Scene
          key="list"
          component={ListTaxi}
          title="List"
          hideNavBar={false}
        />
        <Scene
          key="web"
          component={Web}
          title="Check out"
        />
      </Scene>
    </Router>
    );
  }
}

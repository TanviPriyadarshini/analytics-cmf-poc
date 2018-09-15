import React, { Component } from 'react';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

// Pages
import LoginPage from './pages/LoginPage'

class App extends Component {
  state = {
    authorized: false
  }

  _login = () => this.setState({ authorized: true })

  render() {
    return <LoginPage login={this._login} />
  }
}

export default App;

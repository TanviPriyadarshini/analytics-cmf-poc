import React, { Component } from 'react';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

// Pages
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'

class App extends Component {
  state = {
    authorized: false
  }

  _login = () => this.setState({ authorized: true })

  render() {
    return this.state.authorized ? <OverviewPage /> : <LoginPage login={this._login} />
  }
}

export default App;

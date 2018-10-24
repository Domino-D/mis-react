import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Login from './pages/Login'
import Home from './pages/Home'
import 'antd/dist/antd.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Route path='/index' component={Home} />
            <Route exact path='/' component={Login} />
          </Fragment>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App

import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route path='/index' component={Home} />
          <Route exact path='/' component={Login} />
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default App

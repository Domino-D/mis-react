import React, { Component, Fragment } from 'react'
import { Router, Route } from 'react-router-dom'
import Nav from '../Navbar'
import List from '../List'
import Details from '../Details'
import Cont from '../Contributors'


class Home extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <Fragment>
          <Nav/>
          <Route exact path='/index' component={List} />
          <Route exact path='/index/details' component={Details} />
          <Route exact path='/index/cont' component={Cont} />
        </Fragment>
      </Router>
    )
  }
}

export default Home
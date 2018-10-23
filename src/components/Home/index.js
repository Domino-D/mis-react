import React, { Component, Fragment } from 'react'
import { Router, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Nav from '../Navbar'
import List from '../List'
import Details from '../Details'
import Cont from '../Contributors'
import {
  HeaderStyle,
  ContentStyle,
  FooterStyle,
  LogoImg
} from './style'

const { Header, Content, Footer, Sider } = Layout

class Home extends Component {
  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          theme='light'
          // onBreakpoint={(broken) => { console.log(broken); }}
          // onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <Nav />
        </Sider>
        <Layout>
          <Header style={HeaderStyle} />
          <Content style={ContentStyle}>
            <Router history={this.props.history}>
              <Fragment>
                <Route exact path='/index' component={List} />
                <Route exact path='/index/details' component={Details} />
                <Route exact path='/index/cont' component={Cont} />
              </Fragment>
            </Router>
          </Content>
          <Footer style={FooterStyle}>
            <h4>Fisheep Studio</h4>
            <LogoImg />
            <h5>Oct. 2018</h5>
            <h5>2.0/EN</h5>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Home
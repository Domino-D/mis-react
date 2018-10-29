import React, { Component, Fragment } from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createAction } from './store'
import { Layout } from 'antd'
import Nav from '../../common/Navbar'
import List from './components/List'
import Details from './components/Details'
import Cont from './components/Contributors'
import {
  HeaderStyle,
  ContentStyle,
  FooterStyle,
  LogoImg
} from './style'

const { Header, Content, Footer, Sider } = Layout

class Home extends Component {
  render() {
    const { authority } = this.props

    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          theme='light'
          style={{zIndex: '1'}}
        >
          <Nav />
        </Sider>
        <Layout>
          <Header style={HeaderStyle}>{authority} Authority</Header>
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

  componentDidMount() {
    // const { isLogin, history } = this.props
    // if(!isLogin) {
    //   history.push('/')
    // }
  }
}

const mapState = (state) => ({
  authority: state.home.authority ? 'ROOT' : 'ADMIN',
  isLogin: state.login.isLogin,
  homeList: state.home.homeList
})

const mapDispatch = (dispatch) => ({
  loadHomeList() {
    dispatch(createAction.preloadList())
  }
})

export default connect(mapState, mapDispatch)(Home)
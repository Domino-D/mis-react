import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as createAcion from './createaction'
import { Menu, Icon } from 'antd'
import { LogoTitle } from './style'

const SubMenu = Menu.SubMenu

class Nav extends Component {
  render() {
    const { signOut } = this.props

    return (
      <div>
        <LogoTitle>MIS</LogoTitle>
        <Menu
          defaultSelectedKeys={[]}
          mode="inline"
        >
          <Menu.Item key="0">
            <Link to="/index">
              <Icon type="ordered-list" />
              <span>List</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/index/details">
              <Icon type="form" />
              <span>Details</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/index/cont">
              <Icon type="team" />
              <span>Contributors</span>
            </Link>
          </Menu.Item>
          <SubMenu key="3" title={<span><Icon type="user" /><span>User</span></span>}>
            <Menu.Item key="4">
              <Link to="/" onClick={signOut}>
                <Icon type="logout" />
                <span>Logout</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  signOut() {
    dispatch(createAcion.signOut())
  }
})

export default connect(null, mapDispatch)(Nav)
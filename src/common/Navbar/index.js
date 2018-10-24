import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { LogoTitle } from './style'

const SubMenu = Menu.SubMenu

class Nav extends Component {
  render() {
    return (
      <div>
        <LogoTitle>MIS</LogoTitle>
        <Menu
          defaultSelectedKeys={['list']}
          mode="inline"
        >
          <Menu.Item key="list">
            <Link to="/index">
              <Icon type="ordered-list" />
              <span>List</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="details">
            <Link to="/index/details">
              <Icon type="form" />
              <span>Details</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="cont">
            <Link to="/index/cont">
              <Icon type="team" />
              <span>Contributors</span>
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="user" /><span>User</span></span>}>
            <Menu.Item key="5">
              <Link to="/">
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


export default Nav
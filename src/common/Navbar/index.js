import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { LogoTitle } from './style'

const SubMenu = Menu.SubMenu

class Nav extends Component {
  state = {
    collapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render() {
    return (
      <div>
        <LogoTitle>MIS</LogoTitle>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1">
            <Icon type="ordered-list" />
            <span>List</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="form" />
            <span>Details</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="team" />
            <span>Contributors</span>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="user" /><span>User</span></span>}>
            <Menu.Item key="5">
              <Icon type="logout" />
              <span>Logout</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default Nav
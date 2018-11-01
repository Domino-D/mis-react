import React, { Component } from 'react'
import { Tabs } from 'antd'
import EditCard from './components/editcard'
import CreateCard from './components/createcard'
import { TabsStyle } from './style'

const TabPane = Tabs.TabPane

class Details extends Component {
  render() {
    return (
      <Tabs type="card" style={TabsStyle}>
        <TabPane tab="Edit existed items" key="1">
          <EditCard />
        </TabPane>
        <TabPane tab="Create new item" key="2">
          <CreateCard />
        </TabPane>
      </Tabs>
    )
  }
}

export default Details
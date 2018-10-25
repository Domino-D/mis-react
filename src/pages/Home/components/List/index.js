import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from './store'
import { Table, Button } from 'antd'
import {
  TableStyle,
  ButtonStyle,
  ContentList
} from './style'

class List extends Component {
  state = {
    filteredInfo: null
  }

  handleChange = (pagination, filters) => {
    console.log('Various parameters', pagination, filters)
    this.setState({
      filteredInfo: filters
    })
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null })
  }

  render() {
    let { filteredInfo } = this.state
    filteredInfo = filteredInfo || {}

    const columns = [
      {
        title: 'Original No.',
        dataIndex: 'original',
        key: 'original',
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
          { text: 'John', value: 'John' }
        ],
        filteredValue: filteredInfo.original || null,
        onFilter: (value, record) => record.original.includes(value)
      }, 
      {
        title: 'Material No.',
        dataIndex: 'material',
        key: 'material',
        filters: [
          { text: 32, value: 32 },
          { text: 42, value: 42 }
        ],
        filteredValue: filteredInfo.material || null,
        onFilter: (value, record) => record.material.toString().includes(value)
      }, 
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        filters: [
          { text: 'boy', value: 'boy' }
        ],
        filteredValue: filteredInfo.description || null,
        onFilter: (value, record) => record.description.includes(value)
      },
      {
        title: 'Vandor',
        dataIndex: 'vandor',
        key: 'vandor',
        filters: [
          { text: 'shop', value: 'shop' }
        ],
        filteredValue: filteredInfo.vandor || null,
        onFilter: (value, record) => record.vandor.includes(value)
      },
      {
        title: 'Contributor',
        dataIndex: 'contributor',
        key: 'contributor',
        filters: [
          { text: 'man', value: 'man' }
        ],
        filteredValue: filteredInfo.contributor || null,
        onFilter: (value, record) => record.contributor.includes(value)
      },
      {
        title: 'Date',
        dataIndex: 'creation',
        key: 'creation',
        filters: [
          { text: '10-25', value: '10-25' }
        ],
        filteredValue: filteredInfo.creation || null,
        onFilter: (value, record) => record.creation.includes(value)
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text: 'active', value: 'active' },
          { text: 'closed', value: 'closed' }
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value)
      }
    ]

    const { homeList } = this.props

    return (
      <ContentList>
        <div style={TableStyle}>
          <Button type="primary" size="small" style={ButtonStyle} onClick={this.clearFilters}>Clear all filters</Button>
        </div>
        <Table columns={columns} dataSource={homeList} onChange={this.handleChange} />
      </ContentList>
    );
  }
}

const mapState = (state) => ({
  homeList: state.list.homeList
})

const mapDispatch = (dispatch) => ({
  loadHomeList() {
    dispatch(createAction.preloadList())
  }
})

export default connect(mapState, mapDispatch)(List)
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
  handleChange = (pagination, filters) => {
    console.log('Various parameters', pagination, filters)
    this.props._handleChange(filters)
  }

  _onFolter = (key) => {
    if (key === 'material') {
      return (value, record) => record[`${key}`].toString().includes(value)
    } else {
      return (value, record) => record[`${key}`].includes(value)
    }
  }

  _filteredValue = (key) => {
    let { filteredInfo } = this.props
    filteredInfo = filteredInfo || {}
    return filteredInfo[`${key}`] || null
  }

  render() {

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
        filteredValue: this._filteredValue('original'),
        onFilter: this._onFolter('original')
      },
      {
        title: 'Material No.',
        dataIndex: 'material',
        key: 'material',
        filters: [
          { text: 32, value: 32 },
          { text: 42, value: 42 }
        ],
        filteredValue: this._filteredValue('material'),
        onFilter: this._onFolter('material')
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        filters: [
          { text: 'boy', value: 'boy' }
        ],
        filteredValue: this._filteredValue('description'),
        onFilter: this._onFolter('description')
      },
      {
        title: 'Vandor',
        dataIndex: 'vandor',
        key: 'vandor',
        filters: [
          { text: 'shop', value: 'shop' }
        ],
        filteredValue: this._filteredValue('vandor'),
        onFilter: this._onFolter('vandor')
      },
      {
        title: 'Contributor',
        dataIndex: 'contributor',
        key: 'contributor',
        filters: [
          { text: 'man', value: 'man' }
        ],
        filteredValue: this._filteredValue('contributor'),
        onFilter: this._onFolter('contributor')
      },
      {
        title: 'Date',
        dataIndex: 'creation',
        key: 'creation',
        filters: [
          { text: '10-25', value: '10-25' }
        ],
        filteredValue: this._filteredValue('creation'),
        onFilter: this._onFolter('creation')
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text: 'active', value: 'active' },
          { text: 'closed', value: 'closed' }
        ],
        filteredValue: this._filteredValue('status'),
        onFilter: this._onFolter('status')
      }
    ]

    const { homeList, _clearFilters } = this.props

    return (
      <ContentList>
        <div style={TableStyle}>
          <Button type="primary" size="small" style={ButtonStyle} onClick={_clearFilters}>Clear all filters</Button>
        </div>
        <Table columns={columns} dataSource={homeList} onChange={this.handleChange} />
      </ContentList>
    );
  }
}

const mapState = (state) => ({
  filteredInfo: state.list.filteredInfo,
  filters: state.list.filters,
  homeList: state.list.homeList
})

const mapDispatch = (dispatch) => ({
  loadHomeList() {
    dispatch(createAction.preloadList())
  },

  _handleChange(filters) {
    dispatch(createAction.changeFilteredInfo(filters))
  },

  _clearFilters() {
    dispatch(createAction.clearFilters())
  }
})

export default connect(mapState, mapDispatch)(List)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from './store'
import { createAction as navCreateAction } from '../../../../common/Navbar/store'
import { Table, Button, message } from 'antd'
import {
  TableStyle,
  ButtonStyle,
  ContentList
} from './style'

class List extends Component {
  handleChange = (pagination, filters) => {
    // console.log('Various parameters', pagination, filters)
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
    const { homeList, filters, _clearFilters } = this.props

    const columns = [
      {
        title: 'Original No.',
        dataIndex: 'original',
        key: 'original',
        filters: filters[0] || [],
        filteredValue: this._filteredValue('original'),
        onFilter: this._onFolter('original')
      },
      {
        title: 'Material No.',
        dataIndex: 'material',
        key: 'material',
        filters: filters[1] || [],
        filteredValue: this._filteredValue('material'),
        onFilter: this._onFolter('material')
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        filters: filters[2] || [],
        filteredValue: this._filteredValue('description'),
        onFilter: this._onFolter('description')
      },
      {
        title: 'Vandor',
        dataIndex: 'vandor',
        key: 'vandor',
        filters: filters[3] || [],
        filteredValue: this._filteredValue('vandor'),
        onFilter: this._onFolter('vandor')
      },
      {
        title: 'Contributor',
        dataIndex: 'contributor',
        key: 'contributor',
        filters: filters[4] || [],
        filteredValue: this._filteredValue('contributor'),
        onFilter: this._onFolter('contributor')
      },
      {
        title: 'Date',
        dataIndex: 'creation',
        key: 'creation',
        filters: filters[5] || [],
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

    return (
      <ContentList>
        <div style={TableStyle}>
          <Button type="primary" size="small" style={ButtonStyle} onClick={_clearFilters}>Clear all filters</Button>
        </div>
        <Table bordered columns={columns} dataSource={homeList} onChange={this.handleChange} />
      </ContentList>
    );
  }

  componentDidMount() {
    const {errorMsg, loadHomeList, changeDefaultKey, showErrorMsg} = this.props
    loadHomeList()
    changeDefaultKey()
    if(errorMsg) showErrorMsg(errorMsg)
  }

  componentDidUpdate() {
    const {errorMsg, showErrorMsg, changeDefaultKey} = this.props
    changeDefaultKey()
    if(errorMsg) showErrorMsg(errorMsg)
  }
}

const mapState = (state) => ({
  filteredInfo: state.list.filteredInfo,
  filters: state.list.filters,
  homeList: state.list.homeList,
  errorMsg: state.list.errorMsg
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
  },

  showErrorMsg(errorMsg) {
    message.warning(errorMsg)
  },

  changeDefaultKey() {
    dispatch(navCreateAction.changeDefaultKey(["0"]))
  }
})

export default connect(mapState, mapDispatch)(List)
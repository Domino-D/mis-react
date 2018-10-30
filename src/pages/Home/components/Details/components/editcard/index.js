import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createAction } from './store'
import DrawerCard from './drawer'
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Button,
  Icon,
  message
} from 'antd'

const buttonStyle = {
  margin: '1px 4px',
  fontWeight: 600
}

const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends Component {
  render() {
    const {
      editing,
      dataIndex,
      title,
      record,
      inputType,
      index,
      ...restProps
    } = this.props

    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`
                    }],
                    initialValue: record[dataIndex]
                  })(<Input />)}
                </FormItem>
              ) : restProps.children}
            </td>
          )
        }}
      </EditableContext.Consumer>
    )
  }
}

class EditCard extends Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'Original No.',
        dataIndex: 'original',
        editable: true
      },
      {
        title: 'Material No.',
        dataIndex: 'material',
        editable: true
      },
      {
        title: 'Description',
        dataIndex: 'description',
        editable: true
      },
      {
        title: 'Vandor',
        dataIndex: 'vandor',
        editable: true
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record)
          const { data, changeEditingKey, drawerShow, deleteItem } = this.props
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <Button size="small"
                        onClick={() => this.save(form, record.key)}
                        style={buttonStyle}
                      >
                        Save
                      </Button>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => changeEditingKey('')}
                  >
                    <Button size="small" style={buttonStyle}>Cancel</Button>
                  </Popconfirm>
                </span>
              ) : (
                  <Fragment>
                    <Button
                      size="small"
                      type="dashed"
                      style={buttonStyle}
                      onClick={() => drawerShow(record.key, data)}
                    >
                      <Icon type="eye" theme="filled" />
                      More
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      style={buttonStyle}
                      onClick={() => changeEditingKey(record.key)}
                    >
                      <Icon type="edit" theme="filled" />
                      Edit
                    </Button>
                    <Popconfirm
                      title="Sure to delete this item?"
                      onConfirm={() => deleteItem(record.key)}
                    >
                      <Button size="small" type="danger" style={buttonStyle}>
                        <Icon type="delete" theme="filled" />
                        Delete
                      </Button>
                    </Popconfirm>
                  </Fragment>
                )}
            </div>
          )
        }
      }
    ]
  }

  isEditing = (record) => {
    return record.key === this.props.editingKey
  }

  save(form, key) {
    const { changeData, changeEditingKey } = this.props
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      const newData = [...this.props.data]
      const index = newData.findIndex(item => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        changeData(newData[index])
      } else {
        message.warning('Not exited item. Please create a new item, if necessary.')
      }
      changeEditingKey('')
    })
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    }

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      }
    })

    return (
      <Fragment>
        <Table
          components={components}
          bordered
          dataSource={this.props.data}
          columns={columns}
          rowClassName="editable-row"
        />
        <DrawerCard />
      </Fragment>
    )
  }

  componentDidMount() {
    const { loadData, errorMsg } = this.props
    loadData()
    if (errorMsg) message.warning(errorMsg)
  }

  componentDidUpdate() {
    const { errorMsg } = this.props
    if (errorMsg) message.warning(errorMsg)
  }
}

const mapState = (state) => ({
  data: state.edit.data,
  editingKey: state.edit.editingKey,
  errorMsg: state.edit.errorMsg
})

const mapDispatch = (dispatch) => ({
  loadData() {
    dispatch(createAction.preloadData())
  },

  changeData(data) {
    dispatch(createAction.changeData(data))
  },

  changeEditingKey(key) {
    dispatch(createAction.changeEditingKey(key))
  },

  drawerShow(key, data) {
    dispatch(createAction.selectItem(key, data))
  },

  deleteItem(_id) {
    dispatch(createAction.deleteItem(_id))
  }
})

export default connect(mapState, mapDispatch)(EditCard)
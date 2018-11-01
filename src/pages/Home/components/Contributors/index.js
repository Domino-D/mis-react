import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as createAction from './store/createaction'
import {
  Collapse,
  Card,
  Icon,
  Skeleton,
  Avatar,
  Form,
  Input,
  Button,
  message
} from 'antd'

const Panel = Collapse.Panel
const { Meta } = Card
const FormItem = Form.Item

const CardStyle = {
  width: 300,
  margin: '0 16px',
  boxShadow: '0 0 8px #9D9D9D'
}

class Cont extends Component {
  render() {
    const {
      authority,
      userList,
      newUser,
      emailChange,
      passwordChange,
      createNewAdmin,
      debounce,
      deleteAdmin,
      checkDuplication
    } = this.props

    return (
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header={<strong>MIS Admin</strong>} key="1">
          {userList[0] ? userList.map((item) => (
            <Card
              style={CardStyle}
              actions={[<Icon type="ellipsis" />, <Icon type="delete" onClick={deleteAdmin(item.id)}/>]}
            >
              <Skeleton loading={false} active>
                <Meta
                  avatar={<Avatar>ADMIN</Avatar>}
                  title="ADMIN"
                  description={
                    <div>
                      <p><strong>Email: </strong>{item.email}</p>
                      <p><strong>SignUp: </strong>{item.time}</p>
                    </div>
                  }
                />
              </Skeleton>
            </Card>
          )
          ) : (
              <Card style={CardStyle}>
                <Skeleton loading={true} active />
              </Card>
            )}
        </Panel>
        {authority ? <Panel header={<strong>New Admin SignUp</strong>} key="2">
          <Form layout="inline">
            <FormItem
              label={<strong>Email </strong>}
            >
              <Input placeholder="Input Email" type="email" onBlur={(e) => checkDuplication(e, userList)} onChange={(e) => emailChange(e)} value={newUser.email} required />
            </FormItem>
            <FormItem
              label={<strong>Password </strong>}
            >
              <Input placeholder="Input Password" type="password" onChange={(e) => passwordChange(e)} value={newUser.pwd} required />
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={debounce(createNewAdmin, newUser)}>Submit</Button>
            </FormItem>
          </Form>
        </Panel> : null}
      </Collapse>
    )
  }

  componentDidMount() {
    const { errorMsg, preloadUserList } = this.props
    preloadUserList()
    if(errorMsg) message.warning(errorMsg)
  }

  componentDidUpdate() {
    const { errorMsg } = this.props
    if (errorMsg) message.warning(errorMsg)
  }
}

const mapState = (state) => ({
  authority: state.home.authority,
  userList: state.cont.userList,
  newUser: state.cont.newUser,
  errorMsg: state.cont.errorMsg
})

const mapDispatch = (dispatch) => ({
  preloadUserList() {
    dispatch(createAction.preloadUserList())
  },

  emailChange(e) {
    const email = e.target.value
    dispatch(createAction.emailChange(email))
  },

  passwordChange(e) {
    const pwd = e.target.value
    dispatch(createAction.passwordChange(pwd))
  },

  createNewAdmin(data) {
    dispatch(createAction.preCreateNewAdmin(data))
  },

  deleteAdmin(_id) {
    dispatch(createAction.deleteAdmin())
  },

  checkDuplication(e, list) {
    const value = e.target.value
    for (const item of list) {
      if (item.email === value) {
        message.warning('New Admin Email existed.')
      }
    }
  },

  debounce(func, data) {
    let timer = null
    return function () {
      clearTimeout(timer)
      timer = setTimeout(function () {
        func.apply(this, [data])
      }, 500)
    }
  }
})

export default connect(mapState, mapDispatch)(Cont)
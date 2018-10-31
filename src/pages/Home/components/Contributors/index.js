import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction as navCreateAction } from '../../../../common/Navbar/store'
import * as createAction from './store/createaction'
import {
  Collapse,
  Card,
  Icon,
  Skeleton,
  Avatar,
  Form,
  Input,
  Button
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
    const { authority, userList } = this.props

    return (
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header={<strong>MIS Admin</strong>} key="1">
          {userList[0] ? userList.map((item) => (
            <Card
              style={CardStyle}
              actions={[<Icon type="ellipsis" />, <Icon type="delete" />]}
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
        {true ? <Panel header={<strong>New Admin SignUp</strong>} key="2">
          <Form layout="inline">
            <FormItem
              label="Field A"
            >
              <Input placeholder="input placeholder" />
            </FormItem>
            <FormItem
              label="Field B"
            >
              <Input placeholder="input placeholder" />
            </FormItem>
            <FormItem>
              <Button type="primary">Submit</Button>
            </FormItem>
          </Form>
        </Panel> : null}
      </Collapse>
    )
  }

  componentDidMount() {
    const { changeDefaultKey, preloadUserList } = this.props
    changeDefaultKey()
    preloadUserList()
  }

  componentWillUpdate() {
    const { changeDefaultKey } = this.props
    changeDefaultKey()
  }
}

const mapState = (state) => ({
  authority: state.home.authority,
  userList: state.cont.userList
})

const mapDispatch = (dispatch) => ({
  changeDefaultKey() {
    dispatch(navCreateAction.changeDefaultKey(["2"]))
  },

  preloadUserList() {
    dispatch(createAction.preloadUserList())
  }
})

export default connect(mapState, mapDispatch)(Cont)
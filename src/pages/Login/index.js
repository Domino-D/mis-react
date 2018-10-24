import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from './store'
import { Form, Icon, Input, Button, Alert } from 'antd';
import {
  InputStyle,
  AlertStyle,
  SignIn,
  SignInTitle,
} from './style'

const FormItem = Form.Item;

class Login extends Component {
  render() {
    const { account, password, errormsg, handleAccountInput, handlePasswordInput, handleSubmit } = this.props

    return (
      <SignIn>
        <SignInTitle>Sign in to MIS</SignInTitle>
        {errormsg ? <Alert message={errormsg} type="warning" showIcon style={AlertStyle}/> : null}
        <Form>
          <FormItem>
            <Input prefix={<Icon type="user" style={InputStyle} />} placeholder="Username" onChange={(e) => { handleAccountInput(e) }} value={account} />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="lock" style={InputStyle} />} type="password" placeholder="Password" onChange={(e) => { handlePasswordInput(e) }} value={password} />
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={() => { handleSubmit(account, password) }}>
              <strong>Log in</strong>
            </Button>
          </FormItem>
        </Form>
      </SignIn>
    )
  }
}

const mapState = (state) => ({
  account: state.login.account,
  password: state.login.password,
  errormsg: state.login.errormsg
})

const mapDispatch = (dispatch) => ({
  handleAccountInput(e) {
    const act = e.target.value
    dispatch(createAction.accountInput(act))
  },

  handlePasswordInput(e) {
    const pwd = e.target.value
    dispatch(createAction.passwordInput(pwd))
  },

  handleSubmit(account, password) {
    dispatch(createAction.preLogin(account, password))
  }
})

export default connect(mapState, mapDispatch)(Login)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createAction } from './store'
import { Form, Icon, Input, Button, message } from 'antd';
import {
  InputStyle,
  SignIn,
  SignInTitle,
} from './style'

const FormItem = Form.Item;

class Login extends Component {
  render() {
    const { account, password, isLogin, handleAccountInput, handlePasswordInput, handleSubmit, debounce } = this.props

    return (
      <SignIn>
        <SignInTitle>Sign in to MIS</SignInTitle>
        {isLogin ? <Redirect to="/index" /> : null}
        <Form>
          <FormItem>
            <Input prefix={<Icon type="user" style={InputStyle} />} placeholder="Username" onChange={(e) => { handleAccountInput(e) }} value={account} required />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="lock" style={InputStyle} />} type="password" placeholder="Password" onChange={(e) => { handlePasswordInput(e) }} value={password} required />
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={debounce(handleSubmit, account, password)}>
              <strong>Log in</strong>
            </Button>
          </FormItem>
        </Form>
      </SignIn>
    )
  }

  componentDidUpdate() {
    const { errormsg, showErrorMsg } = this.props
    if (errormsg) showErrorMsg(errormsg)
  }
}

const mapState = (state) => ({
  account: state.login.account,
  password: state.login.password,
  isLogin: state.login.isLogin,
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
  },

  debounce(func, a, p) {
    let timer = null
    return function () {
      clearTimeout(timer)
      timer = setTimeout(function () {
        func.apply(this, [a, p])
      }, 500)
    }
  },

  showErrorMsg(errorMsg) {
    message.warning(errorMsg)
  }
})

export default connect(mapState, mapDispatch)(Login)
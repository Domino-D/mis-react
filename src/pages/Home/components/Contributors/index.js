import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction as navCreateAction } from '../../../../common/Navbar/store'

class Cont extends Component {
  render() {
    return <div>Cont</div>
  }

  componentDidMount() {
    const { changeDefaultKey } = this.props
    changeDefaultKey()
  }

  componentWillUpdate() {
    const { changeDefaultKey } = this.props
    changeDefaultKey()
  }
}

const mapDispatch = (dispatch) => ({
  changeDefaultKey() {
    dispatch(navCreateAction.changeDefaultKey(["2"]))
  }
})

export default connect(null, mapDispatch)(Cont)
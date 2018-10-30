import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from './store'
import {
  Form,
  Input,
  Button,
  message
} from 'antd'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
}

const formStyle = {
  maxWidth: 700,
  minWidth: 300,
  margin: '0 auto',
  textAlign: 'center'
}

class CreateCard extends Component {
  render() {
    const {
      newData,
      created,
      errorMsg,
      handleInputOriginal,
      handleInputMaterial,
      handleInputDescription,
      handleInputVandor,
      setCreated,
      createNewData,
      debounce
    } = this.props

    return (
      <Form style={formStyle}>
        <FormItem
          {...formItemLayout}
          label='Original No.'
          hasFeedback
          validateStatus="success"
        >
          <Input
            placeholder="Input Original No."
            onChange={(e) => { handleInputOriginal(e) }}
            value={newData.original}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Material No."
          hasFeedback
          validateStatus="warning"
        >
          <Input
            placeholder="Input Material No."
            onChange={(e) => { handleInputMaterial(e) }}
            value={newData.material}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Descriptions"
          hasFeedback
          validateStatus="error"
          help="Should be combination of numbers & alphabets"
        >
          <Input
            placeholder="Descriptions here"
            onChange={(e) => { handleInputDescription(e) }}
            value={newData.description}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Manufacturer"
          hasFeedback
          validateStatus="success"
        >
          <Input
            placeholder="Manufacturer name"
            onChange={(e) => { handleInputVandor(e) }}
            value={newData.vandor}
          />
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={debounce(createNewData, newData)}>Submit</Button>
        </FormItem>
        <Modal
          title="Success message"
          visible={created}
          onOk={setCreated}
          okText="OK"
        >
        <p>Success to create new data.</p>
        </Modal>
        {errorMsg ? message.warning(errorMsg) : null}
      </Form>
    )
  }
}

const mapState = (state) => ({
  newData: state.create.newData,
  created: state.create.created,
  errorMsg: state.create.errorMsg
})

const mapDispatch = (dispatch) => ({
  handleInputOriginal(e) {
    const text = e.target.value
    dispatch(createAction.inputOriginal(text))
  },

  handleInputMaterial(e) {
    const text = e.target.value
    dispatch(createAction.inputMaterial(text))
  },

  handleInputDescription(e) {
    const text = e.target.value
    dispatch(createAction.inputDescription(text))
  },

  handleInputVandor(e) {
    const text = e.target.value
    dispatch(createAction.inputVandor(text))
  },

  setCreated() {
    dispatch(createAction.setCreated())
  },

  createNewData(data) {
    dispatch(createAction.addNewData(data))
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

export default connect(mapState, mapDispatch)(CreateCard)
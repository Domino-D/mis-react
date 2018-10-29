import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from './store'
import {
  Drawer,
  Divider,
  Icon
} from 'antd'

class DrawerCard extends Component {
  render() {
    const { drawerShow, selectedItem,closeDrawer } = this.props

    return (
      <div>
        <Drawer
          title="DETAIL SHEET OF SELECTED ITEM"
          placement="bottom"
          height={500}
          closable={false}
          onClose={closeDrawer}
          visible={drawerShow}
        >
          <div>
            <Divider orientation="left"><Icon type="file-text" theme="twoTone" /> Basic info.</Divider>
            <p><strong>Original No. </strong>{selectedItem.original || 'null'}</p>
            <p><strong>Material No. </strong>{selectedItem.material || 'null'}</p>
            <p><strong>Description </strong>{selectedItem.description || 'null'}</p>
            <p><strong>Vandor </strong>{selectedItem.vandor || 'null'}</p>
            <Divider orientation="left"><Icon type="tags" theme="twoTone" /> Creation info.</Divider>
            <p><strong>Contributor </strong>{selectedItem.contributor || 'null'}</p>
            <p><strong>Create time </strong>{selectedItem.creation || 'null'}</p>
            <p><strong>Status </strong>{selectedItem.status || 'null'}</p>
          </div>
        </Drawer>
      </div>
    )
  }
}

const mapState = (state) => ({
  drawerShow: state.edit.drawerShow,
  selectedItem: state.edit.selectedItem
})

const mapDispatch = (dispatch) => ({
  closeDrawer() {
    dispatch(createAction.drawerTrigger())
  }
})

export default connect(mapState, mapDispatch)(DrawerCard)
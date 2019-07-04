import React from 'react';
import { connect } from 'react-redux';



const ModalConductor = props => {
  switch (props.modal.modalType) {
    case 'LOG_IN':
//      return <LoginModal {...props}/>;
    default:
      return null;
  }
};

export default connect(
  state => ({
    modal: {
      ...state.default.modal
    }
  }),
  null
)(ModalConductor);

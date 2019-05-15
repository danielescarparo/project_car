import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react'

import './ModalWarning.css';

class ModalWarning extends Component {
  render() {
    const { active } = this.props;

    return (
        <Modal size='mini' open={active} onClose={(this.props.alteraModal)}>
          <Modal.Header className="icone-exclamacao"><Icon name='exclamation triangle' size='massive'/></Modal.Header>
          <Modal.Content className="texto-aviso">
            <p>Existe alguma peça que logo deverá ser revisada. Clique no botão "mais informações" para mais detalhes. </p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive content='OK' onClick={(this.props.alteraModal)}/>
          </Modal.Actions>
        </Modal> 
    );
  }
}

export default ModalWarning;
import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react'

import './ModalWarning.css';

class ModalWarning extends Component {
  render() {
    const { active } = this.props;

    return (
        <Modal size='mini' open={active} onClose={(this.props.alteraModalWarning)}>
          <Modal.Header className="icone-exclamacao-warning"><Icon name='exclamation triangle' size='massive'/></Modal.Header>
          <Modal.Content className="texto-aviso">
            <p>Existe alguma peça que logo deverá ser REVISADA. Clique no botão "mais informações" para mais detalhes.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive content='OK' onClick={(this.props.alteraModalWarning)}/>
          </Modal.Actions>
        </Modal> 
    );
  }
}

export default ModalWarning;
import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react'

import './ModalConfirm.css';

class ModalConfirm extends Component {
  render() {
    const { active } = this.props;

    return (
        <Modal size='mini' open={active}>
          <Modal.Header className="icone-exclamacao-check"><Icon name='check' size='massive'/></Modal.Header>
          <Modal.Content className="texto-aviso">
            <p>Seu mecanico deseja trocar a(s) peça(s):</p>

            <p>Deseja trocar?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button positive content='OK' onClick={(this.props.alteraModalWarning)}/>
          </Modal.Actions>
        </Modal> 
    );
  }
}

export default ModalConfirm;
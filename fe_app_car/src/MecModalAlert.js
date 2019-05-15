import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react'

import './MecModalAlert.css';

class MecModalAlert extends Component {
  render() {
    const { active } = this.props;

    return (
        <Modal size='mini' open={active} onClose={(this.props.alteraModalAlertMec)}>
          <Modal.Header className="icone-exclamacao-alert"><Icon name='exclamation triangle' size='massive'/></Modal.Header>
          <Modal.Content className="texto-aviso">
            <p>Existe alguma peça que deverá ser TROCADA. Clique no botão "mais informações" para mais detalhes.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive content='OK' onClick={(this.props.alteraModalAlertMec)}/>
          </Modal.Actions>
        </Modal> 
    );
  }
}

export default MecModalAlert;
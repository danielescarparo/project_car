import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react'

import './MecModalWarning.css';

class MecModalWarning extends Component {
  render() {
    const { active } = this.props;

    return (
        <Modal size='mini' open={active} onClose={(this.props.changesModalWarningMec)}>
          <Modal.Header className="icone-exclamacao-warning"><Icon name='exclamation triangle' size='massive'/></Modal.Header>
          <Modal.Content className="texto-aviso">
            <p>Existe alguma(s) peça(s) do seu cliente que logo precisará ser REVISADA.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive content='OK' onClick={(this.props.changesModalWarningMec)}/>
          </Modal.Actions>
        </Modal> 
    );
  }
}

export default MecModalWarning;
import React, { Component } from 'react';
import { Button, Modal, Icon, Checkbox } from 'semantic-ui-react'
import axios from 'axios';
import constants from './constants'
import './MecModalAlert.css';

class MecModalAlert extends Component {
    state = {
        selected : []
    }
    selectItem = (index) => {
        const copySelected = [...this.state.selected];
        copySelected.push(this.props.listPartsAlert[index].id);
        this.setState({selected : copySelected});
		console.log("Copiou", this.props.listPartsAlert[index].id);
    }

    checkboxAlert = () => {
        const elements = [];
        for(let index in this.props.listPartsAlert){
            if(this.props.listPartsAlert[index].stateModal === "ALERT"){
                elements.push(                    
                    <Checkbox key={this.props.listPartsAlert[index].id} label={`${this.props.listPartsAlert[index].name}`} onClick={() => this.selectItem(index)}/>                    
                )
            }    
        }
        return elements;
    }

    sendSelectedData = () => {
      axios.post(`${constants.URL}/carros/${this.props.match.params.id}/pecas/selecionadas`, {
          listaselected : `${this.state.selected}`
      }).then((response) => {
			this.setState({selected : []});
        })
        .catch((error) => {
          console.log(error);
        });
    
      this.props.changesModalAlertMec();
    }

    render() {
    const { active } = this.props;
        console.log(this.state.selected);
    return (
        <Modal size='mini' open={active}>
          <Modal.Header className="icone-exclamacao-alert"><Icon name='exclamation triangle' size='massive'/></Modal.Header>
          <Modal.Content className="texto-aviso">
            <p>Alguma(s) peça(s) do seu cliente deverá ser TROCADA. Selecione quais das peças abaixo devem ser trocadas no momento.</p>
            <div className="alinhado-checkbox">{this.checkboxAlert()}</div>
          </Modal.Content>
          <Modal.Actions>
            <Button positive content='OK' onClick={(this.sendSelectedData)}/>
          </Modal.Actions>
        </Modal> 
    );
  }
}

export default MecModalAlert;
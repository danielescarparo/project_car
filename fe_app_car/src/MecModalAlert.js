import React, { Component } from 'react';
import { Button, Modal, Icon, Checkbox } from 'semantic-ui-react'
import axios from 'axios';

import './MecModalAlert.css';

class MecModalAlert extends Component {
    state = {
        selecionados : []
    }
    selecionarItem = (index) => {
        const copiaSelecionados = [...this.state.selecionados];
        copiaSelecionados.push(this.props.listaPecasAlert[index].id);
        this.setState({selecionados : copiaSelecionados});
    }

    checkboxAlert = () => {
        const elementos = [];
        for(let index in this.props.listaPecasAlert){
            if(this.props.listaPecasAlert[index].alerta === "alert"){
                elementos.push(                    
                    <Checkbox label={`${this.props.listaPecasAlert[index].nome}`} onClick={() => this.selecionarItem(index)}/>                    
                )
            }    
        }
        return elementos;
    }

    enviaDadosSelecionados = () => {
        axios.post('http://private-31df06-mockprojectcar.apiary-mock.com/selecionados', {
            listaSelecionados : `${this.state.selecionados}`
        }).then((response) => {
            //modal finaliza usuario
          })
          .catch((error) => {
            console.log(error);
          });
      
        this.props.alteraModalAlertMec();
    }

    render() {
    const { active } = this.props;
        console.log(this.state.selecionados);
    return (
        <Modal size='mini' open={active}>
          <Modal.Header className="icone-exclamacao-alert"><Icon name='exclamation triangle' size='massive'/></Modal.Header>
          <Modal.Content className="texto-aviso">
            <p>Alguma(s) peça(s) do seu cliente deverá ser TROCADA. Selecione quais das peças abaixo devem ser trocadas no momento.</p>
            <div className="alinhado-checkbox">{this.checkboxAlert()}</div>
          </Modal.Content>
          <Modal.Actions>
            <Button positive content='OK' onClick={(this.enviaDadosSelecionados)}/>
          </Modal.Actions>
        </Modal> 
    );
  }
}

export default MecModalAlert;
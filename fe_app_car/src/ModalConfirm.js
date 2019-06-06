import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios';
import constants from './constants'
import './ModalConfirm.css';

class ModalConfirm extends Component {
    state = {
        state : false
    }
    
    listingData = () => {
        const elements = [];
        for(let index in this.props.listExchange){
            elements.push(                    
                <div key={this.props.listExchange[index].id}>{`${this.props.listExchange[index].name}`}</div>                    
            )  
        }
        return elements;
    }

    exchangeOrder = (currentState) => {
        axios.post(`${constants.URL}/carros/${this.props.match.params.id}/pecas/trocadas`, {
            state : currentState
        }).then((response) => {
            //troca feita com sucesso
          })
          .catch((error) => {
            console.log(error);
          });

        this.props.changesModalConfirm();
    }

    render() {
        const { active } = this.props;
        console.log(this.props.listExchange);
        return (
            <Modal size='mini' open={active}>
                <Modal.Header className="icone-exclamacao-check"><Icon name='check' size='massive'/></Modal.Header>
                <Modal.Content className="texto-aviso">
                <div><p>Seu mecanico deseja trocar a(s) peça(s):</p>
                {this.listingData()}
                <div className="confirmar-troca">Você também deseja trocar?</div></div>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={() => this.exchangeOrder(false)}>Não</Button>
                <Button positive content='Sim' onClick={() => this.exchangeOrder(true)}/>
                </Modal.Actions>
            </Modal> 
        );
    }
}

export default ModalConfirm;
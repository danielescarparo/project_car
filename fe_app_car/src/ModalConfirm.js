import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios';

import './ModalConfirm.css';

class ModalConfirm extends Component {
    state = {
        estado : false
    }
    listandoDados = () => {
        const elementos = [];
        for(let index in this.props.listaTrocas){
            elementos.push(                    
                <div key={this.props.listaTrocas[index].id}>{`${this.props.listaTrocas[index].nome}`}</div>                    
            )  
        }
        return elementos;
    }

    funcao = (estadoAtual) => {
        axios.post(`http://private-31df06-mockprojectcar.apiary-mock.com/carros/${this.props.match.params.id}/pecas/trocadas`, {
            estado : estadoAtual
        }).then((response) => {
            //troca feita com sucesso
          })
          .catch((error) => {
            console.log(error);
          });

        this.props.alteraModalConfirm();
    }

    render() {
        const { active } = this.props;
        console.log(this.props.listaTrocas);
        return (
            <Modal size='mini' open={active}>
                <Modal.Header className="icone-exclamacao-check"><Icon name='check' size='massive'/></Modal.Header>
                <Modal.Content className="texto-aviso">
                <div><p>Seu mecanico deseja trocar a(s) peça(s):</p>
                {this.listandoDados()}
                <div className="confirmar-troca">Você também deseja trocar?</div></div>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={() => this.funcao(false)}>Não</Button>
                <Button positive content='Sim' onClick={() => this.funcao(true)}/>
                </Modal.Actions>
            </Modal> 
        );
    }
}

export default ModalConfirm;
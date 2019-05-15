import React, { Component } from 'react';
import axios from 'axios';
import './Pecas.css';

class Pecas extends Component {
  state = {
    listaPecas: []
  };

  componentDidMount(){
    axios.get(`http://private-0a4c11-projectcar.apiary-mock.com/carros/${this.props.match.params.id}/pecas`)
    .then((response) => {
      this.setState({ listaPecas: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  exibeRetangulos = () => {
    const copiaListaPecas = [];

    for(let index in this.state.listaPecas){
      if(this.state.listaPecas[index].alerta === false)
      {
      copiaListaPecas.push(
      <div key={index} className="rectangle"> 
        <div>{`Peça: ${this.state.listaPecas[index].nome}`}</div>
        <div>{`Vida útil: ${this.state.listaPecas[index].km} km`}</div>
        <div>{`Km atual: ${this.state.listaPecas[index].km_atual} km`}</div>
      </div>)
      }else{
        copiaListaPecas.push(
          <div key={index} className="rectangle"> 
            <div>{`Peça: ${this.state.listaPecas[index].nome}`}</div>
            <div>{`Vida útil: ${this.state.listaPecas[index].km} km`}</div>
            <div>{`Km atual: ${this.state.listaPecas[index].km_atual} km`}</div>
            <div className="fundo-aviso">
              <i className="alerta fas fa-exclamation-triangle fa-2x"></i> 
              <div>Precisa ser trocada</div>
            </div>
          </div>)
      } 
    }

    return copiaListaPecas;
  }

  render() {
    return (
      <div>
        <div className="titulo-pecas">Informações das peças</div> 
        <div className="group-pecas">{this.exibeRetangulos()}</div>
      </div>
    );
  }
}

export default Pecas;

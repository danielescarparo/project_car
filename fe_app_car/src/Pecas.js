import React, { Component } from 'react';
import axios from 'axios';
import './Pecas.css';

class Pecas extends Component {
  state = {

  };

  componentDidMount(){

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
        <button className="botao-troca">Troquei peça</button>
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
            <button className="botao-troca">Troquei peça</button>
          </div>)
      } 
      }
    }
  render() {
    return (
      <div>        
        <div className="titulo-pecas">Selecione seu carro</div>
        <select defaultValue="" name="carroSelecionado" onChange={this.recebeDado} required={true}>
          <option disabled value=""> --- Selecione seu carro --- </option>
            {this.adicionarCarros()}
        </select>
        <div className="titulo-pecas">Informações das peças</div> 
        <div className="group-pecas">{this.exibeRetangulos()}</div>
      </div>
    );
  }
}

export default Pecas;

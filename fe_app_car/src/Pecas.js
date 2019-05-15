import React, { Component } from 'react';
import axios from 'axios';
import './Pecas.css';

class Pecas extends Component {
  state = {
    listaPecas: []
  };

  componentDidMount(){
    axios.get(`http://private-31df06-mockprojectcar.apiary-mock.com/carros/${this.props.match.params.id}/pecas`)
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
      if(this.state.listaPecas[index].alerta === "none")
      {
        copiaListaPecas.push(
        <div key={index} className="rectangle"> 
          <div><b>{`Peça:`}</b> {`${this.state.listaPecas[index].nome}`}</div>
          <div><b>{`Km vida útil:`}</b> {`${this.state.listaPecas[index].km} km`}</div>
          <div><b>{`Km atual:`}</b> {`${this.state.listaPecas[index].km_atual} km`}</div>
          <div><b>{`${this.state.listaPecas[index].descricao} até:`}</b> {`${this.state.listaPecas[index].aceito}`}</div>
          <div><b>{`${this.state.listaPecas[index].descricao} atual:`}</b> {`${this.state.listaPecas[index].atual}`}</div>
        </div>)
      }else if(this.state.listaPecas[index].alerta === "warning"){
        copiaListaPecas.push(
          <div key={index} className="rectangle"> 
            <div><b>{`Peça:`}</b> {`${this.state.listaPecas[index].nome}`}</div>
            <div><b>{`Km vida útil:`}</b> {`${this.state.listaPecas[index].km} km`}</div>
            <div><b>{`Km atual:`}</b> {`${this.state.listaPecas[index].km_atual} km`}</div>
            <div><b>{`${this.state.listaPecas[index].descricao} até:`}</b> {`${this.state.listaPecas[index].aceito}`}</div>
            <div><b>{`${this.state.listaPecas[index].descricao} atual:`}</b> {`${this.state.listaPecas[index].atual}`}</div>
            <div className="fundo-aviso-yellow">
              <i className="alerta-yellow fas fa-exclamation-triangle fa-2x"></i> 
              <div><i>Logo precisará ser revisada</i></div>
            </div>
          </div>)
      }else{
        copiaListaPecas.push(
          <div key={index} className="rectangle"> 
            <div><b>{`Peça:`}</b> {`${this.state.listaPecas[index].nome}`}</div>
            <div><b>{`Km vida útil:`}</b> {`${this.state.listaPecas[index].km} km`}</div>
            <div><b>{`Km atual:`}</b> {`${this.state.listaPecas[index].km_atual} km`}</div>
            <div><b>{`${this.state.listaPecas[index].descricao} até:`}</b> {`${this.state.listaPecas[index].aceito}`}</div>
            <div><b>{`${this.state.listaPecas[index].descricao} atual:`}</b> {`${this.state.listaPecas[index].atual}`}</div>
            <div className="fundo-aviso-red">
              <i className="alerta-red fas fa-exclamation-triangle fa-2x"></i> 
              <div><i>Precisa ser trocada</i></div>
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

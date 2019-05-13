import React, { Component } from 'react';
import axios from 'axios';
import './Pecas.css';

class Pecas extends Component {
  state = {
    carroSelecionado : 0,
    listaCarros : []
  };

  componentDidMount(){
    //busca no backend os carros
    axios.get('http://private-31df06-mockprojectcar.apiary-mock.com/carros')
    .then((response) => {
        console.log(response.data);
      this.setState({ listaCarros: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  recebeDado = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  adicionarCarros = () => {
    return this.state.listaCarros.map((carro) => {
        return <option key={carro.id} className="carros" value={carro.id}>{`Marca: ${carro.marca}, Modelo: ${carro.modelo}, Versão: ${carro.versao}, Ano: ${carro.ano}, Motor: ${carro.motor}`} </option>
    });
  }

  render() {
    return (
      <div>        
        <div className="titulo-pecas">Selecione seu carro</div>
        <select defaultValue="" name="carroSelecionado" onChange={this.recebeDado} required={true}>
          <option disabled value=""> --- Selecione seu carro --- </option>
            {this.adicionarCarros()}
        </select>
      </div>
    );
  }
}

export default Pecas;

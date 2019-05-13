import React, { Component } from 'react';
import axios from 'axios';
import './Carro.css';

class Carro extends Component {
    state = {
        carroSelecionado : 0,
        listaCarros : [],
        listaPecas: []
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

    buscaPecas = () => {
        axios.get(`http://private-31df06-mockprojectcar.apiary-mock.com/carro/${this.state.carroSelecionado}/`)
        .then((response) => {
          this.setState({ listaPecas: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    recebeDado = (e) => {
        this.setState({[e.target.name]: e.target.value}, this.buscaPecas);
    }
    
    adicionarCarros = () => {
        return this.state.listaCarros.map((carro) => {
            return <option key={carro.id} className="carros" value={carro.id}>{`Marca: ${carro.marca}, Modelo: ${carro.modelo}, Versão: ${carro.versao}, Ano: ${carro.ano}, Motor: ${carro.motor}`} </option>
        });
    }

  render() {
    return (
        <div className="carro-group">        
        <div className="titulo-pecas">Selecione seu carro</div>
        <select className="select-carros" defaultValue="" name="carroSelecionado" onChange={this.recebeDado} required={true}>
          <option disabled value=""> --- Selecione seu carro --- </option>
            {this.adicionarCarros()}
        </select>
      </div>
    );
  }
}

export default Carro;

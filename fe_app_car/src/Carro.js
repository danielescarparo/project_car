import React, { Component } from 'react';
import { Select } from 'semantic-ui-react'
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

    // buscaPecas = () => {
    //     axios.get(`http://private-31df06-mockprojectcar.apiary-mock.com/carro/${this.state.carroSelecionado}/`)
    //     .then((response) => {
    //       this.setState({ listaPecas: response.data });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    
    confirmarCarro = () => {
        axios.post(`http://private-31df06-mockprojectcar.apiary-mock.com/carros/${this.state.carroSelecionado}`)
        .then((response) => {
            this.props.history.push(`carros/${this.state.carroSelecionado}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    recebeDado = (e, data) => {
      console.log(e, data);
      console.log(e.target.name);
        this.setState({[data.name]: data.value});
        // this.setState({[e.target.name]: e.target.value}, this.buscaPecas);
    }
    
    adicionarCarros = () => {
        return this.state.listaCarros.map((carro) => {
            return {
              key: carro.id,
              value: carro.id,
              text: `Marca: ${carro.marca}, Modelo: ${carro.modelo}, Versão: ${carro.versao}, Ano: ${carro.ano}, Motor: ${carro.motor}`
            } 
            
            // <option key={carro.id} className="carros" value={carro.id}>{`Marca: ${carro.marca}, Modelo: ${carro.modelo}, Versão: ${carro.versao}, Ano: ${carro.ano}, Motor: ${carro.motor}`} </option>
        });
    }

  render() {
    return (
        <div className="carro-group">        
        <div className="titulo-pecas">Selecione seu carro</div>
        <Select placeholder='Selecione seu carro' options={this.adicionarCarros()} name="carroSelecionado" onChange={this.recebeDado} required={true}/>
        {/* <select className="select-carros" defaultValue="" name="carroSelecionado" onChange={this.recebeDado} required={true}>
          <option disabled value=""> --- Selecione seu carro --- </option>
            {this.adicionarCarros()}
        </select> */}
        <button className="button-cadastro confirmar-carro" onClick={this.confirmarCarro}>Confirmar carro</button>
      </div>
    );
  }
}

export default Carro;

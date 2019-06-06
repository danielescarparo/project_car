import React, { Component } from 'react';
import { Select } from 'semantic-ui-react'
import axios from 'axios';
import './Carro.css';
import constants from './constants'

class Carro extends Component {
    state = {
        selectCar : 0,
        listCars : [],
        listParts: []
    };

    componentDidMount(){
        //busca no backend os carros
        axios.get(`${constants.URL}/carros`)
        .then((response) => {
            console.log(response.data);
          this.setState({ listCars: response.data });
        })
        .catch((error) => {
          console.log(error);
        });    
    }

    // buscaPecas = () => {
    //     axios.get(`${constants.URL}/carros/${this.state.selectCar}/`)
    //     .then((response) => {
    //       this.setState({ listParts: response.data });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    
    confirmCar = () => {
        // axios.post(`${constants.URL}/carros/${this.state.selectCar}`)
        // .then((response) => {
            this.props.history.push(`carros/${this.state.selectCar}`);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
    }

    receiveData = (e, data) => {
      console.log(e, data);
      console.log(e.target.name);
        this.setState({[data.name]: data.value});
        // this.setState({[e.target.name]: e.target.value}, this.buscaPecas);
    }
    
    addCars = () => {
        return this.state.listCars.map((car) => {
            return {
              key: car.id,
              value: car.id,
              text: `Marca: ${car.brand}, Modelo: ${car.model}, Versão: ${car.version}, Ano: ${car.year}, Motor: ${car.engine}`
            } 
            
            // <option key={car.id} className="carros" value={car.id}>{`Marca: ${car.marca}, Modelo: ${car.modelo}, Versão: ${car.versao}, Ano: ${car.ano}, Motor: ${car.motor}`} </option>
        });
    }

  render() {
    return (
        <div className="carro-group">        
        <div className="titulo-pecas">Selecione seu carro</div>
        <Select placeholder='Selecione seu carro' options={this.addCars()} name="selectCar" onChange={this.receiveData} required={true}/>
        {/* <select className="select-carros" defaultValue="" name="selectCar" onChange={this.receiveData} required={true}>
          <option disabled value=""> --- Selecione seu carro --- </option>
            {this.addCars()}
        </select> */}
        <button className="button-cadastro confirmar-carro" onClick={this.confirmCar}>Confirmar carro</button>
      </div>
    );
  }
}

export default Carro;

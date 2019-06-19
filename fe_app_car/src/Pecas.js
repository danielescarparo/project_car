import React, { Component } from 'react';
import axios from 'axios';
import './Pecas.css';
import constants from './constants'

class Pecas extends Component {
  state = {
    listParts: []
  };

  componentDidMount(){
    axios.get(`${constants.URL}/carros/${this.props.match.params.id}/pecas`)
    .then((response) => {
      this.setState({ listParts: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  displaysRectangles = () => {
    const copyPartsList = [];

    for(let index in this.state.listParts){
      if(this.state.listParts[index].stateModal === "NONE")
      {
        copyPartsList.push(
        <div key={index} className="rectangle"> 
          <div><b>{`Peça:`}</b> {`${this.state.listParts[index].name}`}</div>
          <div><b>{`Km vida útil:`}</b> {`${this.state.listParts[index].kmLifespan} km`}</div>
          <div><b>{`Km atual:`}</b> {`${this.state.listParts[index].kmPresent} km`}</div>
          <div><b>{`${this.state.listParts[index].description} até:`}</b> {`${this.state.listParts[index].validity}`}</div>
          <div><b>{`${this.state.listParts[index].description} atual:`}</b> {`${this.state.listParts[index].wear}`}</div>
        </div>)
      }else if(this.state.listParts[index].stateModal === "WARNING"){
        copyPartsList.push(
          <div key={index} className="rectangle"> 
            <div><b>{`Peça:`}</b> {`${this.state.listParts[index].name}`}</div>
            <div><b>{`Km vida útil:`}</b> {`${this.state.listParts[index].kmLifespan} km`}</div>
            <div><b>{`Km atual:`}</b> {`${this.state.listParts[index].kmPresent} km`}</div>
            <div><b>{`${this.state.listParts[index].description} até:`}</b> {`${this.state.listParts[index].validity}`}</div>
            <div><b>{`${this.state.listParts[index].description} atual:`}</b> {`${this.state.listParts[index].wear}`}</div>
            <div className="fundo-aviso-yellow">
              <i className="alerta-yellow fas fa-exclamation-triangle fa-2x"></i> 
              <div><i>Logo precisará ser revisada</i></div>
            </div>
          </div>)
      }else{
        copyPartsList.push(
          <div key={index} className="rectangle"> 
            <div><b>{`Peça:`}</b> {`${this.state.listParts[index].name}`}</div>
            <div><b>{`Km vida útil:`}</b> {`${this.state.listParts[index].kmLifespan} km`}</div>
            <div><b>{`Km atual:`}</b> {`${this.state.listParts[index].kmPresent} km`}</div>
            <div><b>{`${this.state.listParts[index].description} até:`}</b> {`${this.state.listParts[index].validity}`}</div>
            <div><b>{`${this.state.listParts[index].description} atual:`}</b> {`${this.state.listParts[index].wear}`}</div>
            <div className="fundo-aviso-red">
              <i className="alerta-red fas fa-exclamation-triangle fa-2x"></i> 
              <div><i>Precisa ser trocada</i></div>
            </div>
          </div>)
      }
    }

    return copyPartsList;
  }

  render() {
    return (
      <div>
        <div className="titulo-pecas">Informações das peças</div> 
        <div className="group-pecas">{this.displaysRectangles()}</div>
      </div>
    );
  }
}

export default Pecas;

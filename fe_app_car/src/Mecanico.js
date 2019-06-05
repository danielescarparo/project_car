import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Pecas.css';
import MecModalWarning from './MecModalWarning'
import MecModalAlert from './MecModalAlert'

let time;

class Pecas extends Component {
  state = {
    listParts: [],
    activeModalWarningMec: false,
    activeModalAlertMec: false
  };

  componentDidMount(){
    time = setInterval(this.getStatusModal, 5000);

    axios.get(`http://private-31df06-mockprojectcar.apiary-mock.com/carros/${this.props.match.params.id}/pecas`)
    .then((response) => {
      this.setState({ listParts: response.data });
      this.getStatusModal();
    })
    .catch((error) => {
      console.log(error);
    });    
  }

  getStatusModal = () => {
    axios.get(`http://private-31df06-mockprojectcar.apiary-mock.com/carros/${this.props.match.params.id}/mecanico`)
    .then((response) => {
      console.log(response.data);
      this.verifyModal(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  changesModalWarningMec = () => {
    this.setState({ activeModalWarningMec: false });
    time = setInterval(this.getStatusModal, 5000);
  }

  changesModalAlertMec = () => {
    this.setState({ activeModalAlertMec: false });
    time = setInterval(this.getStatusModal, 5000);
  }

  verifyModal = (car) => {
    console.log("carro:", car);
    if (car.stateModal === "warning") {
        this.setState({ activeModalWarningMec: true });
        clearInterval(time);
    }
    if (car.stateModal === "alert") {
      this.setState({ activeModalAlertMec: true });
      clearInterval(time);
    }
  }

  displaysRectangles = () => {
    const copyPartsList = [];

    for(let index in this.state.listParts){
      if(this.state.listParts[index].stateModal === "none")
      {
        copyPartsList.push(
        <div key={index} className="rectangle"> 
          <div><b>{`Peça:`}</b> {`${this.state.listParts[index].name}`}</div>
          <div><b>{`Km vida útil:`}</b> {`${this.state.listParts[index].kmLifespan} km`}</div>
          <div><b>{`Km atual:`}</b> {`${this.state.listParts[index].kmPresent} km`}</div>
          <div><b>{`${this.state.listParts[index].description} até:`}</b> {`${this.state.listParts[index].validity}`}</div>
          <div><b>{`${this.state.listParts[index].description} atual:`}</b> {`${this.state.listParts[index].wear}`}</div>
        </div>)
      }else if(this.state.listParts[index].stateModal === "warning"){
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
      <Fragment>
        <MecModalWarning active={this.state.activeModalWarningMec} changesModalWarningMec={this.changesModalWarningMec}/>
        <MecModalAlert active={this.state.activeModalAlertMec} changesModalAlertMec={this.changesModalAlertMec} listPartsAlert={this.state.listParts} match={this.props.match}/>
        <div>
          <div className="titulo-pecas">Informações das peças do seu cliente</div> 
          <div className="group-pecas">{this.displaysRectangles()}</div>
        </div>
      </Fragment>
    );
  }
}

export default Pecas;

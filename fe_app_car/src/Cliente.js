import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Cliente.css';
import ModalWarning from './ModalWarning'
import ModalAlert from './ModalAlert'
import ModalConfirm from './ModalConfirm'
import constants from './constants'
import { Select } from 'semantic-ui-react'

let time;

class Cliente extends Component {
  state = {
    listTypeSelect : [],
    kilometer : "",
    routeSelect : "",
    millimeterTire : "",
    millimeterDisc : "",
    millimeterPastille : "",
    monthsFluid : "",
    monthsAdditive : "",
    car : {},
    stateCarro : {},
    activeModalWarning: false,
    activeModalAlert: false,
    activeModalConfirm: false,
    previousState : "NONE",
    listExchange: []
  };

  componentDidMount(){
    time = setInterval(this.upgradeModal, 5000);

    //busca no backend os tipos de vias
    axios.get(`${constants.URL}/carros/rotas`)
    .then((response) => {
        console.log(response.data);
      this.setState({ listTypeSelect : response.data });
    })
    .catch((error) => {
      console.log(error);
    });
    
    this.upgradeCar();

    this.upgradeModal();

    axios.get(`${constants.URL}/carros/${this.props.match.params.id}/trocas`)
    .then((response) => {
        this.setState({ listExchange : response.data });
        console.log("aqui",response.data);
    })
    .catch((error) => {
        console.log(error);
    });
  }

  addVia = () => {
    return this.state.listTypeSelect.map((via) => {
      return {
        key: via,
        value: via,
        text: via
      } 
    });    
    // return this.state.listTypeSelect.map((via) => {
    //     return <option key={via} className="carros" value={via}>{`${via}`} </option>
    // });
  }

  receiveData = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  receiveDataSelect = (e, data) => {
    console.log("verdadeiro", e, data);
    console.log(e.target.name);
      this.setState({[data.name]: data.value});
  }

  upgradeModal = async () => {
    this.upgradeCar();

    axios.get(`${constants.URL}/carros/${this.props.match.params.id}/trocas`)
    .then((response) => {
        this.setState({ listExchange : response.data });
        console.log("aqui",response.data);
    })
    .catch((error) => {
        console.log(error);
    });

    axios.get(`${constants.URL}/carros/${this.props.match.params.id}/modal`, )
    .then((response) => {
        this.setState({ stateCarro : response.data });
        this.verifyModal(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  upgradeCar = () => {
    axios.get(`${constants.URL}/carros/${this.props.match.params.id}/descricao`)
    .then((response) => {
        this.setState({ car : response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  submitData = (e) => {
    e.preventDefault();
    console.log(e.target);
    axios.post(`${constants.URL}/carros/${this.props.match.params.id}/corrida`, {
        kilometer : `${this.state.kilometer}`,
        route : `${this.state.routeSelect}`,
        millimeterTire : `${this.state.millimeterTire}`,
        millimeterDisc : `${this.state.millimeterDisc}`,
        millimeterPastille : `${this.state.millimeterPastille}`,
        monthsFluid : `${this.state.monthsFluid}`,
        monthsAdditive : `${this.state.monthsAdditive}`
    }).then((response) => {
        this.setState({kilometer : "", routeSelect : "", millimeterTire : "", millimeterDisc : "", millimeterPastille : "", monthsFluid : "", monthsAdditive : ""})
        this.upgradeCar();
		this.props.history.push(`/carros/${this.props.match.params.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fillPercentage = () => {
    const elements = [];
    const nameParts = ["millimeterTire", "millimeterDisc", "millimeterPastille", "monthsFluid", "monthsAdditive"];

    console.log("Carro:", this.state.car);

    for(let index in this.state.car.parts){
      elements.push(
        <div key={this.state.car.parts[index].name}>
          <div className="texto-cadastro">
            {`${this.state.car.parts[index].name}`}
          </div>

          <input 
            className="input-estilo" 
            name={`${nameParts[index]}`} 
            onChange={this.receiveData} 
            value={this.state[nameParts[index]]} 
            required={true} 
            placeholder={`${this.state.car.parts[index].description}`}
          >
          </input>
          
          <div className="limite">
            <div className="preenchido" style={{ width: `${this.state.car.parts[index].state}%`}}>
              {`${this.state.car.parts[index].state}%`}
            </div>
          </div>
        </div>);
    }

    return elements;
  }

  changesModalWarning = () => {
    this.setState({ activeModalWarning: false });
    time = setInterval(this.upgradeModal, 5000);
  }

  changesModalAlert = () => {
    this.setState({ activeModalAlert: false });
    time = setInterval(this.upgradeModal, 5000);
  }

  changesModalConfirm = () => {
    this.setState({ activeModalConfirm: false });
    time = setInterval(this.upgradeModal, 5000);
  }

  verifyModal = (stateCarro) => {
    console.log("Estado:", stateCarro);
    if ((stateCarro.stateModal === "WARNING") && (this.state.previousState !== "WARNING")){
        this.setState({ activeModalWarning: true });
        this.setState({previousState : "WARNING"});
        clearInterval(time);
    }
    if ((stateCarro.stateModal === "ALERT") && (this.state.previousState !== "ALERT")){
      this.setState({ activeModalAlert: true });
      this.setState({previousState : "ALERT"});
      clearInterval(time);
    }
    if ((stateCarro.stateModal === "PENDING") && (this.state.previousState !== "PENDING")) {
      this.setState({ activeModalConfirm: true });
      this.setState({previousState : "PENDING"});
      clearInterval(time);
    }
  }

  callParts = () => {
    this.props.history.push(`/carros/${this.props.match.params.id}/pecas`);
  }

  render() {
    console.log(this.state.car);
    const { listExchange } = this.state;

    return (
      <Fragment>
        <ModalWarning active={this.state.activeModalWarning} changesModalWarning={this.changesModalWarning}/>
        <ModalAlert active={this.state.activeModalAlert} changesModalAlert={this.changesModalAlert}/>
        <ModalConfirm active={this.state.activeModalConfirm} changesModalConfirm={this.changesModalConfirm} listExchange={listExchange} match={this.props.match} upgradeCar={this.upgradeCar}/>
        <div className="dois-blocos">
        <form className="html-login" onSubmit={this.submitData}>        
          <div className="margem-cadastro">
            <div className="titulo-pecas">Entre com as informações abaixo</div>            
              <div className="dados">
                <div className="texto-cadastro">Quilometragem</div>
                <input className="input-estilo" name="kilometer" onChange={this.receiveData} value={this.state.kilometer} required={true}></input>
                <div className="texto-cadastro">Via</div>
                <Select placeholder='Selecione o tipo de via rodada' options={this.addVia()} name="routeSelect" onChange={this.receiveDataSelect} required={true}/>
                {/* <select name="routeSelect" onChange={this.receiveData} value={this.state.routeSelect} required={true} className="selectVia">
                    <option disabled value=""> --- Selecione o tipo de via rodada --- </option>
                        {this.addVia()}
                </select> */}
                {this.fillPercentage()}
                <button className="button-cadastro" type="submit">Submeter</button>
                <button className="button-cadastro outras-prop-botao" onClick={this.callParts}><i className="fas fa-plus"></i> Informações</button>
            </div>            
          </div>
        </form>
        </div>
      </Fragment>
    );
  }
}

export default Cliente;

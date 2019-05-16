import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Cliente.css';
import ModalWarning from './ModalWarning'
import ModalAlert from './ModalAlert'
import ModalConfirm from './ModalConfirm'

let time;

class Cliente extends Component {
  state = {
    listaTipoSelect : [],
    kmCadastro : "",
    viaSelecionada : "",
    mmPneu : "",
    mmDisco : "",
    mmPastilha : "",
    mesesFluido : "",
    mesesAditivo : "",
    carro : {},
    activeModalWarning: false,
    activeModalAlert: false,
    activeModalConfirm: false,
    listaTrocas: []
  };

  componentDidMount(){
    time = setInterval(this.atualizarCarro, 5000);

    //busca no backend os tipos de vias
    axios.get('http://private-31df06-mockprojectcar.apiary-mock.com/corrida/meta')
    .then((response) => {
        console.log(response.data);
      this.setState({ listaTipoSelect : response.data });
    })
    .catch((error) => {
      console.log(error);
    });
    
    this.atualizarCarro();

    axios.get(`http://private-31df06-mockprojectcar.apiary-mock.com/carros/${this.props.match.params.id}/trocas`)
    .then((response) => {
        this.setState({ listaTrocas : response.data });
})
    .catch((error) => {
        console.log(error);
    });
  }

  adicionarVia = () => {
    return this.state.listaTipoSelect.map((via) => {
        return <option key={via} className="carros" value={via}>{`${via}`} </option>
    });
  }

  recebeDado = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  atualizarCarro = () => {
    axios.get(`http://private-31df06-mockprojectcar.apiary-mock.com/carros/${this.props.match.params.id}`)
    .then((response) => {
        this.setState({ carro : response.data });
        this.verificaModal(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  submeterDados = (e) => {
    e.preventDefault();
    console.log(e.target);
    axios.post('http://private-31df06-mockprojectcar.apiary-mock.com/sub', {
        kmCadastro : `${this.state.kmCadastro}`,
        viaSelecionada : `${this.state.viaSelecionada}`,
        mmPneu : `${this.state.mmPneu}`,
        mmDisco : `${this.state.mmDisco}`,
        mmPastilha : `${this.state.mmPastilha}`,
        mesesFluido : `${this.state.mesesFluido}`,
        mesesAditivo : `${this.state.mesesAditivo}`
    }).then((response) => {
        this.setState({kmCadastro : "", viaSelecionada : "", mmPneu : "", mmDisco : "", mmPastilha : "", mesesFluido : "", mesesAditivo : ""})
        this.props.history.push(`/carros/${this.props.match.params.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  preenchimentoPorcentagem = () => {
    const elementos = [];
    const nomePecas = ["mmPneu", "mmDisco", "mmPastilha", "mesesFluido", "mesesAditivo"];

    for(let index in this.state.carro.pecas){
      elementos.push(<div key={this.state.carro.pecas[index].id}><div className="texto-cadastro">{`${this.state.carro.pecas[index].nome}`}</div><input className="input-estilo" name={`${nomePecas[index]}`} onChange={this.recebeDado} value={this.state[nomePecas[index]]} required={true} placeholder={`${this.state.carro.pecas[index].descricao}`}></input><div className="limite"><div className="preenchido" style={{ width: `${this.state.carro.pecas[index].state}%`}}>{`${this.state.carro.pecas[index].state}%`}</div></div></div>);
    }

    return elementos;
  }

  alteraModalWarning = () => {
    this.setState({ activeModalWarning: false });
    time = setInterval(this.atualizarCarro, 5000);
  }

  alteraModalAlert = () => {
    this.setState({ activeModalAlert: false });
    time = setInterval(this.atualizarCarro, 5000);
  }

  alteraModalConfirm = () => {
    this.setState({ activeModalConfirm: false });
    time = setInterval(this.atualizarCarro, 5000);
  }

  verificaModal = (carro) => {
    console.log("carro:", carro);
    if (carro.stateModal === "warning") {
        this.setState({ activeModalWarning: true });
        clearInterval(time);
    }
    if ((carro.stateModal === "alert") && (carro.stateConfirm === false)) {
      this.setState({ activeModalAlert: true });
      clearInterval(time);
    }
    if ((carro.stateModal === "alert") && (carro.stateConfirm === true)) {
      this.setState({ activeModalConfirm: true });
      clearInterval(time);
    }
  }

  chamaPecas = () => {
    this.props.history.push(`/carros/${this.props.match.params.id}/pecas`);
  }

  render() {
    console.log(this.state.carro);
    const { listaTrocas } = this.state;

    return (
      <Fragment>
        <ModalWarning active={this.state.activeModalWarning} alteraModalWarning={this.alteraModalWarning}/>
        <ModalAlert active={this.state.activeModalAlert} alteraModalAlert={this.alteraModalAlert}/>
        <ModalConfirm active={this.state.activeModalConfirm} alteraModalConfirm={this.alteraModalConfirm} listaTrocas={listaTrocas} match={this.props.match}/>
        <div className="dois-blocos">
        <form className="html-login" onSubmit={this.submeterDados}>        
          <div className="margem-cadastro">
            <div className="titulo-pecas">Entre com as informações abaixo</div>            
              <div className="dados">
                <div className="texto-cadastro">Quilometragem</div>
                <input className="input-estilo" name="kmCadastro" onChange={this.recebeDado} value={this.state.kmCadastro} required={true}></input>
                <div className="texto-cadastro">Via</div>
                <select name="viaSelecionada" onChange={this.recebeDado} value={this.state.viaSelecionada} required={true} className="selectVia">
                    <option disabled value=""> --- Selecione o tipo de via rodada --- </option>
                        {this.adicionarVia()}
                </select>
                {this.preenchimentoPorcentagem()}
                <button className="button-cadastro" type="submit">Submeter</button>
                <button className="button-cadastro outras-prop-botao" onClick={this.chamaPecas}><i className="fas fa-plus"></i> Informações</button>
            </div>            
          </div>
        </form>
        </div>
      </Fragment>
    );
  }
}

export default Cliente;

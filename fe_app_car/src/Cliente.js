import React, { Component } from 'react';
import axios from 'axios';
import './Cliente.css';

class Cliente extends Component {
  state = {
    listaTipoSelect : [],
    kmCadastro : "",
    viaSelecionada : 0,
    mmPneu : "",
    mmDisco : "",
    mmPastilha : "",
    mesesFluido : "",
    mesesAditivo : "",
    carro : {}
  };

  componentDidMount(){
    //busca no backend os tipos de vias
    axios.get('http://private-31df06-mockprojectcar.apiary-mock.com/corrida/meta')
    .then((response) => {
        console.log(response.data);
      this.setState({ listaTipoSelect : response.data });
    })
    .catch((error) => {
      console.log(error);
    });
    
    axios.get(`http://private-31df06-mockprojectcar.apiary-mock.com/carros/${this.props.match.params.id}`)
    .then((response) => {
        console.log(response.data);
        this.setState({ carro : response.data });
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
        this.props.history.push("/pecas");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  preenchimentoPorcentagem = () => {
    const elementos = [];

    for(let index in this.state.carro.pecas){
      elementos.push(<div className="limite"><div key={this.state.carro.pecas[index].id} className="preenchido" style={{ width: `${this.state.carro.pecas[index].state}%` }}>{`${this.state.carro.pecas[index].state}%`}</div></div>);
    }

    return elementos;
  }

  render() {
    console.log(this.state.carro);
    return (
      <div className="dois-blocos">
      <form className="html-login" onSubmit={this.submeterDados}>        
        <div className="margem-cadastro">
        <div className="titulo-pecas">Entre com as informações abaixo</div> 
          <div className="dados">
            <div className="texto-cadastro">Quilometragem</div>
            <input className="input-estilo" name="kmCadastro" onChange={this.recebeDado} required={true}></input>
            <div className="texto-cadastro">Via</div>
            <select defaultValue="" name="viaSelecionada" onChange={this.recebeDado} required={true} className="selectVia">
                <option disabled value=""> --- Selecione o tipo de via rodada --- </option>
                    {this.adicionarVia()}
            </select>
            <div className="texto-cadastro">Pneu - Profundidade em mm</div>
            <input className="input-estilo" name="mmPneu" onChange={this.recebeDado} required={true}></input>            
            {this.preenchimentoPorcentagem()}
            <div className="texto-cadastro">Disco de freio - Espessura em mm</div>
            <input className="input-estilo" type="text" name="mmDisco" onChange={this.recebeDado} required={true}></input>
            <div className="texto-cadastro">Pastilha de freio - Espessura em mm</div>
            <input className="input-estilo" type="text" name="mmPastilha" onChange={this.recebeDado} required={true}></input>
            <div className="texto-cadastro">Fluido de freio - Meses</div>
            <input className="input-estilo" type="text" name="mesesFluido" onChange={this.recebeDado} required={true}></input>
            <div className="texto-cadastro">Aditivo de radiador - Meses</div>
            <input className="input-estilo" type="text" name="mesesAditivo" onChange={this.recebeDado} required={true}></input>
            <button className="button-cadastro" type="submit">Submeter</button>
          </div>            
        </div>
      </form>
      </div>
    );
  }
}

export default Cliente;

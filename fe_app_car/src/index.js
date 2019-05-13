import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './index.css';
import Cliente from './Cliente';
import Mecanico from './Mecanico';
import Pecas from './Pecas';

ReactDOM.render(
  <BrowserRouter>
    <div className="titulo">Peças de carros para manutenção</div>
  <Switch>      
    <Route exact path="/" component={Cliente}/>
    <Route exact path="/cliente" component={Cliente}/>
    <Route exact path="/mecanico" component={Mecanico}/>
    <Route exact path="/pecas" component={Pecas}/>
    {/* <Route exact path="/carros/:id" component={Peca}/> */}
  </Switch> 
</BrowserRouter>,
  document.getElementById('root')
);

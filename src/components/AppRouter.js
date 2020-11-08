import React from 'react'
import { Switch, Route } from 'react-router-dom';
import IsentropicForm from './IsentropicForm';
import NormalForm from './NormalForm';
import ObliqueForm from './ObliqueForm';
import FannoForm from './FannoForm';
import RayleighForm from './RayleighForm';
import WelcomePage from './WelcomePage';

export default function AppRouter() {
  return <div className="page-view ui bottom attached segment active tab">
    <Switch>
      <Route path='/isentropic' component={IsentropicForm} />
      <Route path='/normalshock' component={NormalForm} />
      <Route path="/obliqueshock" component={ObliqueForm} />
      <Route path="/fanno" component={FannoForm} />
      <Route path="/rayleigh" component={RayleighForm} />
      <Route component={WelcomePage} />
    </Switch>
  </div>

}

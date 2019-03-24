import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Selector from './Selector';
import Questionnaire from './Questionnaire';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Selector} />
      <Route exact path='/questionnaire/:id' component={Questionnaire} />
    </Switch>
  </BrowserRouter>
)

export default App;

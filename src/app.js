import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Selector from './Selector';
import Questionnaire from './Questionnaire';

import { GlobalStyles } from './styles';

const App = () => (
  <React.Fragment>
    <GlobalStyles />
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Selector} />
        <Route exact path='/questionnaire/:id' component={Questionnaire} />
      </Switch>
    </BrowserRouter>
  </React.Fragment>
)

export default App;

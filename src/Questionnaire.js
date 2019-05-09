import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

import { QuestionnaireContainer } from './styles';

class Questionnaire extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: '',
    }
  }

  handleSubmit = () => {
    if (!this.state.rating) {
      return;
    }
    let result;
    
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
        .then(data => {
            result = data
            ipcRenderer.send('finish-evaluation', {
              id: this.props.match.params.id,
              rating: this.state.rating,
              result
        });
      })
  }

  handleSelection = (e) => {
    this.setState({
      rating: e.target.value,
    });
  }

  render() {

    return (
      <QuestionnaireContainer>
        <h2>Provide a PBAGE Rating</h2>

        <select value={this.state.rating} onChange={this.handleSelection}>
          <option value=''> Select a rating </option>
          <option value='Poor'> Poor </option>
          <option value='Bad'> Bad </option>
          <option value='Average'> Average </option>
          <option value='Good'> Good </option>
          <option value='Excellent'> Excellent </option>
        </select>
        
        <div>
          <button
            disabled={!this.state.rating}
            onClick={this.handleSubmit}
          >
            Done
          </button>
        </div>
      </QuestionnaireContainer>
    );
  }
}

export default Questionnaire;

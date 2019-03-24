import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      evaluations: [{
        env: 'FLIPKART',
        name: 'Flipkart Default',
        completed: false,
        landingUrl: 'https://flipkart.com/search',
        rating: '',
      }, {
        env: 'FLIPKART',
        name: 'Flipkart Logged In',
        completed: false,
        landingUrl: 'https://flipkart.com/search',
        sessionId: '2.VIDED13C5D5E314C30A5D7A99259025B53.SI2B701D0297CB4DF8BC0FEDED1CC02A4D.VSFF17FB43D70342FFBFF1247449972D56.1553356937',
        rating: '',
      }, {
        env: 'AMAZON',
        name: 'Amazon',
        completed: false,
        landingUrl: 'https://www.amazon.in/s/ref=nb_sb_noss_2',
        rating: '',
      }]
    };

    ipcRenderer.on('evaluation-complete', (event, data) => {
      this.setState((prevState) => ({
        ...prevState,
        evaluations: prevState.evaluations.map((evaluation, index) => {
          if (index == data.evaluationId) {
            return {
              ...evaluation,
              completed: true,
              rating: data.rating,
            }
          }

          return evaluation;
        }),
      }))
    });
  }

  handleEvaluation = (e) => {
    const { id } = e.target.dataset;
    const { landingUrl, sessionId, env } = this.state.evaluations[id];

    ipcRenderer.send('start-evaluation', {
      id,
      env,
      landingUrl,
      sessionId,
    });
  }

  render() {
    const evaluationIncomplete = this.state.evaluations.find((evaluation) => !evaluation.completed || !evaluation.rating);

    return (
      <React.Fragment>
        {
          this.state.evaluations.map((evaluation, index) => (
            <div key={index}>
              <button
                data-id={index}
                onClick={this.handleEvaluation}
              >
                {evaluation.name}
              </button>
              <span>
                {evaluation.completed ? ` [Completed: ${evaluation.rating}] ` : ''}
              </span>
            </div>
          ))
        }
        <button disabled={evaluationIncomplete}>
          Submit
        </button>
      </React.Fragment>
    );
  }
}

export default Selector;

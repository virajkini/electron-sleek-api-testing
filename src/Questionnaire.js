import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

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

    ipcRenderer.send('finish-evaluation', {
      id: this.props.match.params.id,
      rating: this.state.rating,
    });
  }

  handleSelection = (e) => {
    this.setState({
      rating: e.target.value,
    });
  }

  render() {

    return (
      <React.Fragment>
        <h1>Provide a PBAGE Rating</h1>

        <select value={this.state.rating} onChange={this.handleSelection}>
          <option value='Poor'> Poor </option>
          <option value='Bad'> Bad </option>
          <option value='Average'> Average </option>
          <option value='Good'> Good </option>
          <option value='Excellent'> Excellent </option>
        </select>

        <div>
          <button onClick={this.handleSubmit}>Done</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Questionnaire;

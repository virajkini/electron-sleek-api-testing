import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import SleekTable from 'sleek-ui/Table';

import { Container ,StyledEvalButton} from './styles';

import evaluations from './evaluations';

class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      evaluations: [...evaluations],
      query: 'shoes',
    };

    ipcRenderer.on('evaluation-complete', (event, data) => {
      console.log(data)
      this.setState((prevState) => ({
        ...prevState,
        result: data.result,
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

  // handleEvaluation = (e) => {
  //   const { id } = e.target.dataset;
  //   const { landingUrl, sessionId, env } = this.state.evaluations[id];

  //   ipcRenderer.send('start-evaluation', {
  //     id,
  //     env,
  //     landingUrl,
  //     sessionId,
  //   });
  // }

  handleEvaluation = (index) => {
    const { landingUrl, sessionId, env } = this.state.evaluations[index];
   


    ipcRenderer.send('start-evaluation', {
      id:index,
      env,
      landingUrl,
      sessionId,
    });
  }

  render() {
    const tableColumns =  [
      {
        displayName: 'Website',
        editable: false,
        id: 'env',
        width: '200px'
      },
      {
        displayName: 'AB Experiment',
        editable: false,
        id: 'sessionId',
        render: (value)=>(<div> {value ? 'Yes' : 'No'}</div>),
        width: '200px'
      },
      {
        displayName: 'Rating',
        editable: false,
        id: 'rating',
        render: (value)=>(<div> {value || 'Pending'}</div>),
        width: '200px'
      },
      {
        displayName: '',
        editable: false,
        id: 'completed',
        render: (value, values , index)=>(<StyledEvalButton onClick={()=>this.handleEvaluation(index)}> {value ? 'Re-evaluate' : 'Start Evaluation'}</StyledEvalButton>),
        width: '200px'
      }    
    ]
    return (
      <Container>
        <div className='title'>
          <h2>Query: {this.state.query}</h2>
        </div>
        {/* <div className='row header'>
          <div>Website</div>
          <div>AB Experiment</div>
          <div>Rating</div>
          <div></div>
        </div> */}
        {/* {
          this.state.evaluations.map((evaluation, index) => (
            <div className='row' key={index}>
              <div>
                {evaluation.env}
              </div>
              <div>
                {evaluation.sessionId ? 'Yes' : 'No'}
              </div>
              <div>
                {evaluation.rating || 'Pending'}
              </div>
              <div>
                <button data-id={index} onClick={this.handleEvaluation}>
                  {evaluation.completed ? 'Re-evaluate' : 'Start Evaluation'}
                </button>
              </div>
            </div>
          ))
        } */}

      <SleekTable
          width='100%'
          dataSource={this.state.evaluations}
          columns={tableColumns}
      />
      {this.state.result && <h2>Received data from api {this.state.result.title}</h2>}
      </Container>
    );
  }
}

export default Selector;




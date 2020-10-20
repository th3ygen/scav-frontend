import React, { Component, createRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import mqtt from 'mqtt';
import './App.scss';

import { CircularProgress } from '@material-ui/core';

import VideoPlayer from './components/VideoPlayer';
import LocationBrief from './components/LocationBrief';

class App extends Component {
  constructor(props) {
    super(props);

    this.client = createRef();

    this.state = {
      redirect: '/',
      content: {
        header: '',
        subheader: '',
        description: ''
      }
    };
  }

  componentDidMount() {
    this.client.current = mqtt.connect('ws://localhost:9001');

    this.client.current.on('connect', () => {
      this.client.current.subscribe('start');
      /* this.client.current.subscribe('end'); */

      this.setState({ ...this.state.content, redirect: '/video' })
    });

    this.client.current.on('message', (topic, message, packet) => {
      console.log('start');
      if (topic === 'start') {
        this.setState({ content: JSON.parse(message), redirect: '/brief'  });

        document.querySelector('video').pause();

        setTimeout(() => {
          this.setState({ ...this.state.content, redirect: '/video' });
          document.querySelector('video').play();
        }, 30000);
      }
      /* if (topic === 'end') {
        this.setState({ ...this.state.content, redirect: '/video' });

        document.querySelector('video').play();
      } */
    });

  }
  
  render() {
    return (
      <Router>
        {(this.state.redirect !== '') ? <Redirect to={this.state.redirect} /> : ''}
        
        <div className="App">
          <Switch>
            <Route exact path='/'>
              <div className="preloading" style={{ zIndex: 999 }} >
                <div className="loading-anim">
                  <CircularProgress size='50px' thickness={5} style={{color: '#AFAFAF'}} />
                </div>
              </div>
            </Route>
            <Route exact path='/video'></Route>
            <Route exact path='/brief'>
              <LocationBrief content={this.state.content} style={{ zIndex: 99 }} />
            </Route>
          </Switch>
          <VideoPlayer style={{ zIndex: 0 }} />
        </div>

        
      </Router>
      
    );
  }
  
}

export default App;

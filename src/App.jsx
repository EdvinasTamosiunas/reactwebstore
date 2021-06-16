import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header.jsx'
import Section from './components/Section.jsx'
import {DataProvider} from './components/Context.jsx'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { config } from "dotenv";
//TODO construct secretsprocess.env.PUBLISHABLE_KEY

const stripePromise = loadStripe(
  'pk_test_51Iha5aFrxn3pMJUMU5ArZQMczKWE1lLs2X93KdwOAmFS55g1PJZWzDOQFYjCZ2R8OmrbWTIltJo82P4k0y6xXRB3008fLYeSHf');
class App extends React.Component{
  
  render(){
    return(
      <Elements stripe={stripePromise}>
        <DataProvider>
        <div className="app">
          <Router>
            <Header />
            <Section />
          </Router>
        </div>
      </DataProvider>
      </Elements>
      
    );
  }
}

export default App;

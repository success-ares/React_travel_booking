import React, {Component} from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home/Home';
import ModalConductor from './modals/ModalConductor';
import ReduxToastr from 'react-redux-toastr';
import Signup from './pages/auth/Signup';

class App extends Component {
  render(){
    return (
      <main>
        <Router>
          <switch>
          <Route exact path="/" component={Home}/>
          <Route path="/home" component={Home}/>
          <Route path="/signup" component={Signup}/>
          </switch>
        </Router>
        <ModalConductor/>
        <ReduxToastr position="bottom-left" />
      </main>
    );
  }
}

export default App;

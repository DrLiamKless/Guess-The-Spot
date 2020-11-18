import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './Components/pages/Game'
import { AuthProvider } from './Contexts/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute';
import Signup from './Components/pages/auth/Signup'
import Login from './Components/pages/auth/Login'
import Forgot from './Components/pages/auth/Forgot'
import BGImage from './images/BG.jpg'



function App() {
  
  return (
    <div className="App" style={{backgroundImage: `url(${BGImage})`, backgroundSize: "cover"}}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Game}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/forgot" component={Forgot}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
  );
}

export default App;

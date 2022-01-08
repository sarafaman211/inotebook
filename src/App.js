import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import NoteState from './context/notes/noteState';



function App() {
  return (
    <>
    <div>

      <NoteState>
         
      <Router>
        <Navbar heading="iNOTEBOOK"/>
        <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/SignUp">
            <SignUp />
          </Route>
        </Switch>
        </div>
      </Router>
      </NoteState>
    </div>
    </>
  )
}


export default App;
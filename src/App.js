// App.js
// Hamburger Menu button mechanism based on : https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/
import React, { useState, useRef, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hooks';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components';
import './App.css';
import logo from './DreamTeamLogo.PNG';
import {Home} from './pages/Home';
import {About} from './pages/About';
import {SignInForm} from './pages/Signin';
import {SignUpForm} from './pages/Signup';
import {Findatryout} from './pages/Findatryout';
import {UserDashboard} from './pages/userDashboard'
import {createATryout} from './pages/createatryout'
import {buildTeam} from './pages/buildTeam'
import {tryoutEvaluation} from './pages/tryoutEvaluation'
import {NotFound} from './pages/NotFound';
import {urlAPI} from "./Constants";



function App() {
  const [open, setOpen] = useState(false);
  const [userID, setUserID] = useState(0);
  const [userFirstName, setUserFirstName] = useState("Unknown User");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));


  function completeLogin(returnedID) {
    setUserID(returnedID);
    const getUserUrl = urlAPI + "getUserInfo/?userID=" + returnedID;
		fetch(getUserUrl)
			.then(res => res.json())
			.then(
				(result) => {
					setUserFirstName(result.firstName);
				},
				(error) => {
				});
  }


  return (
    
  

    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div>
          <Router>
            <Switch>
              <Route exact path= "/" component={Home}/>
              <Route exact path= "/About" component={About}/>
              <Route exact path= "/SignIn" render={(props) => <SignInForm completeLogin={completeLogin} />} />
              <Route exact path= "/SignUp" component={SignUpForm} />
              <Route exact path= "/FindATryout" component={Findatryout}/>
              <Route exact path= "/user" render={(props) => <UserDashboard userFirstName={userFirstName} userID={userID} />} />
              <Route exact path= "/CreateaTryout" component={createATryout}/>
              <Route exact path= "/BuildTeam" component={buildTeam}/>
              <Route exact path= "/TryoutEvaluation" component={tryoutEvaluation}/>
              <Route component={NotFound} />

            </Switch>
          </Router>
          
          
        </div>
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>
      
      </>
    </ThemeProvider>
  );
}
export default App;
import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hooks';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components';
import './App.css';
import {Home} from './pages/Home';
import {About} from './pages/About';
import {SignInForm} from './pages/Signin';
import {SignUpForm} from './pages/Signup';
import {Findatryout} from './pages/Findatryout';
import {UserDashboard} from './pages/userDashboard'
import {CreateATryout} from './pages/createatryout'
import {BuildTeam} from './pages/buildTeam'
import {TryoutEvaluation} from './pages/tryoutEvaluation'
import {NotFound} from './pages/NotFound';
import {tryoutSignUp} from './pages/tryoutSignUp'
import {signUpSuccess} from './pages/signupSuccessful'
import {TryoutDashboard} from './pages/tryoutDashboard'
import {urlAPI} from "./Constants";
import "bulma/css/bulma.css";


function App() {
  const [open, setOpen] = useState(false);
  const [userID, setUserID] = useState(localStorage.getItem('userID') || 0);
  const [userFirstName, setUserFirstName] = useState(localStorage.getItem('firstName') || "Unknown User");
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));


  function completeLogin(returnedID) {
    setUserID(returnedID);
    localStorage.setItem('userID', returnedID);
    const getUserUrl = urlAPI + "getUserInfo/?userID=" + returnedID;
		fetch(getUserUrl)
			.then(res => res.json())
			.then(
				(result) => {
					setUserFirstName(result.firstName);
                    localStorage.setItem('firstName', result.firstName);
                    localStorage.setItem('userEmail', result.email)
				},
				(error) => {
				});
  }

  function signOut(){
    localStorage.clear();
    return (
				<Redirect to={'/'}/>
			);
  }

  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
          <div className='burgerMenu' ref={node}>
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
          </div>
        <div class="hero">
          <div class="hero-body has-background-warning has-text-black is-size-3" style={{padding:20, marginBottom:20}}>
            DreamTeam
          </div>
        </div>
        <div>
          <Router>
            <Switch>
              <Route exact path= "/" component={Home}/>
              <Route exact path= "/About" component={About}/>
              <Route exact path= "/SignIn" render={(props) => <SignInForm completeLogin={completeLogin} />} />
              <Route exact path= "/SignUp" component={SignUpForm} />
              <Route exact path= "/FindATryout" component={Findatryout}/>
              <Route exact path= "/Dashboard" render={(props) => <UserDashboard userFirstName={userFirstName} userID={userID} />} />
              <Route exact path= "/CreateATryout" render={(props) => <CreateATryout userID={userID} />} />
              <Route exact path= "/BuildTeam" component={BuildTeam}/>
              <Route exact path= "/TryoutEvaluation" component={TryoutEvaluation}/>
              <Route exact path= "/TryoutSignUp/:tryoutID" component={tryoutSignUp}/>
              <Route exact path= "/SignupSuccessful" component={signUpSuccess}/>
              <Route exact path= "/TryoutDashboard" component={TryoutDashboard}/>
              <Route exact path= "/SignOut" component={signOut}/>
              
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      <div className="footer has has-background-black" style={{padding:0, margin:0}}>
        <div className="content has-text-warning is-size-6">
          Good Luck At Tryouts!
        </div>
      </div>
    </ThemeProvider>
  );
}
export default App;
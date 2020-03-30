import React from 'react';
import logo from '../DreamTeamLogo.PNG';
import { GlobalStyles } from '../global';
import {urlAPI} from '../Constants'
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class SignInForm extends React.Component {

	constructor(props){
		super(props);
		this.state = { username: '', password: '', userID: '', redirect: ''};
	}

	usernameChangeHandler = (event) =>{
		this.setState({username: event.target.value})
	}

	passwordChangeHandler = (event) =>{
		this.setState({password: event.target.value})
	}

	checkUser = (event) => {
		const checkUserUrl = urlAPI + "checkUser/?username=" + this.state.username + "&password=" + this.state.password;
		fetch(checkUserUrl)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({userID: result.userID});
				},
				(error) => {
					this.setState({userID: "test"});
				});
	}

	render() {
		if (this.state.userID){
			return <Redirect to="/dashboard" />
		}
		return (
			<form>
				{this.state.redirect}
				<input type="text" onChange={this.usernameChangeHandler} placeholder="Username"/>

				<br/>
				<input type="password" onChange={this.passwordChangeHandler} placeholder="Password"/>

				<br/>
				<input type="button" value="Button" onClick={this.checkUser}/>

				<br/>
			</form>
		);
	}
}

export const Signin = () => {
    return (
       <div>
          
          <img src={logo} className="bg" alt="logo" />
          <div class="text-block">
          	<h1>Sign In</h1>
			  <SignInForm />
 		 </div>
        

       </div>
    );
}
 
export default Signin;
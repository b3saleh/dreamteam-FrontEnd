import React from 'react';
import logo from '../DreamTeamLogo.PNG';
import { GlobalStyles } from '../global';
import {urlAPI} from '../Constants';
import { Redirect } from 'react-router-dom';


class SignInForm extends React.Component {
	constructor(props){
		super(props);
		this.state = { username: '', password: '', userID: ''};
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
					this.props.completeLogin(result.userID);
					this.setState({userID: result.userID});
				},
				(error) => {
				});
	}

	render() {
		if (this.state.userID){
			return (
				<Redirect to={'/Dashboard'}/>
			);
		}
		return (
			<div>
				{/*<img src={logo} className="bg" alt="logo"/>*/}
				<div className="column">
					<h1>Sign In</h1>
					<form>
						{this.state.redirect}
						<input type="text" value={this.state.username} onChange={this.usernameChangeHandler} placeholder="Username"/>

						<br/>
						<input type="password" value={this.state.password} onChange={this.passwordChangeHandler} placeholder="Password"/>

						<br/>
						<input type="button" value="Sign In" onClick={this.checkUser}/>

						<br/>
					</form>
				</div>


			</div>
		);
	}
}

export {SignInForm};
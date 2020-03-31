import React from 'react';
import '../App.css';
import logo from '../DreamTeamLogo.PNG';
import { GlobalStyles } from '../global';
import {urlAPI} from '../Constants';
import { Redirect } from 'react-router-dom';

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {firstName: "", lastName: "", email: "", username: "", password: "", pwdConfirmation: "", createSuccess: false}
	}

	changeAttribute = (event) => {
		const fieldName = event.target.id;
		const value = event.target.value;
		this.setState({
			[fieldName]: value
		})
	}

	runQuery = (event) => {
		const createUserUrl = urlAPI + "createUser/?username=" + this.state.username + "&password=" + this.state.password + "&email=" + this.state.email + "&firstName=" + this.state.firstName + "&lastName=" + this.state.lastName;
		fetch(createUserUrl, {method: 'POST'})
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({createSuccess: true})
				},
				(error) => {
					// Code if shit hit the fan
				}
			);

	}


	render() {
		if(this.state.createSuccess){
			return <Redirect to={'/Signin'} />
		}
		return (
		   <div>
			<img src={logo} className="bg" alt="logo" />
			 <div class="text-block">
				 <h1>Sign Up</h1>
				 <form>
					 <input type="text" id="firstName" value={this.state.firstName} onChange={this.changeAttribute} placeholder= "First Name" />
					 <br/>
					 <input type="text" id="lastName" value={this.state.lastName} onChange={this.changeAttribute} placeholder= "Last Name" />
					 <br/>
					 <input type="text" id="email" value={this.state.email} onChange={this.changeAttribute} placeholder= "Email" />
					 <br/>
					 <input type="text" id="username" value={(this.state.username)}  onChange={this.changeAttribute} placeholder= "Username" />
					 <br/>
					 <input type="password" id="password" value={this.state.password} onChange={this.changeAttribute} placeholder= "Password" />
					 <br/>
					 <input type="password" id="pwdConfirmation" value={this.state.pwdConfirmation} onChange={this.changeAttribute} placeholder= "Confirm Password" />
					 <br/>
					 <input type="button" value="Sign Up" onClick={this.runQuery} />

					</form>

			 </div>

		   </div>
		);
	}
}
 
export { SignUpForm };
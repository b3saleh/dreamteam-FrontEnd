import React from 'react';
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import smallLogo from '../DreamTeamLogo_small.PNG';
import { TopNav } from '../components/TopNav';
import {urlAPI} from "../Constants";
import {Link} from 'react-router-dom';
 
class UserDashboard extends React.Component {
	constructor(props){
		super(props);
		this.state = {userID: "", tryoutList: [], tryoutIDs: []};
	}

	setTryoutID = (event) => {
		localStorage.setItem('currentTryoutID', event.target.id);
	}

	TryoutList = () => {
		const getListUrl = urlAPI + "listTryouts/?userID=" + this.props.userID;
        fetch(getListUrl)
			.then(
				res =>
					res.json()
			)
			.then(
				(result) => {
					this.setState({tryoutList: result.tryoutNames})
					this.setState({tryoutIDs: result.tryoutIDs})
				},
				(error) => {
					return <>Error with API call: {getListUrl}</>;
				}
			);
		return (
			<>
				{this.state.tryoutList.map(( tryout ) => <li key={this.state.tryoutIDs[this.state.tryoutList.indexOf(tryout)]}><Link to={'/TryoutDashboard'} id={this.state.tryoutIDs[this.state.tryoutList.indexOf(tryout)]} onClick={this.setTryoutID}>{tryout}</Link></li>)}
			</>
		);
	}

	render(){
		return (
		   <div>
		   <img src={logo} className="bg_lower" alt="logo" />

			<TopNav />

		    <div className="text-block-a">
			   <h1>Active Tryouts for {this.props.userFirstName}
				<this.TryoutList userID={this.props.userID} />
			   </h1>
		    </div>

		   </div>
		);
	}
}
 
export {UserDashboard};
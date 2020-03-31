import React from 'react';
import smallLogo from '../DreamTeamLogo_small.PNG'
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
 
class UserDashboard extends React.Component {
	render(){
		return (
		   <div>
		   <img src={smallLogo} className="icon" alt="small_logo" />
		   <img src={logo} className="bg_lower" alt="logo" />
			 <div class="text-block-a">
				<h1>Active Tryouts for {this.props.userFirstName}</h1>
				</div>

			<div class="topnav">
				 <a href="/Notifications" >
					Notifications
				 </a>
				<a href="/MyTeams" >
					Teams
				 </a>
				 <a href="/CreateATryout" >
					Create A Tryout
				 </a>
				 <a href="/Profile" >
					Profile
				 </a>

				</div>


		   </div>
		);
	}
}
 
export {UserDashboard};
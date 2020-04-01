import React from 'react';
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import smallLogo from '../DreamTeamLogo_small.PNG';
import { TopNav } from '../components/TopNav';
 
class UserDashboard extends React.Component {
	render(){
		return (
		   <div>
		   <img src={smallLogo} className="icon" alt="small_logo" />
		   <img src={logo} className="bg_lower" alt="logo" />
			 <div class="text-block-a">
				<h1>Active Tryouts for {this.props.userFirstName}</h1>
				</div>

			<TopNav />


		   </div>
		);
	}
}
 
export {UserDashboard};
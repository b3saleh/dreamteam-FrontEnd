import React from 'react';
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import { TopNav } from '../components/TopNav';
import {urlAPI} from '../Constants';
import {Redirect} from "react-router-dom";


class tryoutSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {firstName: "", lastName: "", email: "", createSuccess: false};
    }

    changeAttribute = (event) => {
		const fieldName = event.target.id;
		const value = event.target.value;
		this.setState({
			[fieldName]: value
		})
	}

	createPlayer = (event) => {
        const createPlayerUrl = urlAPI + "createPlayer/?tryoutID=" + this.props.match.params.tryoutID + "&firstName=" + this.state.firstName + "&lastName=" + this.state.lastName + "&email" + this.state.email
        fetch(createPlayerUrl, {method: 'POST'})
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

    render(){
        console.log("This Tryout is " + this.props.match.params.id);
        if(this.state.createSuccess){
			return <Redirect to={'/SignupSuccessful'} />
		}
        return (

           <div>
            <img src={logo} className="bg_lower" alt="logo"/>
            <TopNav />

               <div class="text-block">
                    <h1>Player Sign Up</h1>


                 <form>
                 <label> First Name:</label>
                 <input type="text" id="firstName" value={this.state.firstName} onChange={this.changeAttribute}/>

                 <br/>
                 <label> Last Name</label>
                 <input type="text" id="lastName" value={this.state.lastName} onChange={this.changeAttribute} />

                 <br/>
                 <label> Email:</label>
                 <input type="text" id="email" value={this.state.email} onChange={this.changeAttribute} />

                 <br/>
                 <input type="button" value="Sign Up" onClick={this.createPlayer} />

                 </form>
               </div>
           </div>
        );
    }

}

export {tryoutSignUp};

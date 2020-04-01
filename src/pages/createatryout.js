import React from 'react';
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import { TopNav } from '../components/TopNav';
import {urlAPI} from '../Constants';
import {Redirect} from "react-router-dom";


class CreateATryout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tryoutName: "", criterion1Name: "", criterion2Name: "", criterion3Name: "", createSuccess: false};
    }

    changeAttribute = (event) => {
		const fieldName = event.target.id;
		const value = event.target.value;
		this.setState({
			[fieldName]: value
		})
	}

	createTryout = (event) => {
        const createTryoutUrl = urlAPI + "createTryout/?userID=" + this.props.userID + "&tryoutName=" + this.state.tryoutName + "&criteria=" + this.state.criterion1Name + "&criteria=" + this.state.criterion2Name + "&criteria=" + this.state.criterion3Name
        fetch(createTryoutUrl, {method: 'POST'})
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
        if(this.state.createSuccess){
			return <Redirect to={'/user'} />
		}
        return (

           <div>
            <img src={logo} className="bg_lower" alt="logo"/>
            <TopNav />

               <div class="text-block">
                    <h1>Create A Tryout</h1>


                 <form>
                 <label> Tryout Name:</label>
                 <input type="text" id="tryoutName" value={this.state.tryoutName} onChange={this.changeAttribute}/>

                 <br/>
                 <label> Evaluation Criterion 1:</label>
                 <input type="text" id="criterion1Name" value={this.state.criterion1Name} onChange={this.changeAttribute} />

                 <br/>
                 <label> Evaluation Criterion 2:</label>
                 <input type="text" id="criterion2Name" value={this.state.criterion2Name} onChange={this.changeAttribute} />

                 <br/>
                 <label> Evaluation Criterion 3:</label>
                 <input type="text" id="criterion3Name" value={this.state.criterion3Name} onChange={this.changeAttribute} />

                 <br/>
                 <input type="button" value="Create Tryout" onClick={this.createTryout} />

                 </form>
               </div>
           </div>
        );
    }

}

export {CreateATryout};

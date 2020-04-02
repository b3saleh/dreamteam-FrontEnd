import React from 'react';
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import { TopNav } from '../components/TopNav';
import {urlAPI} from '../Constants';
import {Redirect} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import {Link} from 'react-router-dom';

class TryoutDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {criteriaNames: [], evalClicked: false, tryoutName: "", criterion1Name: "", criterion2Name: "", criterion3Name: "", createSuccess: false,index: 0, name: '', playerFirstNames: [], playerLastNames: [], playerIDs: [], selected: 0,startTime:new Date() ,endTime:new Date(), executive:""};
        const getListUrl = urlAPI + "listCriteria/?tryoutID=" + localStorage.getItem('currentTryoutID');
        fetch(getListUrl)
            .then(
                res =>
                    res.json()
            )
            .then(
                (result) => {
                    this.setState({criteriaNames: result.criteriaNames})
                },
                (error) => {
                    return <>Error with API call: {getListUrl}</>;
                }
            );
        const getPlayerListUrl = urlAPI + "listPlayers/?tryoutID=" + localStorage.getItem('currentTryoutID');
        fetch(getPlayerListUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({playerFirstNames: result.playerFirstNames})
                    this.setState({playerLastNames: result.playerLastNames})
                    this.setState({playerIDs: result.playerIDs})
                    this.setState({selected: this.state.selected || result.playerIDs[0]})
                },
                (error) => {
                    return <>Error with API call: {getListUrl}</>;
                }
            );

    }

    onPickDateTime(moment) {
     this.setState({
    startTime: moment,
  })
}

    changeAttribute = (event) => {
		const fieldName = event.target.id;
		const value = event.target.value;
        
       
		this.setState({

			[fieldName]: value
		})
	}

    buttonClicked = (event) => {
        this.setState({evalClicked: true});
    }

	addSession = (event) => {
        console.log(event.target.value)
        const addSessionUrl = urlAPI + "addSession/?tryoutID=" + localStorage.getItem('currentTryoutID') + "&startTime=" + this.state.startTime + "&endTime=" + this.state.endTime + "&location=" + this.state.location; 
        fetch(addSessionUrl, {method: 'POST'})
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({createSuccess: true})
                    console.log("DATE SUBMITTED")
				},
				(error) => {
					// Code if shit hit the fan
				}
			);
    }
        addExecutive = (event) => {
        const addExecutiveUrl = urlAPI + "addExecs/?tryoutID=" + localStorage.getItem('currentTryoutID') + "&execEmail=" + this.state.executive 
        fetch(addExecutiveUrl, {method: 'POST'})
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
        if(this.state.evalClicked){
			return <Redirect to={'/tryoutEvaluation'} />
		}

        return (

           <div>
            <img src={logo} className="bg_lower" alt="logo"/>
            <TopNav />

            	<div className="text-block-players">
            		<h1>List of Players</h1>
            		<List className="playerList">
                    {this.state.playerIDs.map(
                            (id) =>
                                <ListItem button selected={this.state.selected === id} onClick={this.buttonClicked} key={id} id={id}>
                                    {this.state.playerFirstNames[this.state.playerIDs.indexOf(id)] + " " + this.state.playerLastNames[this.state.playerIDs.indexOf(id)]}
                                </ListItem>
                        )
                    }
                    </List>

            	</div>

                


               <div className="text-block-info">
                    <h1>Tryout Information</h1>

                 <form>
                 <label> Tryout Name:</label>
                 <input type="text" id="tryoutName" value={localStorage.getItem("currentTryoutName")} disabled/>

                <br/>
                 <label> Evaluation Criterion 1:</label>
                 <input type="text" id="criterion1Name" value={this.state.criteriaNames[0]} disabled />

                 <br/>
                 <label> Evaluation Criterion 2:</label>
                 <input type="text" id="criterion2Name" value={this.state.criteriaNames[1]} disabled />

                 <br/>
                 <label> Evaluation Criterion 3:</label>
                 <input type="text" id="criterion3Name" value={this.state.criteriaNames[2]} disabled />

                
                 <label> Player Sign Up Form:</label>
                 <input type="text" value={"http://localhost:3000/TryoutSignUp/" + localStorage.getItem("currentTryoutID")} id="tryoutLink"  disabled />

                 <br/>
                 <br/>

                 <input type="button" value="Tryout Evaluation" onClick={this.buttonClicked} />

                 </form>
               </div>
                <div className="tryoutEdit">
                    <h1>Sessions</h1>

                 <form>
                 <label>Start Date and Time:</label>
                 <input type="datetime-local" id="dateTimeStart" value={this.state.startTime} onChange={this.onPickDateTime} />
                 <br/>

                 <label> End Date and Time:</label>
                 <input type="datetime-local" id="dateTimeEnd" value="${this.state.endTime}" onChange={this.changeAttribute} />
                 <br/>
                 <br/>
                 <label> Location:</label>
                 <input type="text" id="location" value={this.state.location} onChange={this.changeAttribute} />

                 <br/>
                 <input type="button" value="Add Session" onClick={this.addSession} />
                 <br/>
                             
                 <h1>Executives</h1>
                 
                 <label> Additional Executive (Email):</label>
                 <input type="text" id="executive" value={this.state.executive1} onChange={this.changeAttribute} />

                 <input type="button" value="Add Executive" onClick={this.addExecutive} />
                 <br/>
                 

                 </form>
               </div>

           </div>
        );
    }

}

export {TryoutDashboard};

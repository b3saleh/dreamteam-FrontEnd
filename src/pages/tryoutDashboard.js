import React from 'react';
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import { TopNav } from '../components/TopNav';
import {urlAPI} from '../Constants';
import {Redirect} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';


class TryoutDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tryoutName: "", criterion1Name: "", criterion2Name: "", criterion3Name: "", createSuccess: false,index: 0, name: '', playerFirstNames: [], playerLastNames: [], playerIDs: [], selected: 0};
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
        PlayerList = () => {
        const getListUrl = urlAPI + "listPlayers/?tryoutID=" + localStorage.getItem('currentTryoutID');
        fetch(getListUrl)
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

            return (
                <List>
                    {this.state.playerIDs.map(
                            (id) =>
                                <ListItem button selected={this.state.selected === id} onClick={this.buttonClicked} key={id} id={id}>
                                    {this.state.playerFirstNames[this.state.playerIDs.indexOf(id)] + " " + this.state.playerLastNames[this.state.playerIDs.indexOf(id)]}
                                </ListItem>
                        )
                    }
                </List>
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

            	<div class="text-block-players">
            		<h1>List of Players</h1>
            		<this.PlayerList/>


            	</div>

               <div class="text-block-info">
                    <h1>Tryout Information</h1>

                 <form>
                 <label> Tryout Name:</label>
                 <input type="text" id="tryoutName" value={this.state.tryoutName} disabled/>

                 <br/>
                  <label> Session Date and Time:</label>
                 <input type="datetime-local" id="dateTime" value={this.state.dateTime} onChange={this.changeAttribute} />
                 <br/>
                 <input type="button" value="Add Session" onClick={this.addSession} />
                 <br/>

                <br/>

                 <label> Evaluation Criterion 1:</label>
                 <input type="text" id="criterion1Name" value={this.state.criterion1Name} disabled />

                 <br/>
                 <label> Evaluation Criterion 2:</label>
                 <input type="text" id="criterion2Name" value={this.state.criterion2Name} disabled />

                 <br/>
                 <label> Evaluation Criterion 3:</label>
                 <input type="text" id="criterion3Name" value={this.state.criterion3Name} disabled />

                 <br/>
                 <label> Additional Executive (Email):</label>
                 <input type="text" id="executive1" value={this.state.executive1} onChange={this.changeAttribute} />

                 <br/>
                 <input type="button" value="Add Executive" onClick={this.createTryout} />
                 <br/>
                 <br/>
                 <label> Player Sign Up Form:</label>
                 <input type="text" value="THIS LINK" id="tryoutLink"  disabled />

                 <br/>

                 </form>
               </div>
           </div>
        );
    }

}

export {TryoutDashboard};

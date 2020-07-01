import React from 'react';
import logo from '../DreamTeamLogo.PNG';
import {urlAPI} from '../Constants';
import {Redirect} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import {Link} from 'react-router-dom';


class TryoutDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {updateRequired: true, buttonClicked: false,criteriaNames: [], tryoutName: "", criterion1Name: "", criterion2Name: "", criterion3Name: "", createSuccess: false,index: 0, name: '', playerFirstNames: [], playerLastNames: [], playerIDs: [], selected: 0,startTime:"" ,endTime:new Date(), executive:"", teamName:"", teamNames: [], teamIDs: []};
    }

    updateAPICalls = () => {
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

             const getTeamListUrl = urlAPI + "listTeams/?tryoutID=" + localStorage.getItem('currentTryoutID');
        fetch(getTeamListUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({teamNames: result.teamNames})
                    this.setState({teamIDs: result.teamIDs})


                },
                (error) => {
                    return <>Error with API call: {getListUrl}</>;
                }
            );
        this.setState({updateRequired: false});
    }

   changeStartTime = (event) => {
             
       
        this.setState({

            startTime: event.target.selected
        })
    }

    changeAttribute = (event) => {
		const fieldName = event.target.id;
		const value = event.target.value;       
       
		this.setState({

			[fieldName]: value
		})
	}

    teamClicked = (event) => {
        localStorage.setItem("currentTeamID", event.target.id);
    }

     buttonClicked = (event) => {
        this.setState({
            buttonClicked:true
        })
    }

    /*

	addSession = (event) => {
        console.log(event.target.value)
        const addSessionUrl = urlAPI + "addSession/?tryoutID=" + localStorage.getItem('currentTryoutID') + "&startTime=" + this.state.startTime + "&endTime=" + this.state.endTime + "&location=" + this.state.location; 
        fetch(addSessionUrl, {method: 'POST'})
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
*/
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

        addTeam = (event) => {
        
        const addTeamUrl = urlAPI + "createTeam/?tryoutID=" + localStorage.getItem('currentTryoutID') + "&teamName=" + this.state.teamName; 
        fetch(addTeamUrl, {method: 'POST'})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({createSuccess: true})
                    console.log("team added")
                    console.log(this.state.teamName)
                },
                (error) => {
                    // Code if shit hit the fan
                }
            );
        this.setState({updateRequired: true});
        this.setState({teamName: ""});
    }
        

    render(){
        if(this.state.buttonClicked){
			return <Redirect to={'/tryoutEvaluation'} />
		}
        if(this.state.updateRequired){
            this.updateAPICalls();
        }

        return (

            <>
                <div className="hero has-background-black">
                    <div className="hero-body">
                      <div className={"container"}>
                        <p className="is-size-1">{localStorage.getItem('currentTryoutName')} Tryout Dashboard</p>
                      </div>
                    </div>
                </div>
                <section className="section has-background-black">
                        <div className="columns">
                            <div className="column">
                                <div className="notification has-background-black">
                                    <h className="is-size-3">Tryout Info</h>
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
                            </div>
                            <div className="column">
                                <div className="notification has-background-black">
                                    <h className="is-size-3">Actions</h>
                                        <p className="is-size-5">Executives</p>
                                            <label> Add Executive (Email):</label>
                                            <input type="text" id="executive" value={this.state.executive} onChange={this.changeAttribute} />

                                            <input type="button" value="Add Executive" onClick={this.addExecutive} />
                                            <br/>

                                        <p class="is-size-5">Teams</p>
                                        <label> Create New Team:</label>
                                         <input type="text" id="teamName" value={this.state.teamName} onChange={this.changeAttribute} />

                                         <input type="button" value="Create Team" onClick={this.addTeam} />
                                         <br/>

                                         <List>
                                            {this.state.teamIDs.map(
                                                    (id) =>
                                                        <ListItem key={id} >
                                                            <Link  class="has-text-centered is-size-5" to="/BuildTeam" onClick={this.teamClicked} id={id}>
                                                                {this.state.teamNames[this.state.teamIDs.indexOf(id)] }
                                                            </Link>
                                                        </ListItem>
                                                )
                                            }
                                         </List>
                                </div>
                            </div>
                            <div className="column">
                                <div className="notification has-background-black">
                                    <p className="is-size-3">Player List</p>
                                        <List className="is-size-5">
                                            {this.state.playerIDs.map(
                                                    (id) =>
                                                        <ListItem class="has-text-centered" selected={this.state.selected === id} key={id} id={id}>
                                                            {this.state.playerFirstNames[this.state.playerIDs.indexOf(id)] + " " + this.state.playerLastNames[this.state.playerIDs.indexOf(id)]}
                                                        </ListItem>
                                                )
                                            }
                                        </List>
                                </div>
                            </div>
                        </div>
                </section>
            </>
        );
    }

}

export {TryoutDashboard};

import React from 'react';
import {urlAPI} from '../Constants';
import {Redirect} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import {Link} from 'react-router-dom';


class TryoutDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            criteriaNames: [],
            tryoutName: "",
            createSuccess: false,
            index: 0,
            name: '',
            playerFirstNames: [],
            playerLastNames: [],
            playerIDs: [],
            playerTeams: [],
            selected: 0,
            startTime:"" ,
            endTime:new Date(),
            executive:"",
            teamName:"",
            teamNames: [],
            teamIDs: [],
            addExecMessage: ""};

        const getTeamListUrl = urlAPI + "listTeams/?tryoutID=" + localStorage.getItem('currentTryoutID');
        fetch(getTeamListUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({teamNames: result.teamNames})
                    this.setState({teamIDs: result.teamIDs})


                },
                (error) => {
                    return <>Error with API call: {getTeamListUrl}</>;
                }
            );

        const getPlayerListUrl = urlAPI + "listPlayers/?tryoutID=" + localStorage.getItem('currentTryoutID');
        fetch(getPlayerListUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({playerFirstNames: result.playerFirstNames});
                    this.setState({playerLastNames: result.playerLastNames});
                    this.setState({playerIDs: result.playerIDs});
                    this.setState({playerTeams: result.playerTeams});
                    this.setState({selected: this.state.selected || result.playerIDs[0]})
                },
                (error) => {
                    return <>Error with API call: {getPlayerListUrl}</>;
                }
            );
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
    }

   // changeStartTime = (event) => {
    //    //  this.setState({
    //    //
    //    //          startTime: event.target.selected
    //    //      })
    //    //  };

    changeAttribute = (event) => {
		const fieldName = event.target.id;
		const value = event.target.value;       
       
		this.setState({

			[fieldName]: value
		})
	};

    teamClicked = (event) => {
        localStorage.setItem("currentTeamID", event.target.id);
    };

     buttonClicked = (event) => {
        this.setState({
            redirect:"/TryoutEvaluation"
        })
    };

     deleteTryout = (event) => {
         let deleteTryoutUrl = urlAPI + "deleteTryout/?&tryoutID=" + localStorage.getItem('currentTryoutID');
         fetch(deleteTryoutUrl, {method: 'POST'})
            .then(res => res.json())
            .then(
                (result) => {
                    localStorage.setItem('currentTryoutID', null);
                    this.setState({redirect: "/Dashboard"});
                },
                (error) => {
                    return <>Error with API call: {deleteTryoutUrl}</>;
                }
            )
     };

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
                    this.setState({createSuccess: true});
                    this.setState({addExecMessage: "Executive Successfully Added"});
                },
                (error) => {
                    this.setState({addExecMessage: "User Not Found, make sure the email is linked to a valid account"});
                }
            );
        };

        addTeam = (event) => {
            let encodedTeamName = encodeURIComponent(this.state.teamName.trim());
            const addTeamUrl = urlAPI + "createTeam/?tryoutID=" + localStorage.getItem('currentTryoutID') + "&teamName=" + encodedTeamName;
            fetch(addTeamUrl, {method: 'POST'})
                .then(res => res.json())
                .then(
                    (result) => {
                            const getTeamListUrl = urlAPI + "listTeams/?tryoutID=" + localStorage.getItem('currentTryoutID');
                            fetch(getTeamListUrl)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        this.setState({teamNames: result.teamNames})
                                        this.setState({teamIDs: result.teamIDs})
                                    },
                                    (error) => {
                                        return <>Error with API call: {getTeamListUrl}</>;
                                    }
                                );
                    },
                    (error) => {
                    }
                );
            this.setState({teamName: ""});
        };
        

    render(){
        if(this.state.redirect){
			return <Redirect to={this.state.redirect} />
		}

        return (

            <>
                <div className="hero" style={{backgroundColor:"black"}}>
                    <div className="hero-body">
                      <div className={"container"}>
                        <p className="is-size-1">{localStorage.getItem('currentTryoutName')} Tryout Dashboard</p>
                      </div>
                    </div>
                </div>
                <section className="section" style={{backgroundColor:"black"}}>
                        <div className="columns">
                            <div className="column">
                                <div className="notification" style={{backgroundColor:"black"}}>
                                    <h className="is-size-3">Tryout Info</h>
                                    <form>
                                        <label> Tryout Name:</label>
                                        <input type="text" id="tryoutName" value={localStorage.getItem("currentTryoutName")} readOnly/>

                                        {
                                            this.state.criteriaNames.map((criterion, idx) => (
                                                <>
                                                    <br/>
                                                    <label> Evaluation Criterion {idx + 1}:</label>
                                                    <input type="text" id={"criterion" + idx + "Name"} value={criterion} readOnly/>
                                                    </>
                                            ))
                                        }
                                        <label> Player Sign Up Form:</label>
                                        <input type="text" value={"http://dreamteamulti.herokuapp.com/TryoutSignUp/" + localStorage.getItem("currentTryoutID")} id="tryoutLink" readOnly/>
                                        <br/>
                                        <input type="button" value="Delete Tryout" onClick={this.deleteTryout} />
                                    </form>
                                </div>
                            </div>
                            <div className="column">
                                <div className="notification" style={{backgroundColor:"black"}}>
                                    <h className="is-size-3">Actions</h>
                                    <p>
                                        <br/>
                                        <input type="button" value="Start Evaluating" onClick={this.buttonClicked} />
                                    </p>

                                        <p class="is-size-4">
                                        <br/>
                                            Manage Teams
                                        </p>

                                         <List>
                                            {this.state.teamIDs.map(
                                                    (id) =>
                                                        <ListItem class="has-text-centered" key={id} >
                                                            <Link  class="is-size-5" to="/BuildTeam" onClick={this.teamClicked} id={id}>
                                                                {this.state.teamNames[this.state.teamIDs.indexOf(id)] }
                                                            </Link>
                                                        </ListItem>
                                                )
                                            }
                                         </List>

                                        <label> Create New Team:</label>
                                         <input type="text" id="teamName" value={this.state.teamName} onChange={this.changeAttribute} />

                                         <input type="button" value="Create Team" onClick={this.addTeam} />

                                        <p className="is-size-5">
                                        <br/>
                                            Add Executives
                                        </p>
                                            <label> Email:</label>
                                            <input type="text" id="executive" value={this.state.executive} onChange={this.changeAttribute} />
                                            {this.state.addExecMessage}
                                            <br/>
                                            <input type="button" value="Add Executive" onClick={this.addExecutive} />
                                            <br/>
                                </div>
                            </div>
                            <div className="column">
                                <div className="notification" style={{backgroundColor:"black"}}>
                                    <p className="is-size-3">Player List</p>
                                        <List className="is-size-5">
                                            {this.state.playerIDs.map(
                                                    (id) =>
                                                        <ListItem class="has-text-centered">
                                                            {this.state.playerFirstNames[this.state.playerIDs.indexOf(id)] + " " + this.state.playerLastNames[this.state.playerIDs.indexOf(id)]}
                                                            {this.state.playerTeams[this.state.playerIDs.indexOf(id)] ? " (" + this.state.playerTeams[this.state.playerIDs.indexOf(id)] + ") " : ""}
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

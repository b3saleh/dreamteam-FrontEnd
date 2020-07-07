import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox'
import GaugeChart from 'react-gauge-chart';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import {urlAPI} from "../Constants";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    float:"right",
    left:0,
    height: '100%',
    maxWidth: 300,
    backgroundColor: 'black',
  },
  paper: {
    width: 200,
    height: 'auto',
    overflow: 'auto',
    color:'black',
  },
  checkBox: {
    color: '#ffde59',
    '&$checked': {
      color: '#ffde59',
    },
  },
  checked: {
    color: '#ffde59',
  },
  button: {
    margin: theme.spacing(0.5, 0),

    
    
  },
}));

function DTCheckBox(props) {
  const classes = useStyles();
  const labelId = `transfer-list-item-${props.id}-label`;

  return(
    <ListItemIcon>
                <Checkbox className={classes.checkBox}
                  checked={props.checkedBool}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  id={props.id}
                  color={"yellow"}
                  onClick={props.onToggle}
                />
              </ListItemIcon>
              )
}


class EvalGauge extends React.Component{

    render() {
        return(
            <div className="column is-narrow-desktop">
                <p className="is-size-4"> {this.props.name}</p>
                <GaugeChart
                    id={this.props.name}
                    nrOfLevels={5}
                    colors={["#fc0f03", "#7de330"]}
                    percent={this.props.average-3}
                />
             </div>
            );
    }
}

class TeamPlayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {teamChecked: []};
    }

    handleToggle = (event) => {
        let currentIndex = this.state.teamChecked.indexOf(event.target.id);
        let newChecked = [...this.state.teamChecked];
        if (currentIndex === -1) {
          newChecked.push(event.target.id);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        this.setState({teamChecked: newChecked});
    };

    handleRemove = () => {
        this.props.removePlayers(this.state.teamChecked);
        this.setState({teamChecked: []});
    };

    render() {
        return(
            <>
            <h1>Team</h1>
            { this.props.teamPlayerIDs.map(
              (id) =>
                  <>
                    <Paper className={useStyles.paper}>
                          <List className= "team_list" dense component="div" role="list">
                            <ListItem key={id} id={id} role="listitem" button onClick={this.handleToggle}>
                              <ListItemIcon>
                                <DTCheckBox onToggle={this.handleToggle}
                                  id={id}
                                  checkedBool={this.state.teamChecked.indexOf(id.toString()) !== -1} />
                              </ListItemIcon>
                              <ListItemText primary={this.props.teamPlayerFirstNames[this.props.teamPlayerIDs.indexOf(id)] + " " + this.props.teamPlayerLastNames[this.props.teamPlayerIDs.indexOf(id)]} />
                            </ListItem>
                          </List>
                      </Paper>
                  </>
              )
            }
            <input
                type="button"
                value="Remove Selected"
                onClick={this.handleRemove}
              />
            </>
        )
    }


}

class AvailablePlayerList extends React.Component {
    constructor(props){
        super(props);
        this.state = {availableChecked: []};
    }

  handleToggle = (event) => {
        let currentIndex = this.state.availableChecked.indexOf(event.target.id);
        let newChecked = [...this.state.availableChecked];
        if (currentIndex === -1) {
          newChecked.push(event.target.id);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        this.setState({availableChecked: newChecked});
  };

  handleAdd = () => {
    this.props.addPlayers(this.state.availableChecked);
    this.setState({availableChecked: []});
  };

  render() {
      return (
        <>
        <h1>Available</h1>
            {
                this.props.availablePlayerIDs.map(
                  (id) =>
                        <ListItem key={id} id={id} role="listitem" button onClick={this.handleToggle}>
                          <ListItemIcon>
                            <DTCheckBox onToggle={this.handleToggle}
                              id={id}
                              checkedBool={this.state.availableChecked.indexOf(id.toString()) !== -1} />
                          </ListItemIcon>
                          <ListItemText primary={this.props.availablePlayerFirstNames[this.props.availablePlayerIDs.indexOf(id)] + " " + this.props.availablePlayerLastNames[this.props.availablePlayerIDs.indexOf(id)]} />
                        </ListItem>
              )
            }
            <input
                type="button"
                value="Add Selected"
                onClick={this.handleAdd}
              />
            </>
      );
  }
}
 
class BuildTeam extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: null,
            teamPlayerFirstNames: [],
            teamPlayerLastNames: [],
            teamPlayerIDs: [],
            availablePlayerIDs: [],
            availablePlayerFirstNames: [],
            availablePlayerLastNames: [],
            criteriaNames: [],
            criteriaAverages: [],
            criteriaIDs: []};
        this.UpdateApiCalls = this.UpdateApiCalls.bind(this);
        this.addPlayers = this.addPlayers.bind(this);
        this.removePlayers = this.removePlayers.bind(this);
        this.clearTeam = this.clearTeam.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);
        const listCriteriaUrl = urlAPI + "listCriteria/?tryoutID=" + localStorage.getItem('currentTryoutID');
            fetch(listCriteriaUrl)
                .then(res => res.json())
                .then(
                    (result) => {
                            this.setState({criteriaIDs: result.criteriaIDs});
                            this.setState({criteriaNames: result.criteriaNames});
                            this.setState({criteriaAverages: Array(result.criteriaIDs.length).fill(3)});
                    }
                );
        this.UpdateApiCalls()
    }

    UpdateApiCalls() {
      const getTeamUrl = urlAPI + "teamPlayers/?teamID=" + localStorage.getItem('currentTeamID');
      fetch(getTeamUrl)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({teamPlayerIDs: result.playerIDs});
					this.setState({teamPlayerFirstNames: result.playerFirstNames});
					this.setState({teamPlayerLastNames: result.playerLastNames});
				},
				(error) => {
					return <>Error with API call: {getTeamUrl}</>;
				}
			);
        const getAvailableUrl = urlAPI + "availablePlayers/?tryoutID=" + localStorage.getItem('currentTryoutID');
        fetch(getAvailableUrl)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({availablePlayerIDs: result.playerIDs});
					this.setState({availablePlayerFirstNames: result.playerFirstNames});
					this.setState({availablePlayerLastNames: result.playerLastNames});
				},
				(error) => {
					return <>Error with API call: {getAvailableUrl}</>;
				}
			);
            const getTeamAveragesUrl = urlAPI + "getTeamAverages/?teamID=" + localStorage.getItem('currentTeamID');
            fetch(getTeamAveragesUrl)
                .then(res => res.json())
                .then(
                    (result) => {
                        let criteriaAverages = Array(this.state.criteriaIDs.length).fill(3);
                        if(result.averages.length > 0){
                            result.ids.map(
                                (id) =>
                                    criteriaAverages[this.state.criteriaIDs.indexOf(parseInt(id))] = result.averages[result.ids.indexOf(parseInt(id))]
                            )
                        }
                        this.setState({criteriaAverages: criteriaAverages});
                        console.log(criteriaAverages);
                    }
                );
    }

    clearTeam = () => {
        let removePlayerUrl = "";
        this.state.teamPlayerIDs.map(
            (playerID) => {
                removePlayerUrl = urlAPI + "releasePlayer/?playerID=" + playerID + "&teamID=" + localStorage.getItem('currentTeamID');
                fetch(removePlayerUrl, {method: 'POST'})
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.UpdateApiCalls()
                        },
                        (error) => {
                            return <>Error with API call: {removePlayerUrl}</>;
                        }
                    )
            }
        );
    };

    addPlayers(playerIDList) {
        let addPlayerUrl = "";
        playerIDList.map(
            (playerID) => {
                addPlayerUrl = urlAPI + "addPlayerToTeam/?playerID=" + playerID + "&teamID=" + localStorage.getItem('currentTeamID');
                fetch(addPlayerUrl, {method: 'POST'})
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.UpdateApiCalls()
                        },
                        (error) => {
                            return <>Error with API call: {addPlayerUrl}</>;
                        }
                    )
            }
        );
    }

    removePlayers(playerList) {
        let removePlayerUrl = "";
        playerList.map(
            (playerID) => {
                removePlayerUrl = urlAPI + "releasePlayer/?playerID=" + playerID + "&teamID=" + localStorage.getItem('currentTeamID');
                fetch(removePlayerUrl, {method: 'POST'})
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.UpdateApiCalls()
                        },
                        (error) => {
                            return <>Error with API call: {removePlayerUrl}</>;
                        }
                    )

            }
        );
    }

    deleteTeam() {
        let removePlayerUrl = urlAPI + "deleteTeam/?&teamID=" + localStorage.getItem('currentTeamID');
        fetch(removePlayerUrl, {method: 'POST'})
            .then(res => res.json())
            .then(
                (result) => {
                    localStorage.setItem('currentTeamID', null);
                    this.setState({redirect: "/TryoutDashboard"});
                },
                (error) => {
                    return <>Error with API call: {removePlayerUrl}</>;
                }
            )
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
           <div>
               <div class="columns">
                   <div className="column is-3">
                       <AvailablePlayerList addPlayers={this.addPlayers}  availablePlayerIDs={this.state.availablePlayerIDs} availablePlayerFirstNames={this.state.availablePlayerFirstNames} availablePlayerLastNames={this.state.availablePlayerLastNames}/>
                   </div>
                   <div className="column is-6">
                       <div className="columns is-multiline is-centered">
                           {
                               this.state.teamPlayerIDs.length > 1
                                   ?
                                   this.state.criteriaNames.map(
                                       (criterion) =>
                                           <EvalGauge
                                               name={criterion}
                                               id={this.state.criteriaIDs[this.state.criteriaNames.indexOf(criterion)]}
                                               average={this.state.criteriaAverages[this.state.criteriaNames.indexOf(criterion)]}
                                           />
                                   )

                                   :
                                   <h1>Add At Least Two Players to The Team To See Averages</h1>

                           }
                       </div>
                       <input
                            type="button"
                            value="Delete This Team"
                            onClick={this.deleteTeam}
                       />
                   </div>
                   <div className="column is-3">
                       <TeamPlayerList removePlayers={this.removePlayers} teamPlayerIDs={this.state.teamPlayerIDs} teamPlayerFirstNames={this.state.teamPlayerFirstNames} teamPlayerLastNames={this.state.teamPlayerLastNames}/>
                   </div>
               </div>


           </div>
        );
    }
}
 
export {BuildTeam};
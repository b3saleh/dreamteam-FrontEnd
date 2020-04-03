import React from 'react';
import smallLogo from '../DreamTeamLogo_small.PNG'
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox'
import { FixedSizeList } from 'react-window';
import GaugeChart from 'react-gauge-chart';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import {TopNav} from '../components/TopNav';
import {urlAPI} from "../Constants";

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
  checked: {},
  button: {
    margin: theme.spacing(0.5, 0),

    
    
  },
}));


class EvalGauge extends React.Component{

    render() {
        return(
             <div className="gauges">
                 <h4> {this.props.name}</h4>
                  <GaugeChart id={this.props.name}
                    nrOfLevels={5}
                    colors={["#fc0f03", "#7de330"]}
                    percent={(this.props.average / 5) - 0.1}
                  />
             </div>
            );
    }
}


class TransferList extends React.Component {
    constructor(props){
        super(props);
        this.state = {availableChecked: [], teamChecked: [], checked: []};
    }

  handleToggle = (event) => {

    if (this.props.availablePlayerIDs.indexOf(parseInt(event.target.id)) > -1){
        let currentIndex = this.state.availableChecked.indexOf(parseInt(event.target.id));
        let newChecked = [...this.state.availableChecked];
        if (currentIndex === -1) {
          newChecked.push(event.target.id);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        this.setState({availableChecked: newChecked});
    } else if (this.props.teamPlayerIDs.indexOf(parseInt(event.target.id)) > -1) {
        let currentIndex = this.state.teamChecked.indexOf(parseInt(event.target.id));
        let newChecked = [...this.state.teamChecked];
        if (currentIndex === -1) {
          newChecked.push(event.target.id);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        this.setState({teamChecked: newChecked});
    }
  };

  handleRemoveAll = () => {
    this.props.clearTeam();
  };

  handleRemove = () => {
      this.props.removePlayers(this.state.teamChecked)
  };

  handleAdd = () => {
      this.props.addPlayers(this.state.availableChecked)
  };

  availableList = () => (
      this.props.availablePlayerIDs.map(
          (id) =>
                <ListItem key={id} id={id} role="listitem" button onClick={this.handleToggle}>
                  <ListItemIcon>
                    <Checkbox className={useStyles.checkBox}
                      checked={this.state.availableChecked.indexOf(id) !== -1}
                      id={id}
                      tabIndex={-1}
                      inputProps={{'aria-labelledby': id}}
                      disableRipple
                      color='yellow'
                    />
                  </ListItemIcon>
                  <ListItemText primary={this.props.availablePlayerFirstNames[this.props.availablePlayerIDs.indexOf(id)] + " " + this.props.availablePlayerLastNames[this.props.availablePlayerIDs.indexOf(id)]} />
                </ListItem>
              )
  );

  teamList = () => (
      this.props.teamPlayerIDs.map(
          (id) =>
                <ListItem key={id} id={id} role="listitem" button onClick={this.handleToggle}>
                  <ListItemIcon>
                    <Checkbox className={useStyles.checkBox}
                      checked={this.state.availableChecked.indexOf(id) !== -1}
                      tabIndex={-1}
                      inputProps={{'aria-labelledby': id}}
                      disableRipple
                      color='yellow'
                    />
                  </ListItemIcon>
                  <ListItemText primary={this.props.teamPlayerFirstNames[this.props.teamPlayerIDs.indexOf(id)] + " " + this.props.teamPlayerLastNames[this.props.teamPlayerIDs.indexOf(id)]} />
                </ListItem>
              )
  );

  render() {
      return (
        <Grid container spacing={2} justify="center" alignItems="stretch" className={useStyles.root}>

          <Grid item className="leftList">
            <h1> Athletes</h1>
                <Paper className={useStyles.paper}>
                  <List className= "team_list" dense component="div" role="list">
                        <this.availableList />
                  </List>
              </Paper>

          </Grid>

          <Grid item>
            <Grid container direction="column" alignItems="stretch">
            <Button
                variant="contained"
                size="small"
                className="addPlayer"
                color="white"
                onClick={this.handleAdd}
                disabled={this.state.availableChecked.length === 0}
                aria-label="move selected left"
              >
                Add
              </Button>

              <Button
                variant="contained"
                color="white"
                size="small"
                className="removePlayer"
                onClick={this.handleRemove}
                disabled={this.state.teamChecked.length === 0}
                aria-label="move selected right"
              >
                Remove
              </Button>

               <Button
                variant="contained"
                size="small"
                className="clrList"
                onClick={this.handleRemoveAll}
                disabled={this.props.teamPlayerIDs.length === 0}
                aria-label="move all right"
              >
                Clear Team
              </Button>


            </Grid>
          </Grid>
        <Grid item className="rightList">
          <h1> Team</h1>
            <Paper className={useStyles.paper}>
                  <List className= "team_list" dense component="div" role="list">
                        <this.teamList />
                  </List>
              </Paper>
        </Grid>
        </Grid>
      );
  }
}
 
class BuildTeam extends React.Component {
    constructor(props){
        super(props);
        this.state = {updateRequired: true, teamPlayerFirstNames: [], teamPlayerLastNames: [], teamPlayerIDs: [], availablePlayerIDs: [], availablePlayerFirstNames: [], availablePlayerLastNames: [], criteriaNames: [], criteriaAverages: [], criteriaIDs: []}
        this.UpdateApiCalls = this.UpdateApiCalls.bind(this);
        this.addPlayers = this.addPlayers.bind(this);
        this.removePlayers = this.removePlayers.bind(this);
        this.clearTeam = this.clearTeam.bind(this);
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
    }

    UpdateApiCalls() {
        const getTeamUrl = urlAPI + "teamPlayers/?teamID=" + 1; //localStorage.getItem('currentTeamID');
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
        if (this.state.teamPlayerIDs.length > 0){
            const getTeamAveragesUrl = urlAPI + "getTeamAverages/?teamID=" + 1; //localStorage.getItem('currentTeamID');
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
        this.setState({updateRequired: false});
        return <></>
    }

    clearTeam = () => {
        let removePlayerUrl = "";
        this.state.teamPlayerIDs.map(
            (playerID) => {
                removePlayerUrl = urlAPI + "releasePlayer/?playerID=" + playerID + "&teamID=" + 1; //localStorage.getItem('currentTeamID');
                fetch(removePlayerUrl, {method: 'POST'})
                    .then(res => res.json())
                    .then(
                        (result) => {
                        },
                        (error) => {
                            return <>Error with API call: {removePlayerUrl}</>;
                        }
                    )
            }
        );
        this.setState({updateRequired: true});

    }

    addPlayers(playerIDList) {
        let removePlayerUrl = "";
        playerIDList.map(
            (playerID) => {
                removePlayerUrl = urlAPI + "addPlayerToTeam/?playerID=" + playerID + "&teamID=" + 1; //localStorage.getItem('currentTeamID');
                fetch(removePlayerUrl, {method: 'POST'})
                    .then(res => res.json())
                    .then(
                        (result) => {
                        },
                        (error) => {
                            return <>Error with API call: {removePlayerUrl}</>;
                        }
                    )
            }
        );
        this.setState({updateRequired: true});
    }

    removePlayers(playerList) {
        let removePlayerUrl = "";
        playerList.map(
            (playerID) => {
                removePlayerUrl = urlAPI + "releasePlayer/?playerID=" + playerID + "&teamID=" + 1; //localStorage.getItem('currentTeamID');
                fetch(removePlayerUrl, {method: 'POST'})
                    .then(res => res.json())
                    .then(
                        (result) => {
                        },
                        (error) => {
                            return <>Error with API call: {removePlayerUrl}</>;
                        }
                    )

            }
        );
        this.setState({updateRequired: true});
    }

    render () {
        if(this.state.updateRequired){
            return <this.UpdateApiCalls />
        }
        return (
           <div>
           <img src={smallLogo} className="icon" alt="small_logo" />
           <img src={logo} className="bg_lower" alt="logo" />
           <TransferList clearTeam={this.clearTeam} addPlayers={this.addPlayers} removePlayers={this.removePlayers} availablePlayerIDs={this.state.availablePlayerIDs} availablePlayerFirstNames={this.state.availablePlayerFirstNames} availablePlayerLastNames={this.state.availablePlayerLastNames}  teamPlayerIDs={this.state.teamPlayerIDs} teamPlayerFirstNames={this.state.teamPlayerFirstNames} teamPlayerLastNames={this.state.teamPlayerLastNames} />

                <div className="evalGauges">
				{
				    this.state.teamPlayerIDs.length > 1
                        ?
                        this.state.criteriaNames.map(
                            ( criterion ) =>
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

                <TopNav/>

           </div>
        );
    }
}
 
export {BuildTeam};
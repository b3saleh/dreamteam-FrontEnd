import React from 'react';
import smallLogo from '../DreamTeamLogo_small.PNG'
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import GaugeChart from 'react-gauge-chart';
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
}));


class EvalGauge extends React.Component{

    handlePlusClick = () => {
        this.props.increaseGrade(this.props.id);
    }

    handleMinusClick = () => {
        this.props.decreaseGrade(this.props.id);

    }

    render() {
        return(
             <div className="gauges">
                 <h4> {this.props.name}</h4>
                  <GaugeChart id={this.props.name}
                    nrOfLevels={5}
                    colors={["#fc0f03", "#7de330"]}
                    percent={(this.props.grade / 5) - 0.1}
                />
                 <button onClick={this.handleMinusClick} disabled={this.props.grade < 2}>-</button>
                 <button onClick={this.handlePlusClick} disabled={this.props.grade > 4}>+</button>
             </div>
            );
    }
}


class EvalComments extends React.Component{
    constructor(props){
        super(props);
        this.state = {comment: "", savedComments:[], commentIDs:[]};

        
        const getCommentsUrl = urlAPI + "getComments/?playerID=" + this.props.selectedPlayer;
        fetch(getCommentsUrl)
            .then(res => res.json())
            .then(
                (result) => {
                 this.setState({savedComments: result.comments})
                 this.setState({commentIDs: result.commentIDs})
                 this.props.onSelection(result.commentIDs[0]);
                 

                
                },
                (error) => {
                    return <>Error with API call: {getCommentsUrl}</>;
                }
            );
    }

    updateComment = (event) => {
        this.setState({comment: event.target.value});
    }

    sendComment = (event) => {
        const sendCommentUrl = urlAPI + "postComment/?playerID=" + this.props.selectedPlayer + "&userID=" + localStorage.getItem("userID") + "&commentText=" + this.state.comment;
        fetch(sendCommentUrl, {method: 'POST'})
            .then(res => res.json())
            .then(
                (result) => {
                    
                },
                (error) => {
                    // Code if shit hit the fan
                }
            );
        
        this.setState({comment: ""});
    }
    

    render() {
             
        return(
             <div className = "Comments">
             <label> Evaluation Criteria:</label>
            <input type="text" value={this.state.comment} onChange={this.updateComment}/>
            <input type="button" value="Submit Comment" onClick={this.sendComment}/>
            <List className="playerList">
                    {this.state.commentIDs.map(
                            (id) =>
                                <ListItem >
                                    {this.state.savedComments[this.state.commentIDs.indexOf(id)] }
                                </ListItem>
                        )
                    }
                    </List>
               
        
                
                        
            </div>

            
                                
            );
    }
}





class AthleteList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {playerFirstNames: [], playerLastNames: [], playerIDs: []};
        const getListUrl = urlAPI + "listPlayers/?tryoutID=" + localStorage.getItem('currentTryoutID');
        fetch(getListUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({playerFirstNames: result.playerFirstNames});
                    this.setState({playerLastNames: result.playerLastNames});
                    this.setState({playerIDs: result.playerIDs});
                    this.props.onSelection(result.playerIDs[0]);
                },
                (error) => {
                    return <>Error with API call: {getListUrl}</>;
                }
            );

            


    }

    buttonClicked = (event) => {
        this.props.onSelection(event.target.id);
    }



    render() {
        return (
            <div className="somethingElse">
                <h1>Athlete List</h1>
                <List>
                    {this.state.playerIDs.map(
                            (id) =>
                                <ListItem button selected={this.props.selectedPlayer === id} onClick={this.buttonClicked} key={id} id={id}>
                                    {this.state.playerFirstNames[this.state.playerIDs.indexOf(id)] + " " + this.state.playerLastNames[this.state.playerIDs.indexOf(id)]}
                                </ListItem>
                        )
                    }
                </List>
            </div>
        );
    }
}

 
class TryoutEvaluation extends React.Component {
    constructor(props){
        super(props);
        this.state = {criteriaNames: [], criteriaGrades: [], criteriaIDs: [], selectedPlayer: 0}
        const getListUrl = urlAPI + "listCriteria/?tryoutID=" + localStorage.getItem('currentTryoutID');
        fetch(getListUrl)
			.then(
				res =>
					res.json()
			)
			.then(
				(result) => {
					this.setState({criteriaNames: result.criteriaNames});
					this.setState({criteriaIDs: result.criteriaIDs});
				},
				(error) => {
					return <>Error with API call: {getListUrl}</>;
				}
			);
        this.handleSelection = this.handleSelection.bind(this);
        this.decreaseGrade = this.decreaseGrade.bind(this);
        this.increaseGrade = this.increaseGrade.bind(this);
    }

    increaseGrade(criterionID) {
        let criteriaGrades = [...this.state.criteriaGrades];
        criteriaGrades[this.state.criteriaIDs.indexOf(criterionID)] += 1;
        let updateAPI = urlAPI + "submitEval/?userID=" + localStorage.getItem("userID") + "&playerID=" + this.state.selectedPlayer + "&criterionID=" + criterionID + "&grade=" + criteriaGrades[this.state.criteriaIDs.indexOf(criterionID)];
        fetch(updateAPI, {method: 'POST'})
            .then(res => res.json())
            .then(
                (result) =>{
                    this.setState({criteriaGrades: criteriaGrades});
                },
                (error) => {
                    return <>Error with API call: {updateAPI}</>;
                }
            )
    }

    decreaseGrade(criterionID) {
        let criteriaGrades = [...this.state.criteriaGrades];
        criteriaGrades[this.state.criteriaIDs.indexOf(criterionID)] -= 1;
        let updateAPI = urlAPI + "submitEval/?userID=" + localStorage.getItem("userID") + "&playerID=" + this.state.selectedPlayer + "&criterionID=" + criterionID + "&grade=" + criteriaGrades[this.state.criteriaIDs.indexOf(criterionID)];
        fetch(updateAPI, {method: 'POST'})
            .then(res => res.json())
            .then(
                (result) =>{
                    this.setState({criteriaGrades: criteriaGrades});
                },
                (error) => {
                    return <>Error with API call: {updateAPI}</>;
                }
            )
    }

    handleSelection(playerID){
        this.setState({selectedPlayer: playerID});
        const getEvalsUrl = urlAPI + "getEvals/?playerID=" + playerID + "&userID=" + localStorage.getItem("userID");
        fetch(getEvalsUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    let criteriaGrades = Array(this.state.criteriaIDs.length).fill(3);
                    if(result.criteriaGrades.length > 0){
                        result.criteriaGrades.map(
                            (grade) =>
                                criteriaGrades[this.state.criteriaIDs.indexOf(result.criteriaIDs[result.criteriaGrades.indexOf(grade)])] = grade
                        )
                    }
                    this.setState({criteriaGrades: criteriaGrades});
                },
                (error) => {
                    return <>Error with API call: {getEvalsUrl}</>;
                }
            );
    }

    render() {
        return (
           <div>
           <img src={smallLogo} className="icon" alt="small_logo" />
           <img src={logo} className="bg_lower" alt="logo" />
           <AthleteList selectedPlayer={this.state.selectedPlayer} onSelection={this.handleSelection}/>


                <div className="evalGauges">
				{
				    this.state.criteriaNames.map(
				        ( criterion ) => <EvalGauge name={criterion} id={this.state.criteriaIDs[this.state.criteriaNames.indexOf(criterion)]} grade={this.state.criteriaGrades[this.state.criteriaNames.indexOf(criterion)]} increaseGrade={this.increaseGrade} decreaseGrade={this.decreaseGrade}/> )
				}
                </div>
                <EvalComments selectedPlayer={this.state.selectedPlayer}/>


            <TopNav/>


           </div>
        );
    }

}
 
export { TryoutEvaluation };
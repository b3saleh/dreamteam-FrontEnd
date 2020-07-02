import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import GaugeChart from 'react-gauge-chart';
import {urlAPI} from "../Constants";


class EvalGauge extends React.Component{

    handlePlusClick = () => {
        this.props.increaseGrade(this.props.id);
    }

    handleMinusClick = () => {
        this.props.decreaseGrade(this.props.id);

    }

    render() {
        return(
             <div class="column is-narrow-desktop">
                 <p class="is-size-4"> {this.props.name}</p>
                  <GaugeChart id={this.props.name}
                    nrOfLevels={5}
                    colors={["#fc0f03", "#7de330"]}
                    percent={(this.props.grade / 5) - 0.1}
                  />
                 <input type="button" value="-" style={{margin:5}} onClick={this.handleMinusClick} disabled={this.props.grade < 2}/>
                 <input type="button" value="+" style={{margin:5}} onClick={this.handlePlusClick} disabled={this.props.grade > 4}/>
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
             <div>
             <label> Comments:</label>
            <input type="text" value={this.state.comment} onChange={this.updateComment}/>
            <input type="button" value="Submit Comment" onClick={this.sendComment}/>
                <List>
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

 
class TryoutEvaluation extends React.Component {
    constructor(props){
        super(props);
        this.state = {criteriaNames: [], criteriaGrades: [], criteriaIDs: [], selectedPlayer: -1, playerFirstNames: [], playerLastNames: [], playerIDs: []}
        const getPlayersUrl = urlAPI + "listPlayers/?tryoutID=" + localStorage.getItem('currentTryoutID');
        fetch(getPlayersUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({playerFirstNames: result.playerFirstNames});
                    this.setState({playerLastNames: result.playerLastNames});
                    this.setState({playerIDs: result.playerIDs});
                },
                (error) => {
                    return <>Error with API call: {getListUrl}</>;
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

    handleSelection = (event)  => {
        this.setState({selectedPlayer: parseInt(event.target.id)});
        const getEvalsUrl = urlAPI + "getEvals/?playerID=" + event.target.id + "&userID=" + localStorage.getItem("userID");
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
               <div class={"columns"}>
                   <div className="column is-8">
                       {this.state.selectedPlayer === -1 ?
                           <div className="is-size-3">
                               Select A Player
                           </div>
                           :
                           <div class="is-size-3">
                               {this.state.playerFirstNames[this.state.playerIDs.indexOf(this.state.selectedPlayer)] + " " + this.state.playerLastNames[this.state.playerIDs.indexOf(this.state.selectedPlayer)]}
                           </div>
                       }
                           <br/>
                           <div class="columns is-multiline is-centered">
                           {
                               this.state.criteriaNames.map(
                                   (criterion) => <EvalGauge name={criterion}
                                                             id={this.state.criteriaIDs[this.state.criteriaNames.indexOf(criterion)]}
                                                             grade={this.state.criteriaGrades[this.state.criteriaNames.indexOf(criterion)]}
                                                             increaseGrade={this.increaseGrade}
                                                             decreaseGrade={this.decreaseGrade}/>)
                           }
                       </div>
                       <EvalComments selectedPlayer={this.state.selectedPlayer}/>
                   </div>
                   <div class="column">
                        <p class="is-size-3">Athlete List</p>
                        <List>
                            {this.state.playerIDs.map(
                                (id) =>
                                    <ListItem button selected={this.props.selectedPlayer === id} onClick={this.handleSelection} key={id} id={id}>
                                        {this.state.playerFirstNames[this.state.playerIDs.indexOf(id)] + " " + this.state.playerLastNames[this.state.playerIDs.indexOf(id)]}
                                    </ListItem>
                                )
                            }
                        </List>
                   </div>
               </div>
           </div>
        );
    }
}
 
export { TryoutEvaluation };
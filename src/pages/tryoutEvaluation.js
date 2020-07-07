import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import GaugeChart from 'react-gauge-chart';
import {urlAPI} from "../Constants";


class EvalGauge extends React.Component{

    handlePlusClick = () => {
        this.props.increaseGrade(this.props.id);
    };

    handleMinusClick = () => {
        this.props.decreaseGrade(this.props.id);

    };

    render() {
        return(
             <div class="column is-narrow-desktop">
                 <p class="is-size-4"> {this.props.name}</p>
                  <GaugeChart id={this.props.name}
                    nrOfLevels={5}
                    colors={["#fc0f03", "#7de330"]}
                    percent={this.props.grade - 3}
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
        this.state = {comment: ""};
    }

    updateComment = (event) => {
        this.setState({comment: event.target.value});
    };

    sendComment = (event) => {
        let commentText = encodeURIComponent(this.state.comment.trim());

        this.props.submitComment(commentText);

        this.setState({comment: ""});
    };

    deleteClicked = (event) => {
        this.props.deleteComment(event.target.id);
    };

    render() {
        return(
             <div>
                 <p style={{textAlign:"center"}}> Comments:</p>
                 <List style={{padding:20}}>
                        {this.props.commentIDs.map(
                                (id) =>
                                    <ListItem>
                                        <div style={{fontWeight:"bold"}}>
                                            {this.props.commenterFirstNames[this.props.commentIDs.indexOf(id)]} {this.props.commenterLastNames[this.props.commentIDs.indexOf(id)] + ": "}
                                        </div>
                                        <div style={{fontStyle:"italic"}}>
                                            "{this.props.savedComments[this.props.commentIDs.indexOf(id)] }"
                                        </div>
                                        <div style={{fontStyle:"italic"}}>
                                            {this.props.commentTimes[this.props.commentIDs.indexOf(id)] ? " - " + this.props.commentTimes[this.props.commentIDs.indexOf(id)].slice(11,19) : ""}
                                            {this.props.commentTimes[this.props.commentIDs.indexOf(id)] ? " - " + this.props.commentTimes[this.props.commentIDs.indexOf(id)].slice(0,10) : ""}
                                        </div>
                                            {parseInt(this.props.commenterIDs[this.props.commentIDs.indexOf(id)]) === parseInt(localStorage.getItem('userID'))
                                                ?
                                                <a id={id} onClick={this.deleteClicked}>DELETE</a>
                                                :
                                                ""}
                                    </ListItem>
                            )
                        }
                 </List>
                 <input type="text" value={this.state.comment} onChange={this.updateComment} style={{width:"80%"}}/>
                 <br/>
                 <input type="button" value="Submit Comment" onClick={this.sendComment}/>
            </div>
        );
    }
}

 
class TryoutEvaluation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            criteriaNames: [],
            criteriaGrades: [],
            criteriaIDs: [],
            selectedPlayer: -1,
            savedComments:[],
            commentIDs:[],
            commenterFirstNames:[],
            commenterLastNames:[],
            commenterIDs:[],
            commentTimes:[],
            playerFirstNames: [],
            playerLastNames: [],
            playerIDs: [],
            playerTeams: []};
        const getPlayersUrl = urlAPI + "listPlayers/?tryoutID=" + localStorage.getItem('currentTryoutID');
        fetch(getPlayersUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({playerFirstNames: result.playerFirstNames});
                    this.setState({playerLastNames: result.playerLastNames});
                    this.setState({playerIDs: result.playerIDs});
                    this.setState({playerTeams: result.playerTeams});
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
					this.setState({criteriaGrades: new Array(this.state.criteriaIDs.length).fill(3)});
				},
				(error) => {
					return <>Error with API call: {getListUrl}</>;
				}
			);
        this.handleSelection = this.handleSelection.bind(this);
        this.decreaseGrade = this.decreaseGrade.bind(this);
        this.increaseGrade = this.increaseGrade.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
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

    submitComment(commentText) {
        const sendCommentUrl = urlAPI + "postComment/?playerID=" + this.state.selectedPlayer + "&userID=" + localStorage.getItem("userID") + "&commentText=" + commentText;
        fetch(sendCommentUrl, {method: 'POST'})
            .then(res => res.json())
            .then(
                (result) => {
                    const getCommentsUrl = urlAPI + "getComments/?playerID=" + this.state.selectedPlayer;
                    fetch(getCommentsUrl)
                        .then(res => res.json())
                        .then(
                            (result) => {
                             this.setState({savedComments: result.comments});
                             this.setState({commentIDs: result.commentIDs});
                             this.setState({commenterFirstNames: result.commenterFirstNames});
                             this.setState({commenterLastNames: result.commenterLastNames});
                             this.setState({commentTimes: result.commentTimes});
                             this.setState({commenterIDs: result.commenterIDs});
                            },
                            (error) => {
                                return <>Error with API call: {getCommentsUrl}</>;
                            }
                        );
                },
                (error) => {
                }
            );
    }

    deleteComment(commentID){
        const deleteCommentUrl = urlAPI + "deleteComment/?commentID=" + commentID;
        fetch(deleteCommentUrl, {method: 'POST'})
            .then(res => res.json())
            .then(
                (result) => {
                    const getCommentsUrl = urlAPI + "getComments/?playerID=" + this.state.selectedPlayer;
                    fetch(getCommentsUrl)
                        .then(res => res.json())
                        .then(
                            (result) => {
                             this.setState({savedComments: result.comments});
                             this.setState({commentIDs: result.commentIDs});
                             this.setState({commenterFirstNames: result.commenterFirstNames});
                             this.setState({commenterLastNames: result.commenterLastNames});
                             this.setState({commentTimes: result.commentTimes});
                             this.setState({commenterIDs: result.commenterIDs});
                            },
                            (error) => {
                                return <>Error with API call: {getCommentsUrl}</>;
                            }
                        );
                },
                (error) => {
                }
            );
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
            );
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
        const getCommentsUrl = urlAPI + "getComments/?playerID=" + event.target.id;
        fetch(getCommentsUrl)
            .then(res => res.json())
            .then(
                (result) => {
                 this.setState({savedComments: result.comments});
                 this.setState({commentIDs: result.commentIDs});
                 this.setState({commenterFirstNames: result.commenterFirstNames});
                 this.setState({commenterLastNames: result.commenterLastNames});
                 this.setState({commentTimes: result.commentTimes});
                 this.setState({commenterIDs: result.commenterIDs});
                },
                (error) => {
                    return <>Error with API call: {getCommentsUrl}</>;
                }
            );
    };

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
                       <EvalComments commentTimes={this.state.commentTimes} savedComments={this.state.savedComments} commentIDs={this.state.commentIDs} submitComment={this.submitComment} deleteComment={this.deleteComment} commenterIDs={this.state.commenterIDs} commenterFirstNames={this.state.commenterFirstNames} commenterLastNames={this.state.commenterLastNames}/>
                   </div>
                   <div class="column">
                        <p class="is-size-3">Athlete List</p>
                        <List>
                            {this.state.playerIDs.map(
                                (id) =>
                                    <ListItem button selected={this.props.selectedPlayer === id} onClick={this.handleSelection} key={id} id={id}>
                                        {this.state.playerFirstNames[this.state.playerIDs.indexOf(id)] + " " + this.state.playerLastNames[this.state.playerIDs.indexOf(id)]}
                                        {this.state.playerTeams[this.state.playerIDs.indexOf(id)] ? " (" + this.state.playerTeams[this.state.playerIDs.indexOf(id)] + ") " : ""}
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
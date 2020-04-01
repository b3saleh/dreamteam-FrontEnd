import React from 'react';
import smallLogo from '../DreamTeamLogo_small.PNG'
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
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
    constructor(props){
        super(props);
        this.state = {score: 0.5};
    }

    increaseScore = (event) => {
        this.setState({score: this.state.score + 0.1});
    }

    decreaseScore = (event) => {
        this.setState({score: this.state.score - 0.1});
    }

    render() {
        let plusButton;
        let minusButton;
        if(this.state.score > 0.9){
            plusButton = <button onClick={this.increaseScore} disabled={true}>+</button>
        } else {
            plusButton = <button onClick={this.increaseScore}>+</button>
        }
        if(this.state.score < 0.1){
            minusButton = <button onClick={this.decreaseScore} disabled={true}>-</button>
        } else {
            minusButton = <button onClick={this.decreaseScore}>-</button>;
        }

        return(
             <div className="gauges">
                 <h4> {this.props.name}</h4>
                  <GaugeChart id={this.props.name}
                    nrOfLevels={10}
                    colors={["#fc0f03", "#7de330"]}
                    percent={this.state.score}
                />
                 {minusButton}
                 {plusButton}
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
    }

    sendComment = (event) => {
        // Space for API code
        this.setState({comment: ""});
    }
    

    render() {
             
        return(
             <div className = "Comments">
             <label> Evaluation Criteria:</label>
            <input type="text" value={this.state.comment} onChange={this.updateComment}/>
            <input type="button" value="Submit Comment" onClick={this.sendComment}/>
            </div>
            );
    }
}





class AthleteList extends React.Component{

   constructor(props){
    
        super(props);
        this.state = {index: 0, name: ''};
    }

    buttonClicked = (event) => {
      //space for API Call
        this.setState({index: this.state.index});
        let message = "Athlete" + event.target.key
        console.log(message);
    }


    render(){
          const rowComponent = ({ index, style }) => (
            <ListItem button style={style} key={index} onClick={this.buttonClicked}>
             <ListItemText primary={`AthleteName ${index +1}`} />
          </ListItem>
);
        return (
          <div className="somethingElse">
             <h1>Athlete List</h1>
            <FixedSizeList height={600} width={300} itemSize={46} itemCount={200}>
             {rowComponent}
        </FixedSizeList>
         </div>
  );
    }



}

 
class TryoutEvaluation extends React.Component {
    constructor(props){
        super(props);
        this.state = {criteriaNames: []}
    }
    CriteriaList = () => {
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
		return (
			<>
				{
				    this.state.criteriaNames.map(
				        ( criterion ) => <EvalGauge name={criterion}/>
                    )
				}
			</>
		);
	}

    render() {
        return (
           <div>
           <img src={smallLogo} className="icon" alt="small_logo" />
           <img src={logo} className="bg_lower" alt="logo" />
           <AthleteList/>

                <div className="evalGauges">
                    <EvalGauge name="Athleticism" />
                    <EvalGauge name="Attitude" />
                    <EvalGauge name="GameSense" />
                </div>
                <EvalComments/>


            <TopNav/>


           </div>
        );
    }

}
 
export { TryoutEvaluation };
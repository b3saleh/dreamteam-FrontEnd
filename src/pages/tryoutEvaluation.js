import React from 'react';
import smallLogo from '../DreamTeamLogo_small.PNG'
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import GaugeChart from 'react-gauge-chart'

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
            minusButton = <button onClick={this.decreaseScore}>-</button>
        }
        return(
             <div className="gauges">
                <h4> Criterion #1 </h4>
                <GaugeChart id="gauge-chart1"
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

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`AthleteName ${index + 1}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

 function VirtualizedList() {
  const classes = useStyles();

  return (
    <div className="somethingElse">
      <h1>Athlete List</h1>
      <FixedSizeList height={600} width={300} itemSize={46} itemCount={200}>
        {renderRow}
      </FixedSizeList>
        </div>
  );
}


 
export const tryoutEvaluation = () => {
    return (
       <div>
       <img src={smallLogo} className="icon" alt="small_logo" />
       <img src={logo} className="bg_lower" alt="logo" />		 
       <VirtualizedList/>

            <EvalGauge />

              <div className="gauges2">
               <h4> Criterion #2 </h4>
                 <GaugeChart id="gauge-chart2" 
                     nrOfLevels={20} 
                    colors={["#fc0f03", "#7de330"]} 
                     percent={0.3} 
            />
            <button>+</button>
            <button>-</button>
            
          </div>
           <div className="gauges3">
               <h4> Criterion #3 </h4>
                 <GaugeChart id="gauge-chart3" 
                     nrOfLevels={20} 
                    colors={["#fc0f03", "#7de330"]} 
                     percent={0.3} 
            />
            <button>+</button>
            <button >-</button>
            
          </div>

 		<div class="topnav">
 		     <a href="/Notifications" >
        		Notifications
       		 </a>
 			<a href="/MyTeams" >
        		Teams
       		 </a>
       		 <a href="/CreateATryout" >
        		Create A Tryout
       		 </a>
       		 <a href="/Profile" >
        		Profile
       		 </a>

       		</div>


       </div>
    );
}
 
export default tryoutEvaluation;
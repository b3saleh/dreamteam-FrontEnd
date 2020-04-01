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

   

    render() {
        

        let gaugeID = "gauge-char" + this.props.idNum ;
        return(
             <div className={this.props.name}>
                 <h4> Criterion #{this.props.idNum}</h4>
                  <GaugeChart id={gaugeID}
                    nrOfLevels={10}
                    colors={["#fc0f03", "#7de330"]}
                    percent={this.state.score}
                />
                 
             </div>
            );
    }
}





class CurrTeamList extends React.Component{

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
             <h1>Current Team</h1>
            <FixedSizeList height={600} width={250} itemSize={46} itemCount={10}>
             {rowComponent}
        </FixedSizeList>
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
          <div className="athleteList">
             <h1>Athletes</h1>
            <FixedSizeList height={600} width={250} itemSize={46} itemCount={200}>
             {rowComponent}
        </FixedSizeList>
         </div>
  );
    }



}

 
export const buildTeam = () => {
    return (
       <div>
       <img src={smallLogo} className="icon" alt="small_logo" />
       <img src={logo} className="bg_lower" alt="logo" />    
       <CurrTeamList/>
       <AthleteList/>

            <EvalGauge name="gauges-view" idNum="1" />
            <EvalGauge name="gauges-view2" idNum="2" />
            <EvalGauge name="gauges-view3" idNum="3" />
            
           

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
 
export default buildTeam;
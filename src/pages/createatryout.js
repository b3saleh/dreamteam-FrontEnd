import React from 'react';
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import { TopNav } from '../components/TopNav';
import {urlAPI} from '../Constants';
import {Redirect} from "react-router-dom";
import {forEach} from "react-bootstrap/cjs/ElementChildren";


class CreateATryout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tryoutName: "",
            numberOfCriteria: 1,
            criteriaNames: [""],
            createSuccess: false};
    }

    handleAddCriterion = (event) => {
        this.setState({criteriaNames: this.state.criteriaNames.concat([""])})
    }

    changeAttribute = (event) => {
		const fieldName = event.target.id;
		const value = event.target.value;
		this.setState({
			[fieldName]: value
		})
	}

	changeCriterion = (event) => {
		let newCriteriaNames = this.state.criteriaNames
        newCriteriaNames[event.target.id] = event.target.value
        this.setState({ shareholders: newCriteriaNames });
    }

    handleRemoveCriterion = idx => () => {
		let newCriteriaNames = this.state.criteriaNames
        delete newCriteriaNames[idx]
        this.setState({ shareholders: newCriteriaNames });
    }

	createTryout = (event) => {
        let createTryoutUrl = urlAPI + "createTryout/?userID=" + this.props.userID + "&tryoutName=" + this.state.tryoutName;
        this.state.criteriaNames.forEach(eachCriterion)
        function eachCriterion(value) {
          createTryoutUrl += "&criteria=" + value
        }
        fetch(createTryoutUrl, {method: 'POST'})
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

    render(){
        if(this.state.createSuccess){
			return <Redirect to={'/Dashboard'} />
		}
        return (

           <div>

               <div class="column">
                    <h1>Create A Tryout</h1>


                 <form>
                 <label> Tryout Name:</label>
                 <input type="text" id="tryoutName" value={this.state.tryoutName} onChange={this.changeAttribute}/>


                 <br/><br/>
                 <label> Evaluation Criteria:</label>
                 <br/><br/>

                             {
                                 this.state.criteriaNames.map((criterion, idx) => (
                                     <div className={"columns is-vcentered"}>
                                         <div className={"column is-11"} style={{padding:0, margin:0}}>
                                            <input type="text" id={idx} value={criterion} onChange={this.changeCriterion} />
                                         </div>
                                         <div class={"column"}>
                                            <input type="button" value="-" onClick={this.handleRemoveCriterion(idx)}/>
                                         </div>
                                      </div>
                                 ))
                             }
                     <input type="button" value="Add Criterion" onClick={this.handleAddCriterion} />
                 <br/><br/>
                 <input type="button" value="Create Tryout" onClick={this.createTryout} />
                 </form>
               </div>
           </div>
        );
    }

}

export {CreateATryout};

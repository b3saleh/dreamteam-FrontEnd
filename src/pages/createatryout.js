import React from 'react';
import {urlAPI} from '../Constants';
import {Redirect} from "react-router-dom";
import CT from "../CreateTryout.jpg";


class CreateATryout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tryoutName: "",
            numberOfCriteria: 1,
            criteriaNames: [""],
            createSuccess: false,
            failureNotice: false};
    };

    handleAddCriterion = (event) => {
        this.setState({criteriaNames: this.state.criteriaNames.concat([""])})
    };

    changeAttribute = (event) => {
		const fieldName = event.target.id;
		const value = event.target.value;
		this.setState({
			[fieldName]: value
		})
	};

	changeCriterion = (event) => {
		let newCriteriaNames = this.state.criteriaNames;
        newCriteriaNames[event.target.id] = event.target.value;
        this.setState({ shareholders: newCriteriaNames });
    };

    handleRemoveCriterion = idx => () => {
		let newCriteriaNames = this.state.criteriaNames;
        delete newCriteriaNames[idx];
        this.setState({ shareholders: newCriteriaNames });
    };

	createTryout = (event) => {
        let createTryoutUrl = urlAPI + "createTryout/?userID=" + this.props.userID + "&tryoutName=" + encodeURIComponent(this.state.tryoutName.trim());
        this.state.criteriaNames.forEach(eachCriterion);
        function eachCriterion(value) {
          createTryoutUrl += "&criteria=" + encodeURIComponent(value.trim());
        }
        fetch(createTryoutUrl, {method: 'POST'})
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({createSuccess: true})
				},
				(error) => {
					this.setState({failureNotice: true})
				}
			);
    };

    render(){
        if(this.state.createSuccess){
			return <Redirect to={'/Dashboard'} />
		}
        return (
            <div className="columns is-vcentered" style={{padding:50}}>
					<div className="column is-7">
					   <img src={CT} className="App-logo" alt="logo"/>
				   </div>

                <div className="column">
                    <h1>Create A Tryout</h1>
                     <br/>


                 <form class="is-centered">
                 <input type="text" style={{maxWidth:300}} id="tryoutName" value={this.state.tryoutName} onChange={this.changeAttribute} placeholder="Tryout Name" />

                             {
                                 this.state.criteriaNames.map((criterion, idx) => (
                                     <article className="media" style={{borderTop:0, margin:"auto", paddingTop:0, maxWidth:300}}>
                                        <div className="media-content">
                                            <div className="content">
                                                <input type="text" id={idx} value={criterion} onChange={this.changeCriterion} placeholder={"Criterion " + (idx+1)} />
                                            </div>
                                        </div>
                                         <div className="media-right">
                                             <div className="content" style={{marginTop:6}}>
                                                 <input type="button" value="-" onClick={this.handleRemoveCriterion(idx)}/>
                                             </div>
                                         </div>
                                     </article>
                                 ))
                             }
                     <input type="button" value="+" onClick={this.handleAddCriterion} />
                 <br/>
                 {this.state.failureNotice ? "Sorry! Something when wrong :(" : ""}
                 <br/>

                 {this.state.tryoutName ? <input type="button" value="Create Tryout" onClick={this.createTryout} /> : <input type="button" value="Incomplete" disabled={true}/>}
                 </form>
               </div>
           </div>
        );
    }

}

export {CreateATryout};

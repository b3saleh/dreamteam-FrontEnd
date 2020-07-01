import React from 'react';
import logo from '../DreamTeamLogo.PNG';
import {Redirect} from "react-router-dom";
 
export const Home = () => {
    if (localStorage.getItem('userID')){
        return (
				<Redirect to={'/Dashboard'}/>
			);
    }

    return (
       <section class="hero is-fullheight">
           <div class="container">
            <img src={logo} className="App-logo" alt="logo"/>
           </div>
       </section>
    );
}
 
export default Home;
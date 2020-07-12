import React from 'react';
import logo from '../DreamTeamLogo.PNG';
import {Redirect} from "react-router-dom";
import ReactPlayer from "react-player";

export const Home = () => {
    if (localStorage.getItem('userID')){
        return (
				<Redirect to={'/Dashboard'}/>
			);
    }

    return (
        <div className="columns is-centered is-multiline">
            <div className="column is-8" >
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
            <div className="column is-8">
              <ReactPlayer width="100%" height="100vh"
                url="https://www.youtube.com/watch?v=VGH_tBSS2QY&feature=youtu.be&hd=1"
              />
            </div>
        </div>
    );
}
 
export default Home;
import React from 'react';
import logo from '../DreamTeamLogo.PNG';
import {Redirect} from "react-router-dom";
import { Fade } from 'react-slideshow-image';

const fadeImages = [
  logo
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: true
};

const Slideshow = () => {
  return (
    <Fade {...fadeProperties}>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[0]}  className="App-logo" alt="logo"/>
        </div>
        <h2>First Slide</h2>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[1]} />
        </div>
        <h2>Second Slide</h2>
      </div>
    </Fade>
  )
};
 
export const Home = () => {
    if (localStorage.getItem('userID')){
        return (
				<Redirect to={'/Dashboard'}/>
			);
    }

    return (
        <div className="columns is-centered">
            <div className="column is-8" >
                <img src={logo} className="App-logo" alt="logo"/>
            </div>
        </div>
    );
}
 
export default Home;
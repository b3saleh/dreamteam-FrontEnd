import React from 'react';
import AU from "../AboutUs.jpg";
 
export const About = () => {
    return (
       <div className="columns is-vcentered" style={{padding:50}}>
           <div className="column is-7">
               <img src={AU} className="App-logo" alt="logo"/>
           </div>
           <div class="column is-5 has-text-centered">
               <h1>About US</h1>
               <p>DreamTeam was designed for the University of Waterloo Ultimate Frisbee team, to  provide the coaches and captains with a way to track athlete’s performance and development in a tryout setting.
               When a team is hosting tryouts, coaches and captains need to evaluate various athletes and later access that information to build a strong and balanced team. </p>
               <br/>
               <p> DreamTeam is here to help!</p>
           </div>
       </div>
    );
}
 
export default About;
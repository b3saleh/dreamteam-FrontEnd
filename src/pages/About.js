import React from 'react';
import AboutUs from "../AboutUs.jpg";
 
export const About = () => {
    return (
       <div className="columns is-centered">
           <div class="column" style={{maxWidth:500}}>
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
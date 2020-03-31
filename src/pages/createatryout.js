import React from 'react';
import smallLogo from '../DreamTeamLogo_small.PNG'
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';




 
export const createATryout= () => {
    return (
       <div>
       <img src={smallLogo} className="icon" alt="small_logo" />
       <img src={logo} className="bg_lower" alt="logo" />
 		
 		<div class="topnav">
 		     <a href="/Notifications" >
        		Notifications
       		 </a>
 			<a href="/MyTeams" >
        		Teams
       		 </a>       		
       		 <a href="/Profile" >
        		Profile
       		 </a>
      </div>
      <div class="text-block">
            <h1>Create A Tryout</h1>
         

         <form>
         <label> Tryout Name:</label>
         <input type="text" />
         <br/>
         <label for="datetime-local"> Session Date and Time: </label>

         <input type="datetime-local" placeholder= "Tryout Time" />
         
         <br/>
         <label> Evaluation Criteria:</label>
         <input type="text" />
         <button> Add Criterion </button>

         
            <br/>
            <label> Executive Emails:</label>
          <input type="email" />
          <button> Add Executive </button>
          <br/>

         
        
        
         <br/>
         <input type="submit" value="Create Tryout" />

          </form>
        

         
     </div>


       </div>

    );
}


 
export default createATryout;

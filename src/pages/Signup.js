import React from 'react';
import '../App.css';
import logo from '../DreamTeamLogo.PNG';
import { GlobalStyles } from '../global';

export const Signup = () => {
    return (
    	
       <div>
       	<img src={logo} className="bg" alt="logo" />
       	 <div class="text-block">
   			 <h1>Sign Up</h1>
   			 <form>
 				 <input type="text" placeholder= "Name" />
 				 <br/>
 				 <input type="text" placeholder= "Email" />
 				 <br/>
 				 <input type="text" placeholder= "Password" />
 				 <br/>
 				 <input type="text" placeholder= "Confirm Password" />
 				 <br/>
 				 <input type="submit" value="Sign Up" />

  				</form>
  			

   			 
 		 </div>
        
       </div>
    );
}
 
export default Signup
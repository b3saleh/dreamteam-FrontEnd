import React from 'react';
import logo from '../DreamTeamLogo.PNG';
import { GlobalStyles } from '../global';

export const Signin = () => {
    return (
       <div>
          
          <img src={logo} className="bg" alt="logo" />
          <div class="text-block">
          	<h1>Sign In</h1>
   			 

   			 <form>
 				 <input type="text" placeholder= "Email" />
 				 
 				 
 				 <br/>
 				 <input type="text" placeholder= "Password" />
 				
 				 <br/>
 				 <input type="submit" value="Sign In" />

  				</form>
  			

   			 
 		 </div>
        

       </div>
    );
}
 
export default Signin;
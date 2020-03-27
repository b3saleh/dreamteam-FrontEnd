import React from 'react';
import logo from '../DreamTeamLogo.PNG';
import { GlobalStyles } from '../global';

 
export const Findatryout = () => {
    return (
       <div>
         <img src={logo} className="bg" alt="logo" />
          <div class="text-block">
          	<h1>Find A Tryout</h1>
   			 

   			 <form>
 				 <input type="text" placeholder= "Tryout Name" />
 				 
 				 
 				
 				
 				 <br/>
 				 <input type="submit" value="Search" />

  				</form>
  			

   			 
 		 </div>

       </div>
    );
}
 
export default Findatryout;
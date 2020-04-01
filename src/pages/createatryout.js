import React from 'react';
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import { TopNav } from '../components/TopNav';


class CreateATryout extends React.Component {
    render(){
        return (
           <div>
                <img src={logo} className="bg_lower" alt="logo"/>
                <TopNav />

               <div class="text-block">
                    <h1>Create A Tryout</h1>


                 <form>
                 <label> Tryout Name:</label>
                 <input type="text" />

                 <br/>
                 <label> Evaluation Criteria 1:</label>
                 <input type="text" />

                 <br/>
                 <input type="button" value="Create Tryout" />

                  </form>
               </div>
           </div>
        );
    }

}

export {CreateATryout};

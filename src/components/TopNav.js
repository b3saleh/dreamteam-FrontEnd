import React from "react";
import smallLogo from '../DreamTeamLogo_small.PNG';
import { GlobalStyles } from '../global';


class TopNav extends React.Component {
    render(){
        return(
            <>
            <img src={smallLogo} className="icon" alt="small_logo" />

            < div className = "topnav" >
            < a href = "/Notifications" >
                Notifications
            < /a>
            <a href="/MyTeams">
                Teams
            </a>
            <a href="/CreateATryout" >
                Create A Tryout
            </a>
            < a href = "/user">
                Profile
            </a>
            </div>
            </>
        );
    }
}

export {TopNav};




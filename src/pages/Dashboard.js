import React from 'react';
import {urlAPI} from "../Constants";

// class user extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {username: '', firstName: '', lastName: '', email: ''}
//     }
//
//     getInfo = (event) => {
//         const getInfoUrl = urlAPI + "getUserInfo/?username=" + match.params.userID;
//         fetch(getInfoUrl)
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     firstName = "test";
//                 },
//                 (error) => {
//                 });
//     }
// }

export const Dashboard = ({userFirstName}) => {
    return (
       <div>
          <h1>Hello {userFirstName}</h1>
          <p>Welcome to your Dashboard</p>
       </div>
    );
}

export default Dashboard;
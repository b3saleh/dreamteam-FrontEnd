import React from 'react';
 
export const Dashboard = ({match}) => {
    return (
       <div>
          <h1>Hello User #{match.params.id}</h1>
          <p>About US page body content</p>
       </div>
    );
}

export default Dashboard;
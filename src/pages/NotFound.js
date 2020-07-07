import React from 'react';
import PNF from "../PageNotFound.jpg";
 
export const NotFound = () => {
    return (
        <div className="columns is-vcentered" style={{padding:50}}>
					<div className="column is-7">
					   <img src={PNF} className="App-logo" alt="logo"/>
				   </div>
				<div className="column">
				    <h1>We're Sorry</h1>
                    <p>We couldn't find the page you were looking for</p>
			 	</div>
			</div>
    );
};
 
export default NotFound;
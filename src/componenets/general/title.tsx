import React from "react";
import databaseLogo from "../../images/database-logo.png";

function Title() {
	return (
		<div className='title' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
			<h1 style={{ marginRight: "10px" }}>Tutor Learner Database</h1>
			<img src={databaseLogo} alt="Database Logo" style={{ width: "50px", height: "50px" }} />
		</div>
	);
}

export default Title;
import React from 'react';

function Logout({logoutResult}) {

    function endSession() {
        logoutResult();
    }

    return (
        <div className="logout" id="logout" style={{display: "none"}}>
            <button type="button" className="l-btn" onClick={endSession}>Logout</button>
        </div>
    )
}

export default Logout;
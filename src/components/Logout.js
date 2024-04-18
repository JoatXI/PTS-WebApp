import React from 'react';

function Logout({logoutResult}) {

    function endSession() {
        logoutResult();
    }

    return (
        <div className="logout">
            <button type="button" className="l-btn" onClick={endSession}>Logout</button>
        </div>
    )
}

export default Logout;
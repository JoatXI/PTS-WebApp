import React from "react";

function Displayer({ login }) {

    return (
        <div className="view">
            <h2>Logged in as: {login}</h2>
        </div>
    );
}

export default Displayer;
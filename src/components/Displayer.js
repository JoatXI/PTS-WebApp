import React from "react";
import "leaflet";

function Displayer() {
    
    return (
        <div className="wrapper">
            <div id="results">
                
            </div>

            <div id="map1" style={{width:"800px", height:"600px"}}></div>
        </div>
    );
}

export default Displayer;
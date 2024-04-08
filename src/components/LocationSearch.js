import React from "react";

function LocationSearch({searchResult}) {

    function currentLocation() {
        const inputName = document.getElementById("location").value;
        searchResult(inputName);
    }

    return (
        <div className="wrapper" id="accommodation-search">
            <h1>Accommodation Search</h1>
            <div className="input-box">
                <input type="text" id="location" placeholder="Enter Location" />
            </div>
            <button type="button" className="s-btn" onClick={currentLocation}>Search</button><br />
        </div>
    );
}

export default LocationSearch;
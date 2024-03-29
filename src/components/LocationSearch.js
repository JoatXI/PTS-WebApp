import React from "react";

function LocationSearch({searchResult}) {

    function updateLocation() {
        const inputName = document.getElementById("location").value;
        searchResult(inputName);
    }

    return (
        <div>
            <h2>Accommodation Search By Location</h2>
            <div>
                <input type="text" id="location" placeholder="Enter Location" />
                <input type="button" value="Search" onClick={updateLocation} />
            </div>
        </div>
    );
}

export default LocationSearch;
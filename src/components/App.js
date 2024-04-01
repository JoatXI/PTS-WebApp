import React from "react";
import Displayer from "./Displayer";
import LocationSearch  from "./LocationSearch";

function App({defaultLocation}) {
    const [location, setLocation] = React.useState("");
    const [accom, setAccommodation] = React.useState([]);

    const accomHtml = accom.map( currAccom => <li key={currAccom.ID}>Name: {currAccom.name}, Accommodation Type: {currAccom.type}, Accommodation Location: {currAccom.latitude}, {currAccom.longitude}</li>);

    return (
        <div>
            <LocationSearch searchResult={updateLocation} location={location} />
            <Displayer accom={accomHtml} />
        </div>
    );
    
    function updateLocation(currLocation) {
        const foundLocation = currLocation
        setLocation(foundLocation);

        ajaxSearch(foundLocation);
    }

    async function ajaxSearch(locationName) {
        try {
            const response = await fetch(`/location/${locationName}`);

            const locationList = await response.json();

            setAccommodation(locationList);

        } catch (e) {
            alert(`Error occured: ${e.message}`);
        }
    }
}

export default App;
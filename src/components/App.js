import React from "react";
import Displayer from "./Displayer";
import LocationSearch  from "./LocationSearch";

function App({defaultLocation}) {
    const [location, setLocation] = React.useState("");
    const [accomodations, setAccommodation] = React.useState([]);

    const resultHtml = accomodations.map( currAccom => <li key={currAccom.id}>Name: {currAccom.name}, Accommodation Type: {currAccom.type}, Accommodation Location: {currAccom.latitude}, {currAccom.longitude}</li>);

    return (
        <div>
            <LocationSearch searchResult={updateLocation} />
            <Displayer accomodations={resultHtml} />
        </div>
    );
    
    function updateLocation(location) {
        const foundLocation = location
        setLocation(foundLocation);

        ajaxSearch(foundLocation);
    }

    async function ajaxSearch(location) {
        try {
            const response = await fetch(`/location/${location}`);

            const locationList = await response.json();

            setAccommodation(locationList);

        } catch (error) {
            alert(`Error occured: ${error.message}`);
        }
    }
}

export default App;
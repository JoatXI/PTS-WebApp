import React from "react";
import LocationSearch from "./LocationSearch";

function App({}) {
    const [location, setLocation] = React.useState("");
    const [accomodations, setAccommodation] = React.useState([]);

    const resultHtml = accomodations.map( currElement => <li key={currElement.id}>Name: {currElement.name}, Accommodation Type: {currElement.type}, Accommodation Location: {currElement.latitude}, {currElement.longitude}</li>);

    function updateLocation(location) {
        const foundLocation = location
        setLocation(foundLocation);

        ajaxSearch(foundLocation);
    }

    return (
        <div>
            <LocationSearch searchResult={updateLocation} />
            <Displayer accomodations={resultHtml} />
        </div>
    );

    async function ajaxSearch(location) {
        try {
            const response = await fetch(`/location/${location}`);

            const data = await response.json();

            setAccommodation(data);

        } catch (error) {
            alert(`Error occured: ${error.message}`);
        }
    }
}

export default App;
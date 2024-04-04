import React from "react";
import Displayer from "./Displayer";
import LocationSearch  from "./LocationSearch";

function App() {
    const [location, setLocation] = React.useState("");
    const [accom, setAccommodation] = React.useState([]);
    const [lat, setLat] = React.useState(0);
    const [lon, setLon] = React.useState(0);

    const coord1 = accom.map( currAccom => <p key={currAccom.ID}>{currAccom.latitude}</p>);
    const coord2 = accom.map( currAccom => <p key={currAccom.ID}>{currAccom.longitude}</p>);
    const accomHtml = accom.map( currAccom => <p key={currAccom.ID}>{currAccom.name} {currAccom.description}</p>);

    setLat(coord1);
    setLon(coord2);

    return (
        <div>
            <LocationSearch searchResult={updateLocation} location={location} />
            <Displayer lat={lat} lon={lon} accom={accomHtml}/>
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

            locationList.forEach(location => {
                const node1 = document.createElement("p");
                const textNode = document.createTextNode(`ID: ${location.ID},  Name: ${location.name},  Accommodation Type: ${location.type},  Location: ${location.latitude}, ${location.longitude}`);
                
                node1.appendChild(textNode);
                
                // creates the book button
                const bookBtn = document.createElement("input");
                bookBtn.setAttribute("type", "button");
                bookBtn.setAttribute("value", "Book");
                
                //const textField = document.createElement("input");
                //textField.setAttribute("id", `npeople${location.id}`);
                
                // Adding the new node to the <div id="results">
                document.getElementById("results").appendChild(node1);
                
                //node1.appendChild(textField);
                
                // creates a "book" button event handler
                bookBtn.addEventListener('click', ajaxBook.bind(this, location));
                
                document.getElementById("results").appendChild(bookBtn);
            });

        } catch (e) {
            alert(`Error occured: ${e.message}`);
        }
    }

    async function ajaxBook(bookLocation) {
        try {
            const booking = {
                accID: bookLocation.ID,
                npeople: 1,
                thedate: 240601
            }

            const response = await fetch(`/idnpeoplethedate/book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booking)
            });

            if(response.status == 404) {
                alert("Sorry, that accommodation is not available.");
            } else if(response.status == 400) {
                alert("Invalid booking!! You must provide an Accommodation ID, number of people booking and the booking date to be able to book.");
            } else {
                alert("Accommodation booked successfully");
            }

        } catch (e) {
            alert(`Error occured: ${e.message}`);
        }
    }
}

export default App;
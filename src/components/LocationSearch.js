import React from "react";
import "leaflet";

function LocationSearch({lat1, lon1, info1, searchResult}) {
    const map = React.useRef(null);
    const [lat, setLat] = React.useState(lat1 || 51.05);
    const [lon, setLon] = React.useState(lon1 || -0.72);
    const [info, setAccom] = React.useState(info1);

    React.useEffect( () => {
        map.current = L.map("map1");

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "Copyright OSM contributors, ODBL" } ).addTo(map.current);

        const pos = [lat, lon];
        map.current.setView(pos, 14);

        const mark = L.marker(pos).addTo(map.current);

        map.current.on("click", e => {
            const text = prompt(info);

            mark.bindPopup(text);
        });
    },[]);

    function currentLocation() {
        const inputName = document.getElementById("location").value;
        searchResult(inputName);
    }

    return (
        <div>
            <h2>Accommodation Search By Location</h2>
            <div>
                <input type="text" id="location" placeholder="Enter Location" />
                <input type="button" value="Search" onClick={currentLocation} />
            </div>
        </div>
    );
}

export default LocationSearch;
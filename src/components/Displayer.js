import React from "react";
import "leaflet";

function Displayer({lat, lon, accom}) {
    const map = React.useRef(null);
    const [latitude, setLat] = React.useState({lat});
    const [longitude, setLon] = React.useState({lon});
    const [info, setAccom] = React.useState({accom});

    React.useEffect( () => {
        map.current = L.map("map1");

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "Copyright OSM contributors, ODBL" } ).addTo(map.current);

        const pos = [latitude, longitude];
        map.current.setView(pos, 14);

        L.marker(pos).addTo(map.current);

        map.current.on("click", e => {
            const text = prompt(info);

            marker.bindPopup(text);
        });
    },[]);
    
    return (
        <div className="wrapper">
            <div id="results">
                
            </div>

            <div id="map1" style="width:800px; height:600px"></div>
        </div>
    );
}

export default Displayer;
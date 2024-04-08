import React from 'react';
import "leaflet";

function LeafletMap({lat1, lon1, info1}) {
    const map = React.useRef(null);
    const [lat, setLat] = React.useState(lat1 || 51.05);
    const [lon, setLon] = React.useState(lon1 || -0.72);
    const [info, setDesc] = React.useState(info1);

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

    return (
        <div id="map1" style={{width:"800px", height:"600px"}}>

        </div>
    )
}

export default LeafletMap;
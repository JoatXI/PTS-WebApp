import React from 'react';
import "leaflet";

function LeafletMap({ location }) {
    const map = React.useRef(null);

    React.useEffect( () => {
        map.current = L.map("map");

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "Copyright OSM contributors, ODBL" } ).addTo(map.current);
        
        location.forEach(latLon => {
            L.marker([latLon.latitude, latLon.longitude]).addTo(map.current).bindPopup(`${latLon.name}, ${latLon.type}<br><br>${latLon.description}`);
            map.current.setView([latLon.latitude, latLon.longitude], 10);
        });
        
        //map.current.setView([51.05, -0.72], 14);
        
        return () => {
            map.current.remove();
        }

    }, [location]);

    return (
        <div id="map" style={{width:"800px", height:"600px"}}>

        </div>
    )
}

export default LeafletMap;
import React from 'react';
import "leaflet";

function LeafletMap({ location, booking }) {
    const map = React.useRef(null);

    React.useEffect( () => {
        map.current = L.map("map");

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "Copyright OSM contributors, ODBL" } ).addTo(map.current);
        
        location.forEach(latLon => {
            const popupInfo = `
                <div>
                    ${latLon.name}, ${latLon.type}<br><br>${latLon.description}<br>
                    <p>Fill in the Input boxes to book location</p>
                    <input type="number" id="npeople" placeholder="How Many People?" />
                    <input type="number" id="thedate" placeholder="Enter Date" />
                    <button type="button" id="bookBtn">Book</button>
                </div>
            `;

            const markerPopup = L.popup().setContent(popupInfo);

            const placesMarker = L.marker([latLon.latitude, latLon.longitude]).addTo(map.current).bindPopup(markerPopup);
            map.current.setView([latLon.latitude, latLon.longitude], 10);

            placesMarker.on('popupopen', () => {
                document.getElementById("bookBtn").addEventListener('click', () => bookLocation(latLon.ID));
            });
        });
        
        //map.current.setView([51.05, -0.72], 14);
        
        return () => {
            map.current.remove();
        }

    }, [location]);

    function bookLocation(bookingID) {
        const bookingInfo = {
            accID: bookingID,
            npeople: document.getElementById("npeople").value,
            thedate: document.getElementById("thedate").value
        }
        console.log(bookingInfo);

        booking(bookingInfo);
    }
    
    return (
        <div className='leaflet-map'>
            <div id="map" style={{width:"800px", height:"600px"}}>

            </div>
        </div>
    )
}

export default LeafletMap;
import React from "react";
import Displayer from "./Displayer";
import LocationSearch  from "./LocationSearch";
import LeafletMap from "./Map";
import Logout from "./Logout";
import Login from "./Login";

function App() {
    const [location, setLocation] = React.useState([]);
    const [login, setLogin] = React.useState("");
    checkLogin();

    return (
        <div className="content">
            <Logout logoutResult={logoutSession} />
            <Login loginResult={loginSession} />
            <LocationSearch searchResult={updateLocation} />
            <Displayer />
            <LeafletMap location={location}/>
        </div>
    );
    
    function updateLocation(currLocation) {
        ajaxSearch(currLocation);
    }

    function logoutSession() {
        ajaxLogout();
    }

    function loginSession(loginDetails) {
        setLogin(loginDetails);

        ajaxLogin(loginDetails);
    }

    async function ajaxSearch(locationName) {
        try {
            const response = await fetch(`/location/${locationName}`);

            const locationList = await response.json();

            setLocation(locationList);

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
            } else if(response.status == 401) {
                alert("User Not Logged in!! User must be logged in to Book.");
            } else if(response.status == 400) {
                alert("Invalid booking! Input data is empty or Accommodation not available!");
            } else {
                alert("Accommodation booked successfully");
            }

        } catch (e) {
            alert(`Error occured: ${e.message}`);
        }
    }

    async function checkLogin() {
        // ask the server whether the user is logged in (GET /login)
        // query the object returned by the server to see if the username is null or not null
        // if null, display login form
        // if not null, display search artist form
        try {
            const res = await fetch('/login');
    
            const userSessions = await res.json();

            if (userSessions.username == null) {
                document.getElementById('login-form').style.display = 'block';
                document.getElementById('accommodation-search').style.display = 'none';
                document.getElementById('logout').style.display = 'none';
                document.getElementById("map").style.display = "none";
            } else if (userSessions.username != null) {
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('accommodation-search').style.display = 'flex';
                document.getElementById('logout').style.display = 'flex';
                document.getElementById("map").style.display = "flex";
            }
    
        } catch (e) {
            alert(`Error occured: ${e}`);
        }
    }

    async function ajaxLogin(details) {
        try {
            const res = await fetch(`/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(details)
            });
    
            if (res.status == 401) {
                alert('Invalid login details');
            } else if (res.status == 200) {
                alert(`Logged in as ${details.username}`);
                document.getElementById("logout").style.display = "flex";
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('accommodation-search').style.display = 'flex';
                document.getElementById("map").style.display = "flex";

                const node = document.createElement("p");
                const loginText = document.createTextNode(`Logged in as ${details.username}`);

                node.appendChild(loginText);
                document.getElementById("session-result").appendChild(node);
            }
    
        } catch (e) {
            alert(`An error occurred while logging in ${e}`);
        }
    }

    async function ajaxLogout() {
        try {
            const res = await fetch(`/logout`, {
                method: 'POST'
            });
    
            if(res.status == 200) {
                alert("You have been logged out");
                document.getElementById("login-form").style.display = "block";
                document.getElementById("logout").style.display = "none";
                document.getElementById("accommodation-search").style.display = "none";
                document.getElementById("results").style.display = "none";
                document.getElementById("map").style.display = "none";
            }
    
        } catch (e) {
            alert(`Error occured: ${e}`);
        }
    }
}

export default App;
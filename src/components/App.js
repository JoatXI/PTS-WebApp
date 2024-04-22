import React from "react";
import Displayer from "./Displayer";
import LocationSearch  from "./LocationSearch";
import LeafletMap from "./Map";
import Logout from "./Logout";
import Login from "./Login";
import './App.css';

function App() {
    const [location, setLocation] = React.useState([]);
    const [login, setLogin] = React.useState(null);
    
    React.useEffect(() => {
        checkLogin();
    }, []);

    if(login != null) {
        return (
            <div className="content">
                <Logout logoutResult={logoutSession} />
                <Displayer login={login}/>
                <LocationSearch searchResult={updateLocation} />
                <LeafletMap booking={bookAccommodation} location={location} />
            </div>
        );
    } else {
        return (
            <div className="content">
                <Login loginResult={loginSession} />
            </div>
        );
    }
    
    function updateLocation(currLocation) {
        ajaxSearch(currLocation);
    }

    function logoutSession() {
        ajaxLogout();
    }

    function loginSession(loginDetails) {
        ajaxLogin(loginDetails);
    }

    function bookAccommodation(bookingDetails) {
        ajaxBook(bookingDetails);
    }

    async function ajaxSearch(locationName) {
        try {
            const response = await fetch(`/locations/location/${locationName}`);

            const locationList = await response.json();

            // saves the searched results in state which is then passed to the Map component
            setLocation(locationList);

        } catch (e) {
            alert(`Error occured: ${e.message}`);
        }
    }

    async function ajaxBook(bookingDetails) {
        try {
            const response = await fetch(`/locations/idnpeoplethedate/book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingDetails)
            });

            if (response.status == 406) {
                ("Error invalid booking! Input data not acceptable");
            } else if(response.status == 404) {
                alert("No availability found for the chosen date.");
            } else if(response.status == 401) {
                alert("User Not Logged in!! User must be logged in to Book.");
            } else if(response.status == 400) {
                alert("Not enough availability for the specified number of people.");
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
            const res = await fetch('/users/login');
    
            const userSessions = await res.json();

            setLogin(userSessions.username)
    
        } catch (e) {
            alert(`Error occured: ${e}`);
        }
    }

    async function ajaxLogin(details) {
        try {
            const res = await fetch(`/users/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(details)
            });
    
            if (res.status == 401) {
                alert('Invalid login details');
            } else if (res.status == 200) {
                setLogin(details.username);
                alert(`Logged in as ${details.username}`);
            }
    
        } catch (e) {
            alert(`An error occurred while logging in ${e}`);
        }
    }

    async function ajaxLogout() {
        try {
            const res = await fetch(`/users/logout`, {
                method: 'POST'
            });
    
            if(res.status == 200) {
                alert("You have been logged out");
                setLogin(null);
            }
    
        } catch (e) {
            alert(`Error occured: ${e}`);
        }
    }
}

export default App;
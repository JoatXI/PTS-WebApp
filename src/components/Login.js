import React from 'react';

function Login({loginResult}) {
    
    function loginSession() {
        const details = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }
        loginResult(details);
    }

    return (
        <div className="wrapper">
            <form method="post">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" id="username" placeholder="Username" required />
                </div>
                <div className="input-box">
                    <input type="password" id="password" placeholder="Password" required />
                </div>
                <button type="button" className="btn" onClick={loginSession}>Login</button>
            </form>
        </div>
    )
}

export default Login;
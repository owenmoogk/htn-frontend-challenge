import { useState } from 'react';

export default function Login(props) {

  const [showError, setShowError] = useState()

  // this should be a secure call to the server, but for this case we will just use a hardcoded value
  function validCredentials(username, password) {
    let validUsername = 'owen'
    let validPassword = 'owenpassword'
    if (username == validUsername && password == validPassword) {
      return true
    }
    return false
  }

  // handle the login when user submits info
  function handleLogin() {
    let username = document.getElementById('usernameInput').value
    let password = document.getElementById('passwordInput').value

    if (validCredentials(username, password)) {
      setShowError(false)
      props.setLoggedIn(true)
      props.setLoginPopup(false)
      localStorage.setItem('loggedIn', true)
    }
    else {
      setShowError(true)
    }
  }

  // if the user hits enter, then we need to handle login
  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === "NumpadEnter") {
      handleLogin()
    }
  }

  return (
    <div id="myModal" className="modal">
      <div className="modal-content" id='loginModal' style={{width:'400px'}}>

        {/* header */}
        <h3>Login</h3>

        {/* username input */}
        <input className='authInput' placeholder='Username' id='usernameInput' onKeyDown={(e) => handleKeyDown(e)} />
        <br />

        {/* password input */}
        <input className='authInput' type='password' placeholder='Password' id='passwordInput' onKeyDown={(e) => handleKeyDown(e)} />

        {/* error display (if credentials are invalid) */}
        {showError ? 
          <p className='error'>Error, invalid credentials.</p>
          :<br />
        }

        {/* buttons */}
        <div>
          <button id='saveButton' onClick={() => handleLogin()}>Login</button>
          <button id='cancelButton' onClick={() => props.setLoginPopup(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
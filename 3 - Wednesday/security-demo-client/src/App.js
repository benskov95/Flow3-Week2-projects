import React, { useState,useEffect } from "react"
import facade from "./apiFacade";

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
 
  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
  }
 
  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange} >
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  )
 
}
function LoggedIn({username}) {
  const [dataFromServer, setDataFromServer] = useState("Loading...");
  
  useEffect(() => { 
    facade.fetchData(username)
    .then(data=> 
      setDataFromServer(data.msg));
  }, [])
 
  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
    </div>
  )
 
}
 
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [error, setError] = useState("");
 
  const logout = () => {
    facade.logout()
    setLoggedIn(false)
  }
   
  const login = (user, pass) => {
    setError("");
    setUsername(user);
    facade.login(user,pass)
    .then(res => setLoggedIn(true))
    .catch((promise) => {
      promise.fullError.then(function (status) {
        setError(`${status.code} : ${status.message}`);
      })
    })
  }
 
  return (
    <div>
      {!loggedIn ? (<LogIn login={login} />) :
        (<div>
          <LoggedIn username={username}/>
          <button onClick={logout}>Logout</button>
        </div>)}
        <p style={{color: "red"}}>{error}</p>
    </div>
  )
 
}
export default App;
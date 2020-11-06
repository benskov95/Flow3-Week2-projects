import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Routes from "./components/Routes";
import {jokeFacade, scrapeFacade} from "./facades/jokeScrapeFacade"
import loginFacade from "./facades/loginFacade";
import {useHistory} from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  }

  return (
      <div className="App">
        <Header
        isLoggedIn={isLoggedIn} 
        loginMsg={isLoggedIn ? "Log out" : "Log in"}
        />
        <Routes 
        isLoggedIn={isLoggedIn} 
        loginMsg={isLoggedIn ? "Log out" : "Log in"}
        setLoginStatus={setLoginStatus}
        />
      </div>
  );
}

export const Home = () => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

export const Jokes = () => {
  const [comboJoke, setComboJoke] = useState({});
  const [error, setError] = useState("");

  const getJokes = () => {
    jokeFacade.getJokes()
    .then(jokes => {
      setComboJoke(jokes);
    })
    .catch((promise) => {
      printError(promise, setError);
    });
  }

  return (
    <div>
      <h2>Jokes</h2>
      <br />
      <p>Click the button to fetch some random Chuck Norris and dad jokes.</p>
      <button onClick={getJokes}>Get jokes</button>
      <br />
      <p style={{color: "red"}}>{error}</p>
      <h3>{typeof comboJoke.chuckJoke !== "undefined" ? "Chuck Norris Joke" : ""}</h3>
      <p>
        {comboJoke.chuckJoke}<br /><br />
        {typeof comboJoke.chuckJoke !== "undefined" ? `Source: ${comboJoke.chuckRef}` : ""}
        <br />
      </p>
      <h3>{typeof comboJoke.dadJoke !== "undefined" ? "Dad Joke" : ""}</h3>
      <p>
        {comboJoke.dadJoke}<br /><br />
        {typeof comboJoke.dadJoke !== "undefined" ? `Source: ${comboJoke.dadRef}` : ""}
      </p>
    </div>
  )
}

export const Scrape = () => {
  const [info, setInfo] = useState({});
  const [error, setError] = useState("");

  const doParallel = () => {
    scrapeFacade.parallelFetch()
    .then(scrapedInfo => {
      setInfo(scrapedInfo);
    })
    .catch((promise) => {
      printError(promise, setError);
    })
  }

  const doSequential = () => {
    scrapeFacade.sequentialFetch()
    .then(scrapedInfo => {
      setInfo(scrapedInfo);
    })
    .catch((promise) => {
      printError(promise, setError);
    })
  }

  return (
    <div>
      <h2>Scrape</h2>
      <button onClick={doParallel}>Parallel fetch</button>
      <button style={{marginLeft: "5px"}} onClick={doSequential}>Sequential fetch</button>
      <br />
      <p style={{color: "red"}}>{error}</p>
      <p>
        {info.title}<br />
        {info.timeSpent}
      </p>
      <h3>{typeof info.tags !== "undefined" ? "Tags" : ""}</h3>
      {typeof info.tags !== "undefined" ? info.tags.map(site => {
        return (
        <p key={site.url}>
          URL: {site.url}<br />
          Div count: {site.divCount}<br />
          Body count: {site.bodyCount}
        </p>
        )
      }) : ""}
    </div>
  )
}

export const Login = ({isLoggedIn, loginMsg, setLoginStatus}) => {
  const [user, setUser] = useState({username: "", password: ""});
  const [error, setError] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    loginFacade.login(user)
    .then(res => setLoginStatus(!isLoggedIn))
    .catch((promise) => {
      printError(promise, setError);
    });
  };

  const handleChange = (e) => {
    setError("");
    setUser({ ...user, [e.target.id]: e.target.value});
  }

  const logout = () => {
    setLoginStatus(false);
    loginFacade.logout()
  }

  if (!isLoggedIn) {
  return (
    <div>
      <h2>{loginMsg}</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <input id="username" placeholder="Enter username" onChange={handleChange} /><br />
        <input id="password" placeholder="Enter password" onChange={handleChange} /><br /><br />
        <input type="submit" value="Log in" /><br />
        <p style={{color: "red"}}>{error}</p>
      </form>
    </div>
  );
  } else {
    return (
      <div>
        <h2>{loginMsg}</h2>
        <br />
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
}

const printError = (promise, setError) => {
  promise.fullError.then(function (status) {
    setError(`${status.code} : ${status.message}`);
  })}

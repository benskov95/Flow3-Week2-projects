import React, { useState, useEffect } from "react";

function GetRandomJokes() {
  const CHUCK_URL = "https://api.chucknorris.io/jokes/random";
  const DAD_URL = "https://icanhazdadjoke.com";
  const [chuckJoke, setChuckJoke] = useState(
    "Click the button to fetch a Chuck Norris joke."
  );
  const [dadJoke, setDadJoke] = useState("Fetching dad joke...");

  function getChuckJoke() {
    fetch(CHUCK_URL).then((res) =>
      res.json().then((joke) => {
        setChuckJoke(joke.value);
      })
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      fetch(DAD_URL, { headers: { Accept: "application/json" } })
        .then((res) => res.json())
        .then((joke) => {
          setDadJoke(joke.joke);
        });
    }, 10000);
    return () => clearInterval(timer);
  });

  return (
    <div>
      <h2>Random Chuck Norris jokes</h2>
      <br />
      <button onClick={getChuckJoke}>Get ChuckNorris joke</button>
      <br />
      <br />
      <p>{chuckJoke}</p>
      <h2>Dad jokes fetched every 10 sec.</h2>
      <p>{dadJoke}</p>
    </div>
  );
}

export default GetRandomJokes;
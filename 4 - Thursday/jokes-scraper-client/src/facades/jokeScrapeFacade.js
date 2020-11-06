import loginFacade from "./loginFacade";

function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

const jFacade = () => {
  const URL = "http://localhost:8080/jokes-scraper/api/jokes";
  
  function getJokes() {
    return fetch(URL, loginFacade.makeOptions("GET", true))
    .then(handleHttpErrors);
   }

   return {
       getJokes
   }
}

const sFacade = () => {
  const URL = "http://localhost:8080/jokes-scraper/api/scrape/";

  const parallelFetch = () => {
    return fetch(URL + "parallel", loginFacade.makeOptions("GET", true))
    .then(handleHttpErrors);
  }

  const sequentialFetch = () => {
    return fetch(URL + "sequential", loginFacade.makeOptions("GET", true))
    .then(handleHttpErrors);
  }

  return {
    parallelFetch,
    sequentialFetch
  }
}

export const jokeFacade = jFacade();
export const scrapeFacade = sFacade();
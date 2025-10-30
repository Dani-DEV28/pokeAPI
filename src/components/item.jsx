import React from "react";

import CloseMatch from "./closeMatch";

export default function Item() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [clicked, setClicked] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [isSearch, setIsSearch] = React.useState(false);
  const [lastSearch, setLastSearch] = React.useState(""); 
  
  React.useEffect(() => {
    fetchData();
    }, []);


  function fetchData(pokeName) {
    setData(null)
    setError(null)
    setClicked(true)
    let endpoint;

    if (pokeName) {
      endpoint = `https://pokeapi.co/api/v2/pokemon?limit=2000`;

      let siftThrough
      let filteredResults
      let newEndpoint

      fetch(endpoint)
        .then((response) => response.json())
        .then((json) => {
          siftThrough=json;
        })
        .then(() => {
          console.log(siftThrough.results)
            filteredResults = siftThrough.results.filter((item) => {
            console.log(item.name)
            return item.name.toLowerCase().includes(pokeName.toLowerCase())
          })
        })
        .then(() => {
          console.log(filteredResults)
          newEndpoint = `https://pokeapi.co/api/v2/pokemon/${filteredResults[0].name}`
        })
        .then(() => {
          fetch(newEndpoint)
          .then((res) => res.json())
          .then((json) => setData(json))
        })
        .catch((error) => setError(error));
    }
    
    else {
      const randomNum = Math.floor(Math.random() * 1100) + 1;
      endpoint = `https://pokeapi.co/api/v2/pokemon/${randomNum}`;
      fetch(endpoint)
      .then((res) => res.json())
      .then(json => setData(json))
      .catch(error => setError(error))
    }
  }

  function formSubmit(event) {
    event.preventDefault();
    setIsSearch(true);

    if (input.trim() === "") {
      setError(new Error("empty"));
      setLastSearch("");
      setData(null);    
      setClicked(false); 
      return;
    }

    

    setLastSearch(input);
    fetchData(input);
    setInput("");
  }
  
  return (
    <main>
      <CloseMatch error = {error} isSearch = {isSearch} lastSearch = {lastSearch} data = {data} clicked = {clicked} formSubmit = {formSubmit} input={input} setInput = {setInput} fetchData={fetchData}/>
    </main>
  );
}

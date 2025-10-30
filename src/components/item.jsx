import React from "react";
import DataCard from "./DataCard"
import ImageCard from "./ImageCard"
import closeMatch from "./closeMatch";

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


  function fetchData(name) {
    setData(null)
    setError(null)
    setClicked(true)
    let endpoint;
 

    if (name) {
      name = name.toLowerCase();
      endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`;
    } 
    
    else {
      const randomNum = Math.floor(Math.random() * 1100) + 1;
      endpoint = `https://pokeapi.co/api/v2/pokemon/${randomNum}`;
    }
    
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => setError(error));
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
      <closeMatch >
      <form onSubmit={(event) => {formSubmit(event)}}>
        <label>Enter a name to search: 
          <input type="text" value={input} 
            onChange={(event) => setInput(event.target.value)}
            placeholder="pikachu">
          </input>
        </label>
        <button type="submit">Search</button>
      </form>
      <button onClick={() => fetchData()}>Catch a Random Pokémon</button>
    </main>
  );
}

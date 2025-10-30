import DataCard from "./DataCard"
import ImageCard from "./ImageCard"

export default function CloseMatch({ error, isSearch, lastSearch, data, clicked, formSubmit, input, setInput, fetchData }) {
  return (
    <div className="pokemon-card">
      {error && (
        <p>
          {isSearch
            ? `${lastSearch || "That Pokémon"} could not be found.`
            : "Something went wrong, please try again."}
        </p>
      )}
      {data ? (
        <section>
          <DataCard data={data} />
          <ImageCard data={data} />
        </section>
      ) : (
        clicked && !error ? <p>loading...</p> : null
      )}

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
    </div>
  );
}
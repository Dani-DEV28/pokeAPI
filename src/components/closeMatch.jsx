export default function closeMatch(){
    return (
        <div className="pokemon-card">
                {error && (
                  <p>{isSearch
                    ? `${lastSearch || "That Pokémon"} could not be found.`
                    : "Something went wrong, please try again."}
                  </p>)}
                {data? 
                  <section>
                    <DataCard 
                      data = {data}
                    />
                    <ImageCard
                      data ={data}
                    /> 
                  </section>: (
                clicked && !error ? <p>loading...</p>: null)}
        </div>
    );
}
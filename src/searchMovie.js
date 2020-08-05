import React, {useState} from "react"
import './searchMovie.css'
import './movieCard'
import MovieCard from "./movieCard";

export default function SearchMovie(){
    const[query, setQuery] = useState('');
    /*
    we define the initial value of state, i.e the defaul value, 
    Here it is the empty string
    first is variable query(actual state) and second is method setQuery it updates the present state
    */
   /*
   create the state for movies and update that state when appropriate
   movies is an array so we start with empty arrays initially
   What will be the original property of Movie
   */
    const[movies, setMovies] = useState([]);

  
    const searchMovies = async(e) => {
        e.preventDefault();
        console.log("submitting");
        //const query = "Jurassic Park";
        const url = `https://api.themoviedb.org/3/search/movie?api_key=7caf1bfa1a3ed22668a13a5f89c9812a&language=en-US&query=${query}&page=1&include_adult=false`;
        //fetch with the url you are making reqeust to, a get reuqest
        //you can get the response 
        //you can await the promise and finish and come back
        try{
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.results);
        setMovies(data.results);
        }
        catch(err){
            console.log(err);

        }
        
    }
    return(
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"value = {query}
                    placeholder="i.e. Jurassic Park" onChange={(e)=>
                        setQuery(e.target.value)
                    }/>
                <button className="button" type="submit">Search</button>
            </form>
            <div className = "card--list">
            {movies.filter(movie => movie.poster_path).map(movie=> (
                <MovieCard movie={movie} key = {movie.id}/>

            ))}
            </div>
            
            </>

    )
}

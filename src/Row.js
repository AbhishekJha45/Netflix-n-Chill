import React, { useState, useEffect } from 'react'
import YouTube from "react-youtube";
import MovieTrailer from "movie-trailer"
import axios from './axios'
import './Row.css'
  
function Row({ fetchURL, title, isLargeRow = false }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    const [playing] = useState(false)
    const base_url = "https://api.themoviedb.org/3";
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(base_url+fetchURL)
            setMovies(res.data.results)
            return res
        }
        fetchData()
    }, [fetchURL])
    console.log(movies)

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
         
          autoplay: 1,
        },
      };
    
      const handleClick = (movie) =>{
          if(trailerUrl){
              setTrailerUrl("")
          }else{
              MovieTrailer(movie?.name || movie.original_name || movie.title || "")
              .then(url => {
                console.log(movie.name);
                const urlParams = new URLSearchParams(new URL(url).search)
                console.log("url is "+urlParams);
                setTrailerUrl(urlParams.get('v'));
              })
              .catch(error => console.log(error))
          }
          console.log("after: playing: "+playing + "  , url: "+trailerUrl);
    
      }
    return(
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    ((isLargeRow && movie.poster_path) ||
                    (!isLargeRow && movie.backdrop_path)) && (
                        <img
                            key={movie.id}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`https://image.tmdb.org/t/p/w500/${
                                isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`}
                            alt={movie.name}
                            onClick={()=>handleClick(movie)}
                        />
                    )
                ))}
            </div>
            {trailerUrl?<YouTube videoId={trailerUrl} opts={opts} /> : "" }
        </div>
    )
}

export default Row
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getMovieFavourites, getMovies } from '../services/movies'
import { useLocation } from "react-router-dom"
import "../Styles/MovieInfo.css"

function MovieInfo() {

  let params = useParams();
  let movieName = params.MovieName
  const location = useLocation()
  const tabName = location.state?.tab
  const [movieData, setMovieData]= useState<any[]>([])

  const fetchMovieDetails = async (movieName: any) => {
    try{
        const movie = await getMovies(tabName, movieName);
        setMovieData(movie)
    }
    catch(error:any){
        console.error(error);
    }
  }
  useEffect(()=>{
    fetchMovieDetails(movieName)
  },[]);


  return(
    <>
    {
    movieData.map((movie) => {
      return (
        <div>
          <div className="column">
            <img src={movie.posterurl} alt="movieimage"></img>
          </div>
          <div className="column"> 
            <h1>{movie.title}({movie.year})</h1>
            <p>IMDB rating             {movie.imdbRating}</p>
            <p>Content rating          {movie.contentRating}</p>
            <p>Average rating          {movie.averageRating}</p>
            <p>Duration                   {movie.duration}</p>
            <p>Genres                     {movie.genres.map((genre: any) => { let r = (genre + ","); return r})}</p>
            <p>Actors                      {movie.actors.map((actor: any) => { let r = (actor + ","); return r})}</p>
            <p>Release Date           {movie.releaseDate}</p>
            <p>Story Line                 {movie.storyline}</p>
          </div>
        </div>
      )
  })}
  </>)
}
export default MovieInfo
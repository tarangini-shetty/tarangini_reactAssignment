import React, { Fragment, useEffect, useState } from 'react'
import {getMoviesFromServer, addMovieToFavouritesInServer} from '../services/movies'
import "../Styles/MovieList.css"
// import AddToFavourites from "./AddToFavourites"
import "../Styles/AddFavourites.css"
import { useLocation } from "react-router-dom"

function Movies() {
    const location = useLocation()
    const tabName = location.state.tab
    // console.log(tabName)
    const [moviesData, setMoviesData]= useState<any[]>([])
    
    console.log(tabName)
    const fetchMovies = async () => {
        try{
            const movies = await getMoviesFromServer(tabName);
            console.log(movies);
            setMoviesData(movies)
        }
        catch(error:any){
            console.error(error);
        }
    }

    const addMovieToFavourites = async (movie: any) =>{
        // let movieObj = JSON.parse(movie);
        delete movie.id
        await addMovieToFavouritesInServer(movie);
    }

    const imageClick = async (movie: any) => {

    }


    useEffect(()=>{
        fetchMovies()
    },[tabName]);


    return (
        <div className="row">
        {
            moviesData.map((movie) => {
                return(
                    <div className="col" >
                        <img src={movie.posterurl} to={''} alt='movie'></img> 
                        <p>{movie.title}</p>
                        {/* <AddToFavourites onclick={addMovieToFavourites(movie)} /> */}
                        <button className="Favourites" onClick={() => addMovieToFavourites(movie)}>Add to Favourites</button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                    </div>
                )
        
            })
        }
        </div>
    )
}

export default Movies
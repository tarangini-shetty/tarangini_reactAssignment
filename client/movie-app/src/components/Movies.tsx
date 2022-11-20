import React, { Fragment, useEffect, useState } from 'react'
import {getMoviesFromServer, addMovieToFavouritesInServer, removeMovieFromFavouritesInServer, getMovieFavourites} from '../services/movies'
import "../Styles/MovieList.css"
import "../Styles/AddFavourites.css"
import { useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast} from 'react-toastify';

const Movies = (searchValue: any ) => {
    const toastId = React.useRef(1);
    const location = useLocation()
    const tabName = location.state?.tab
    const navigate = useNavigate();
    const searchText = searchValue.searchValue
    console.log(tabName)
    const [moviesData, setMoviesData]= useState<any[]>([])
    console.log(searchValue.searchValue)

    const fetchMovies = async () => {
        try{
            console.log("1")
            const movies = await getMoviesFromServer(tabName, searchText);
            console.log(movies)
            setMoviesData(movies)
        }
        catch(error:any){
            console.error(error);
        }
    }

    const addMovieToFavourites = async (movie: any) =>{
        // let movieObj = JSON.parse(movie);
        let favorites = await getMovieFavourites();
        let resp = 0
        let movieAlreadyexists = false
        delete movie.id

        if (favorites)
        {
            favorites.map(function(favoriteMovie: { title: any }) {
                if (favoriteMovie.title === movie.title)
                {
                    toast.error('Error adding movie to favourites!', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose:2000,
                    });
                    movieAlreadyexists = true
                }
            });
            if (!movieAlreadyexists){
                resp = await addMovieToFavouritesInServer(movie);
            }
        
        }
        else{
            movie['id'] = 1
            resp = await addMovieToFavouritesInServer(movie);
        }
        if (resp === 201){
            toast.success('Successfully added movie to favourites!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose:2000,
            });
        }
        else{
            console.log(resp)
        }
    }

    const removeMovieFromFavourites = async (movie: any) =>{
        let movieDetails = await getMovieFavourites(movie.title);
        let resp = await removeMovieFromFavouritesInServer(movieDetails[0].id);
        console.log(resp)
        if (resp === 200){
             toast.success('Removed movie from favourites!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose:2000,
            });
            console.log("inside")
            
        }
        fetchMovies()
        
    }

    const imageClick = async (movie: any) => {
        
        let url = '/' + movie.title
        navigate(url, {state: { tab: tabName }});
    }


    useEffect(()=>{
        fetchMovies()
    },[tabName, searchText]);


    return (
        <div className="row">
        {
            moviesData.map((movie) => {
                return(
                    <div className="col" >
                        <img src={movie.posterurl} onClick={() => imageClick(movie)} alt='movie'></img> 
                        <p>{movie.title}</p>
                        {(() => {
                            if (tabName == "favourit") {
                                return (
                                    <><button className="Favourites" onClick={() => removeMovieFromFavourites(movie)}>Remove from Favourites</button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                    </svg></>

                                )
                            } 
                            else {
                                return (
                                    <><button className="Favourites" onClick={() => addMovieToFavourites(movie)}>Add to Favourites</button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                    </svg></>

                                )
                            }
                        })()}
                    </div>
                )
        
            })
        }
        <ToastContainer />
        </div>
        
    );
    
}

export default Movies


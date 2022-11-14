import axios from "axios"

export const getMoviesFromServer = async(movieListType : string) => {
    const Api = "http://localhost:4001/" + movieListType
    return await axios.get(Api).then(res => res.data)
}

export const addMovieToFavouritesInServer = (movie: any) => {
    return axios.post(
        `http://localhost:4001/favourit`,
        movie,
        {
            headers:{
                'Content-Type': 'application/json'
            }
        }
    ).then( response => response.data )
}



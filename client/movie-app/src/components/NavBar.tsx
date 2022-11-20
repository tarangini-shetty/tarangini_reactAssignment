import React, {Fragment, useState} from 'react'
import {HiSearch} from 'react-icons/hi'
import "../Styles/NavBarStyles.css"
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import Movies from './Movies'
import MovieInfo from './MovieInfo'



function NavBar(){
    const [search, setSearch]= useState("");
    return (
        <Fragment>
            <Router>
            <nav className="navigate-tabs">
                <div className='nav-options'>
                    <Link to={''} state= {{ tab: "movies-in-theaters" }} >
                    <span> Movies in Theater</span>
                    </Link>
                    <Link to={''} state= {{ tab: "movies-coming" }} >
                    <span> Coming Soon</span>
                    </Link>
                    <Link to={''} state= {{ tab: "top-rated-india" }} >
                    <span> Top rated Indian</span>
                    </Link>
                    <Link to={''} state= {{ tab: "top-rated-movies" }} >
                    <span> Top rated </span>
                    </Link>
                    <Link to={''} state= {{ tab: "favourit" }} >
                    <span> Favourites </span>
                    </Link>
                </div>
                <div className='input-group'>
                    <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
                    <HiSearch color='green'/>
                </div>
            </nav>
            
                <Routes>
                        <Route path="" element={<Movies searchValue={search} />} />
                        <Route path="/:MovieName" element={<MovieInfo />} />
                </Routes>
            </Router>
        </Fragment>
    );
}

export default NavBar
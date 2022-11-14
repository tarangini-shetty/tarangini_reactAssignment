import React, {Fragment} from 'react'
import {HiSearch} from 'react-icons/hi'
import "../Styles/NavBarStyles.css"
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import Movies from './Movies'


function NavBar(){
    return (
        <Fragment>
            <Router>
            <nav className="">
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
                    {/* <NavLink to='ComingSoon' >
                    <span> Coming Soon</span>
                    </NavLink> */}
                    {/* <NavLink to='TopRatedIndian' >
                    <span> Top rated Indian</span>
                    </NavLink> */}
                    {/* <NavLink to='TopRated' >
                    <span> Top rated </span>
                    </NavLink> */}
                    {/* <NavLink to='Favourites' style={(isActive) => {return {color:isActive ? '#ff206e' : '#054ca9'}}}>
                    <span> Favourites </span>
                    </NavLink> */}
                </div>
                <div className='input-group'>
                <input type="text" placeholder="Search" />
                <HiSearch color='green'/>
                </div>
            </nav>
            
                <Routes>
                        <Route path='' element={<Movies />}/>
                        <Route path="/:MovieName" element={<movieDetails />} />
                </Routes>
            </Router>
        </Fragment>
      );
}

export default NavBar
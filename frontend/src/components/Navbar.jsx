import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Navbar({loginStatus, setLoginStatus}) {
  const handleLogout = async () => {
    const response = await axios.post('/sign_out/')
    if (response.data.signout === true) {
      setLoginStatus(false)
      window.location.reload()
      window.location.href='/signin'
      
    }
  }
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            nunch
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav me-auto">
              {loginStatus ? (
                <>
                <li class="nav-item">
                <Link to='/' class="nav-link" >
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link to='/cookbooks/' class="nav-link" >
                  cookbooks
                </Link>
              </li>
              <li class="nav-item">
                <Link to='/browse/' class="nav-link" >
                  inspiration
                </Link>
              </li>
              
              
                <li class="nav-item">
                <Link to='/' class="nav-link" onClick={handleLogout}>Logout</Link>
              </li>
              </>
              ) : (
                <>
                <li class="nav-item">
                <Link to='/signin' class="nav-link" >Login</Link>
              </li>
                </>
              )}
              
              
              
            </ul>
          </div>
        </div>
      </nav>
      
    </div>
  );
}

export default Navbar;

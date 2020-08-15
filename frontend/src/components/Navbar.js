import React from 'react'
import {Link} from 'react-router-dom'

export const Navbar = () => (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to="/">Panel</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul className="navbar-nav">
        <li className="nav-item">
        <Link className="nav-link active" to="/about">About <span className="sr-only">(current)</span></Link>
        </li>
      </ul>
    </div>
  </nav>
)
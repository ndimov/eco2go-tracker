import React from 'react'
import { Link } from 'react-router-dom'
import './main.css'

function Header() {
  return (
    <header>
      <p>Eco2Go Tracker</p>
      <nav>
        <Link to="/input">Input Panel</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
    </header>
  );
}

export default Header;

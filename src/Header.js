import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core'
import './main.css'

function Header() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Button component={Link} to={"/"} color="inherit"><Typography variant="h6">Eco2Go Tracker</Typography></Button>
        <Box m={2} />
        <Button component={Link} to={"/input"} color="inherit">Input Panel</Button>
        <Button component={Link} to={"/leaderboard"} color="inherit">Leaderboard</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

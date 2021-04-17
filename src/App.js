import React from 'react'
import Header from './Header'
import InputPanel from './InputPanel'
import Leaderboard from './Leaderboard'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/input">
              <InputPanel class="center" />
            </Route>
            <Route path="/leaderboard">
              <Leaderboard class="center" />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
import React from 'react'
import Header from './Header'
import InputPanel from './InputPanel'
import Leaderboard from './Leaderboard'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="container">
        <InputPanel class="center" />
        <Leaderboard class="center" />
      </div>
    </ThemeProvider>
  );
}

export default App;
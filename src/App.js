import {Provider as MobxProvider} from 'mobx-react'
import React from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import ScrollToTop from './components/ScrollToTop'
import './App.css'
import NavBarr from './components/Navbarr'
import partyStore from './mobx/party'
import themeStore from './mobx/theme'
import Dex from './pages/Dex'
import Party from './pages/Party'

function App() {
  return (
    <MobxProvider partyStore={partyStore}>
      <ThemeProvider theme={themeStore}>
        <BrowserRouter>
          <ScrollToTop />
          <NavBarr />
          <Switch>
            <Route exact path="/" component={Dex} />
            <Route exact path="/party" component={Party} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </MobxProvider>
  )
}

export default App

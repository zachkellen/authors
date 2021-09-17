import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom';
import AllAuthors from './views/AllAuthors';
import Create from './views/Create';
import Edit from './views/Edit';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <h1>Favorite Authors</h1>
        </div>

        <Switch>
          <Route exact path="/">
            <AllAuthors/>
          </Route>

          <Route exact path="/authors/create">
            <Create/>
          </Route>

          <Route exact path="/authors/:_id">
            <Edit/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

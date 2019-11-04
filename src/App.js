import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import UserList from './components/userList/userList.js'
import HandleUser from './components/handleUser/handleUser'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={UserList} exact/>
          <Route path={'/users/:id/'} component={HandleUser} />
          <Route path={'/adduser'} component={HandleUser} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import './App.css';
import "react-router";
import { Link, BrowserRouter, Route } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import ActivityForm from './components/ActivityForm';
import EditActivity from './components/EditActivity';
import ReviewActivity from './components/ReviewActivity';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Activity Reviews</h1>
        <BrowserRouter>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/activity/new">New Activity</Link></li>
          </ul>
          <Route exact path="/" component={DashBoard} />
          <Route path="/activity/new" component={ActivityForm} />
          <Route path="/activity/:_id/edit" component={EditActivity} />
          <Route path="/activity/:_id/review" component={ReviewActivity} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

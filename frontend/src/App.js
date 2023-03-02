// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';
import { MdDirectionsRun } from 'react-icons/md';

// Import Pages
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';

// Define the function that renders the content in routes using State.
function App() {

  const [exercise, setExercise] = useState([]);

  return (
    <>
      <Router>

        <header>
          <h1>EXERCISE TRACKER <MdDirectionsRun className="runner" /></h1>
          <p>Track exercises and review progress!</p>
        </header>

        <Navigation />

        <main>
          <Route path="/" exact>
            <HomePage setExercise={setExercise} />
          </Route>

          <Route path="/create-exercise">
            <CreateExercisePage />
          </Route>

          <Route path="/edit-exercise">
            <EditExercisePage exercise={exercise} />
          </Route>
        </main>

        <footer>
          <p><cite>&copy; 2022 Tina Kuran</cite></p>
        </footer>

      </Router>
    </>
  );
}

export default App;
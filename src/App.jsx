/**
 * App.jsx
 * Main app component file.
 */

// Node Modules
import {useEffect, useState} from 'react';

// Constants
const MIN_LEVELS = 1;
const MAX_LEVELS = 10;

import SAMPLE_DATA from '../sample_data.json';

export default function App() {
  // Hooks
  const [busNumbersSet, setBusNumbersSet] = useState(new Set([]));
  const [levels, setLevels] = useState(MIN_LEVELS);
  const [busNumber, setBusNumber] = useState('');

  useEffect(() => {
    // Maps through list of buses sample data to create set of bus numbers.
    // Also assumes all bus numbers are intended to be unique.
    setBusNumbersSet(SAMPLE_DATA.buses.map((bus) => bus.number));
  }, []);

  // JSX
  const busNumbersDatalistJSX = [...busNumbersSet].map((busNumber) => (
    <option key={busNumber} value={busNumber} />
  ));

  return (
    <div>
      <h1>Rough Graph</h1>
      <fieldset>
        <legend>Bus Number</legend>
        <input
          list="data"
          onChange={(e) => setBusNumber(e.target.value)}
          placeholder="Select Bus Number"
          type="text"
          value={busNumber}
        />
        <datalist id="data">
          {busNumbersDatalistJSX}
        </datalist>
      </fieldset>
      <fieldset>
        <legend>Levels</legend>
        <input
          min={MIN_LEVELS}
          max={MAX_LEVELS}
          name="levels"
          onChange={(e) => setLevels(e.target.value)}
          type="number"
          value={levels}
        />
      </fieldset>
    </div>
  );
}

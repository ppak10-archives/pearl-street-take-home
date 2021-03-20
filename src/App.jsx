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

// Utils
import {Edge} from './utils';

export default function App() {
  // Hooks
  const [busNumbersSet, setBusNumbersSet] = useState(new Set([]));
  const [edgeMap, setEdgeMap] = useState(new Map());
  const [levels, setLevels] = useState(MIN_LEVELS);
  const [busNumber, setBusNumber] = useState('');

  useEffect(() => {
    // Maps through list of buses sample data to create set of bus numbers.
    // Also assumes all bus numbers are intended to be unique.
    setBusNumbersSet(SAMPLE_DATA.buses.map((bus) => bus.number));
  }, []);

  console.log('SAMPLE DATA', SAMPLE_DATA);
  console.log('edge map', edgeMap);

  useEffect(() => {
    const edge = new Edge(SAMPLE_DATA);
    edge.createMap();
    setEdgeMap(edge.map);
  }, []);

  // JSX
  const busNumbersDatalistJSX = Array.from(busNumbersSet).map((busNumber) => (
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

/**
 * App.jsx
 * Main app component file.
 */

// Node Modules
import {useContext, useEffect, useState} from 'react';

// Actions
import {setBusNumbersSet, setEdgeMap, setLevels} from './actions';

// Config
import {MAX_LEVELS, MIN_LEVELS} from './config';

// Constants
import SAMPLE_DATA from '../sample_data.json';

// Context
import Context from './context';

// Utils
import {Edge} from './utils';

export default function App() {
  // Hooks
  const {state, dispatch} = useContext(Context);
  const [busNumber, setBusNumber] = useState('');

  useEffect(() => {
    // Maps through list of buses sample data to create set of bus numbers.
    // Also assumes all bus numbers are intended to be unique.
    dispatch(setBusNumbersSet(SAMPLE_DATA.buses.map((bus) => bus.number)));
  }, [dispatch]);

  console.log('SAMPLE DATA', SAMPLE_DATA);
  console.log('edge map', state.edgeMap);

  useEffect(() => {
    const edge = new Edge(SAMPLE_DATA);
    edge.createMap();
    dispatch(setEdgeMap(edge.map));
  }, [dispatch]);

  // Callbacks
  const handleLevelChange = (e) => {
    dispatch(setLevels(e.target.value));
  };

  // JSX
  const busNumbersDatalistJSX = Array.from(state.busNumbersSet)
    .map((busNumber) => (
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
          onChange={handleLevelChange}
          type="number"
          value={state.levels}
        />
      </fieldset>
    </div>
  );
}

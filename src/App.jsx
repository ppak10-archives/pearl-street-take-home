/**
 * App.jsx
 * Main app component file.
 */

// Node Modules
import {useContext, useEffect, useState} from 'react';

// Actions
import {setBusNumbersSet, setEdgeMap, setLevels} from './actions';

// Config
import {MAX_LEVELS, MIN_LEVELS, INITIAL_VIEW_TYPE} from './config';

// Constants
import SAMPLE_DATA from '../sample_data.json';
import APP from './constants.json';

// Components
import List from './List';

// Context
import Context from './context';

// Utils
import {Edge} from './utils';

export default function App() {
  // Hooks
  const {state, dispatch} = useContext(Context);
  const [busNumber, setBusNumber] = useState('');
  const [viewType, setViewType] = useState(INITIAL_VIEW_TYPE);

  useEffect(() => {
    // Maps through list of buses sample data to create set of bus numbers.
    // Also assumes all bus numbers are intended to be unique.
    dispatch(setBusNumbersSet(SAMPLE_DATA.buses.map((bus) => bus.number)));
  }, [dispatch]);

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

  const listNodesJSX = viewType === 'LIST' && (
    <ul>
      <List busNumber={busNumber ? parseInt(busNumber) : undefined} />
    </ul>
  );

  return (
    <div>
      <h1>{APP.VIEW_TYPE[viewType].title}</h1>
      <div>
        <button
          disabled={'LIST' === viewType}
          onClick={() => setViewType('LIST')}
        >
          List
        </button>
        <button
          disabled={'GRAPH' === viewType}
          onClick={() => setViewType('GRAPH')}
        >
          Graph
        </button>
      </div>
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
          onChange={handleLevelChange}
          type="number"
          value={state.levels}
        />
        <input
          min={MIN_LEVELS}
          max={MAX_LEVELS}
          onChange={handleLevelChange}
          type="range"
          value={state.levels}
        />
      </fieldset>
      {listNodesJSX}
    </div>
  );
}

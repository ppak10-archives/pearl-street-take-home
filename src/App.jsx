/**
 * App.jsx
 * Main app component file.
 */

// Node Modules
import {useContext, useEffect} from 'react';

// Actions
import {setBusNumbersSet, setEdgeMap} from './actions';

// Constants
import SAMPLE_DATA from '../sample_data.json';

// Components
import List from './List';
import Navbar from './Navbar';
import Graph from './Graph';

// Context
import Context from './context';

// Utils
import {Edge} from './utils';

export default function App() {
  // Hooks
  const {state, dispatch} = useContext(Context);

  useEffect(() => {
    // Maps through list of buses sample data to create set of bus numbers.
    // Also assumes all bus numbers are intended to be unique.
    dispatch(
      setBusNumbersSet(new Set(SAMPLE_DATA.buses.map((bus) => bus.number)))
    );
  }, [dispatch]);

  useEffect(() => {
    const edge = new Edge(SAMPLE_DATA);
    edge.createMap();
    dispatch(setEdgeMap(edge.map));
  }, [dispatch]);

  // JSX
  const listNodesJSX = state.busNumber ? (
    <ul>
      <List busNumber={state.busNumber} />
    </ul>
  ) : (
    <p>Please select a Bus Number.</p>
  );

  return (
    <>
      <Navbar />
      {state.viewType === 'LIST' && listNodesJSX}
      {state.viewType === 'GRAPH' && <Graph />}
    </>
  );
}

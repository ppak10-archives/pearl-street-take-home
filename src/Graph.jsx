/**
 * Graph.jsx
 * Graph component display bus number and connections.
 */

// Node Modules
import {useContext, useEffect, useState} from 'react';
import {number} from 'prop-types';

// Context
import Context from './context';

export default function Graph({busNumber, level}) {
  // Hooks
  const {state} = useContext(Context);
  const [busNumbers, setBusNumbers] = useState([]);

  useEffect(() => {
    const busNumbersSet = state.edgeMap.get(busNumber);
    if (busNumbersSet) {
      setBusNumbers(Array.from(busNumbersSet));
    } else {
      setBusNumbers([]);
    }
  }, [busNumber, state.edgeMap]);

  // JSX
  const graphNodesJSX = level < state.levels && busNumbers.map((number) => (
    <Graph key={`${number}-${level}`} busNumber={number} level={level + 1} />
  ));

  return (
    <>
      <li>{busNumber}</li>
      <ul>
        {graphNodesJSX}
      </ul>
    </>
  );
}

Graph.defaultProps = {
  level: 0,
};

Graph.propTypes = {
  busNumber: number,
  level: number,
};

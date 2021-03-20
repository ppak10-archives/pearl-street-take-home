/**
 * List.jsx
 * List component to display bus number and children.
 */

// Node Modules
import {useContext, useEffect, useState} from 'react';
import {number} from 'prop-types';

// Context
import Context from './context';

export default function List({busNumber, level, parentBusNumber}) {
  // Hooks
  const {state} = useContext(Context);
  const [busNumbers, setBusNumbers] = useState([]);

  useEffect(() => {
    const busNumbersSet = state.edgeMap.get(busNumber);
    if (busNumbersSet) {
      setBusNumbers(
        // Filters out parent bus number from bus number array.
        Array.from(busNumbersSet).filter((number) => parentBusNumber !== number)
      );
    } else {
      setBusNumbers([]);
    }
  }, [busNumber, state.edgeMap]);

  // JSX
  const listNodesJSX = level < state.levels && busNumbers.map((number) => (
    <List
      busNumber={number}
      key={`${number}-${level}`}
      level={level + 1}
      parentBusNumber={busNumber}
    />
  ));

  // Indicates non-existant bus number with strikethrough.
  const busNumberListItemJSX = state.busNumbersSet.has(busNumber) ? (
    <li>{busNumber}</li>
  ) : (
    <del>{busNumber}</del>
  );

  return (
    <>
      {busNumberListItemJSX}
      <ul>
        {listNodesJSX}
      </ul>
    </>
  );
}

List.defaultProps = {
  level: 0,
};

List.propTypes = {
  busNumber: number,
  level: number,
  parentBusNumber: number,
};

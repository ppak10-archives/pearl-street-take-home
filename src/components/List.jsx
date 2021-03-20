/**
 * List.jsx
 * List component to display bus number and children.
 */

// Node Modules
import {useContext, useEffect, useState} from 'react';
import {number, oneOfType, string} from 'prop-types';

// Context
import Context from '../context';

export default function List({busNumber, level, parentBusNumber}) {
  // Hooks
  const {state} = useContext(Context);
  const [busNumbers, setBusNumbers] = useState([]);

  useEffect(() => {
    const busNumbersSet = state.edgeMap.get(parseInt(busNumber));
    if (busNumbersSet) {
      setBusNumbers(
        // Filters out parent bus number from bus number array.
        Array.from(busNumbersSet).filter((number) => parentBusNumber !== number)
      );
    } else {
      setBusNumbers([]);
    }
  }, [busNumber, parentBusNumber, state.edgeMap]);

  // JSX
  const listNodesJSX = level < state.levels && busNumbers.map((number) => (
    <List
      busNumber={number}
      key={`${number}-${level}`}
      level={level + 1}
      parentBusNumber={parseInt(busNumber)}
    />
  ));

  // Indicates non-existant bus number with strikethrough.
  const busNumberListItemJSX = state.busNumbersSet.has(parseInt(busNumber)) ? (
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
  // busNumber field can be empty string for initially to display placeholder.
  busNumber: oneOfType([number, string]),
  level: number,
  parentBusNumber: number,
};

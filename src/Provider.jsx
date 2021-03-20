/**
 * Provider.jsx
 * Provider component for app.
 */

// Node Modules
import {arrayOf, element, oneOfType} from 'prop-types';
import {useReducer} from 'react';

// Config
import {MIN_LEVELS} from './config';

// Context
import Context from './context';

// Constants
const INITIAL_STATE = {
  busNumbersSet: new Set([]),
  edgeMap: new Map(),
  levels: MIN_LEVELS,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BUS_NUMBERS_SET':
      return {
        ...state,
        busNumbersSet: action.payload.busNumbersSet,
      };
    case 'SET_EDGE_MAP':
      return {
        ...state,
        edgeMap: action.payload.edgeMap,
      };
    case 'SET_LEVELS':
      return {
        ...state,
        levels: action.payload.levels,
      };
    default:
      return state;
  }
};

export default function Provider({children}) {
  // Hooks
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Context.Provider value={{state, dispatch}}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: oneOfType([arrayOf(element), element]).isRequired,
};

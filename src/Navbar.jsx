/**
 * Navbar.jsx
 * Navigation component to provide controls when displaying nodes.
 */

// Node Modules
import {useContext} from 'react';

// Actions
import {setBusNumber, setLevels, setViewType} from './actions';

// Config
import {MAX_LEVELS, MIN_LEVELS} from './config';

// Constants
import APP from './constants.json';

// Context
import Context from './context';

export default function Navbar() {
  // Hooks
  const {state, dispatch} = useContext(Context);

  // JSX
  const busNumbersDatalistJSX = Array.from(state.busNumbersSet)
    .map((busNumber) => (
      <option key={busNumber} value={busNumber} />
    ));

  return (
    <nav>
      <h1>{APP.VIEW_TYPE[state.viewType].title}</h1>
      <div>
        <button
          disabled={'LIST' === state.viewType}
          onClick={() => dispatch(setViewType('LIST'))}
        >
          List
        </button>
        <button
          disabled={'GRAPH' === state.viewType}
          onClick={() => dispatch(setViewType('GRAPH'))}
        >
          Graph
        </button>
      </div>
      <div className="navbar-input-fields">
        <fieldset>
          <legend>Bus Number</legend>
          <input
            list="data"
            onChange={(e) => dispatch(setBusNumber(e.target.value))}
            placeholder="Select Bus Number"
            type="text"
            value={state.busNumber}
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
            onChange={(e) => dispatch(setLevels(e.target.value))}
            type="number"
            value={state.levels}
          />
          <input
            min={MIN_LEVELS}
            max={MAX_LEVELS}
            onChange={(e) => dispatch(setLevels(e.target.value))}
            type="range"
            value={state.levels}
          />
        </fieldset>
      </div>
    </nav>
  )
}
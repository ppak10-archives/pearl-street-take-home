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
    const map = new Map();

    // Adds line values to edge map.
    SAMPLE_DATA.lines.forEach((line) => {
      const iBusNumbersSet = map.get(line.i);
      const jBusNumbersSet = map.get(line.j);

      if (iBusNumbersSet) {
        // Adds `j` value to set and sets set to map.
        iBusNumbersSet.add(line.j);
        map.set(line.i, iBusNumbersSet);
      } else {
        // Creates new set with `j` value if `i` key is not set.
        map.set(line.i, new Set([line.j]));
      }

      // Repeats process for other end of edge for fast lookup.
      if (jBusNumbersSet) {
        // Adds `i` value to set and sets set to map.
        jBusNumbersSet.add(line.i);
        map.set(line.j, jBusNumbersSet);
      } else {
        // Creates new set with `i` value if `j` key is not set.
        map.set(line.j, new Set([line.i]));
      }
    });

    // Adds transformers values to edge map.
    SAMPLE_DATA.transformers.forEach((transformer) => {
      const iBusNumbersSet = map.get(transformer.i);
      const jBusNumbersSet = map.get(transformer.j);

      if (iBusNumbersSet) {
        // Adds `j` value to set and sets set to map.
        iBusNumbersSet.add(transformer.j);
        map.set(transformer.i, iBusNumbersSet);
      } else {
        // Creates new set with `j` value if `i` key is not set.
        map.set(transformer.i, new Set([transformer.j]));
      }

      // Repeats process for other end of edge for fast lookup.
      if (jBusNumbersSet) {
        // Adds `i` value to set and sets set to map.
        jBusNumbersSet.add(transformer.i);
        map.set(transformer.j, jBusNumbersSet);
      } else {
        // Creates new set with `i` value if `j` key is not set.
        map.set(transformer.j, new Set([transformer.i]));
      }

      // Applies additional edge values if k value is not `0`.
      if (transformer.k) {
        [transformer.i, transformer.j].forEach((x) => {
          const kBusNumbersSet = map.get(transformer.k);
          const xBusNumbersSet = map.get(x)

          if (kBusNumbersSet) {
            // Adds `x` value to set and sets set to map.
            kBusNumbersSet.add(x);
            map.set(transformer.k, kBusNumbersSet);
          } else {
            // Creates new set with `j` value if `i` key is not set.
            map.set(transformer.k, new Set([x]));
          }

          // Repeats process for other end of edge for fast lookup.
          if (xBusNumbersSet) {
            // Adds `k` value to set and sets set to map.
            xBusNumbersSet.add(transformer.k);
            map.set(x, xBusNumbersSet);
          } else {
            // Creates new set with `k` value if `x` key is not set.
            map.set(x, new Set([transformer.k]));
          }
        });
      }
    });

    setEdgeMap(map);
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

/**
 * utils.test.js
 * Tests for utils function.
 */

// Constants
import SAMPLE_DATA from '../sample_data.json';

// Utils
import {Edge} from '../src/utils';

describe('Tests createEdgeMap() function', () => {
  const edge = new Edge(SAMPLE_DATA);
  edge.createMap();

  test('Verifies endpoints for each edge', () => {
    for (let busNumbersSet of edge.map.values()) {
      // Ensures that there are no empty sets in map.
      expect(busNumbersSet.size).toBeGreaterThan(0);
    }
  });

  test('Verifies that endpoint has specified bus number', () => {
    for (let [key, busNumberSet] of edge.map.entries()) {
      for (let busNumber of busNumberSet.values()) {
        // Ensures that the other edge has the specified key.
        expect(edge.map.get(busNumber).has(key)).toBe(true)
      }
    }
  })
});

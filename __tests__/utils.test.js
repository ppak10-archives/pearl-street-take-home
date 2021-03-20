/**
 * utils.test.js
 * Tests for utils function.
 */

// Constants
import SAMPLE_DATA from '../sample_data.json';

// Utils
import {createEdgeMap} from '../src/utils';

describe('create edge map', () => {
  const map = createEdgeMap(SAMPLE_DATA);

  test('Verifies endpoints for each edge', () => {
    for (let busNumbersSet of map.values()) {
      // Ensures that there are no empty sets in map.
      expect(busNumbersSet.size).toBeGreaterThan(0);
    }
  });
});

/**
 * utils.js
 * Utility functions used within components.
 */

/**
 * @description Creates map for edges utilizing provided lines and transformers.
 */
export class Edge {
  constructor(sampleData) {
    this.sampleData = sampleData;
    this.map = new Map();
  }

  updateBusNumbersSet(x, y) {
    // Retreives set for bus numbers or creates new set if it doesn't exist.
    const xBusNumbersSet = this.map.get(x) || new Set([y]);
    const yBusNumbersSet = this.map.get(y) || new Set([x]);

    if (xBusNumbersSet) {
      // Adds `y` value to xBusNumberSet and sets this to map with key `x`.
      xBusNumbersSet.add(y);
    }

    this.map.set(x, xBusNumbersSet);

    // Repeats process for other end of edge for fast lookup.
    if (yBusNumbersSet) {
      // Adds `x` value to yBusNumberSet and sets this to map with key `y`.
      yBusNumbersSet.add(x);
    }

    this.map.set(y, yBusNumbersSet);
  }

  createMap() {
    // Adds line values to edge map.
    this.sampleData.lines.forEach((line) => {
      // Handles cases for `i-j` and `j-i`.
      this.updateBusNumbersSet(line.i, line.j);
    });

    // Adds transformers values to edge map.
    this.sampleData.transformers.forEach((transformer) => {
      // Handles cases for `i-j` and `j-i`.
      this.updateBusNumbersSet(transformer.i, transformer.j);

      // Applies additional edge values if k value is not `0`.
      if (transformer.k) {
        [transformer.i, transformer.j].forEach((x) => {
          // Handles cases for `i-k` & `k-i` and `j-k` & `k-j`.
          this.updateBusNumbersSet(x, transformer.k);
        });
      }
    });
  }
}

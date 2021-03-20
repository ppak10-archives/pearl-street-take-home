/**
 * utils.js
 * Utility functions used within components.
 */

export function createEdgeMap(sampleData) {
  const map = new Map();

  // Adds line values to edge map.
  sampleData.lines.forEach((line) => {
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
  sampleData.transformers.forEach((transformer) => {
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

  return map;
}

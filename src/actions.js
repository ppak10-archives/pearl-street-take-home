/**
 * actions.js
 * Actions for react context.
 */

export const setBusNumbersSet = (busNumbersSet) => ({
  type: 'SET_BUS_NUMBERS_SET',
  payload: {
    busNumbersSet,
  },
});

export const setEdgeMap = (edgeMap) => ({
  type: 'SET_EDGE_MAP',
  payload: {
    edgeMap,
  },
});

export const setLevels = (levels) => ({
  type: 'SET_LEVELS',
  payload: {
    levels,
  },
});

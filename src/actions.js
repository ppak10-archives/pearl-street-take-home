/**
 * actions.js
 * Actions for react context.
 */

export const setBusNumber = (busNumber) => ({
  type: 'SET_BUS_NUMBER',
  payload: {
    busNumber: parseInt(busNumber),
  },
});

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

export const setViewType = (viewType) => ({
  type: 'SET_VIEW_TYPE',
  payload: {
    viewType,
  },
});

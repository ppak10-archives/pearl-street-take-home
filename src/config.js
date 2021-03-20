/**
 * config.js
 * Configurations for react app.
 */

// Navbar
// Initial view type
export const INITIAL_VIEW_TYPE = 'GRAPH';

// Limits maximum levels for performance reasons.
export const MAX_LEVELS = 5;
export const MIN_LEVELS = 1;


// Graph
// Angle modifier to make small changes to rendered node.
export const ANGLE_MOD = 0.25;

// Size of bus circle.
export const CIRCLE_RADIUS = 25;

// Offset of the canvas text as it is anchored top-left.
export const FILL_TEXT_OFFSET = 10;

// Polar radius used when generating node from center.
export const LEVEL_RADIUS = 150;

// Width of edge line.
export const LINE_WIDTH = 2.5;

// List
// Displays relations for parent bus number.
// (Including parent bus values clutters the list but is useful for debugging.)
export const DISPLAY_PARENT = true;

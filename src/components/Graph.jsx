/**
 * Graph.jsx
 * Graph component to display bus and edges.
 */

// Node Modules
import {useContext, useEffect, useRef, useState} from 'react';

// Constants
const ANGLE_MOD = 0.25;
const CIRCLE_RADIUS = 25;
const LEVEL_RADIUS = 150;
const LINE_WIDTH = 2.5;
const FILL_TEXT_OFFSET = 10;
const TWO_PI = 2 * Math.PI

// Context
import Context from '../context';

export default function Graph() {
  // Hooks
  const {state} = useContext(Context);
  const ref = useRef();
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);

  useEffect(() => {
    // Updates height and width of canvas element to bounding client rectangle.
    const current = ref.current;
    if (current) {
      const {height, width} = current.getBoundingClientRect();
      setHeight(height);
      setWidth(width);
    }
  }, []);

  useEffect(() => {
    const current = ref.current;

    if (current) {
      // Creates blank layout for canvas.
      const centerX = width / 2;
      const centerY = height / 2;
      const ctx = current.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      const nodeMap = new Map();

      const handleDrawCircle = (x, y, busNumber) => {
        ctx.beginPath();
        ctx.arc(x, y, CIRCLE_RADIUS, 0, TWO_PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = LINE_WIDTH;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        ctx.fillStyle = 'white'
        ctx.fillText(busNumber, x - FILL_TEXT_OFFSET, y);
      };

      const handleDrawEdge = (startCoordinates, endCoordinates) => {
        ctx.beginPath();
        ctx.moveTo(startCoordinates.x, startCoordinates.y);
        ctx.lineTo(endCoordinates.x, endCoordinates.y);
        ctx.lineWidth = LINE_WIDTH;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
      };

      const handleCreateNodes = (busNumber, level = 0, parentIndex = 0) => {
        const busNumbersSet = state.edgeMap.get(parseInt(busNumber));

        if (level < state.levels && busNumbersSet) {
          Array.from(busNumbersSet).forEach((number, index) => {
            // Determines angle in radians for graph node.
            const angle = TWO_PI * (index + 1) / busNumbersSet.size;

            // Adjust the angle of the graph node depending on current level and
            // parentIndex values in order to prevent two nodes from being
            // rendered directly on top of each other.
            const adjustedAngle = angle + (level + parentIndex) * ANGLE_MOD;

            // Implements positions using polar coordinates and converts to
            // cartesian.
            let coordinates = {
              x: centerX + Math.cos(adjustedAngle) * LEVEL_RADIUS * (level + 1),
              y: centerY + Math.sin(adjustedAngle) * LEVEL_RADIUS * (level + 1),
            };

            if (!nodeMap.has(parseInt(number))) {
              // If node map does not have current bus number, it adds it to the
              // set with calculated coordinates.
              nodeMap.set(parseInt(number), coordinates);
            } else {
              // If node map already has the  current bus number, it uses the
              // values that were already stored in map.
              coordinates = nodeMap.get(parseInt(number));
            }

            // Draws the edge connection between the two nodes.
            handleDrawEdge(nodeMap.get(parseInt(busNumber)), coordinates);

            // Recursively creates related nodes.
            // Passes current index down for parent index argument.
            // (Intended to prevent nodes form overlapping.)
            handleCreateNodes(number, level + 1, index);
          });
        }
      };

      if (state.busNumber) {
        // Sets bus number and coordinates to node map.
        nodeMap.set(parseInt(state.busNumber), {x: centerX, y: centerY});

        // Creates nodes for edge endpoints.
        handleCreateNodes(state.busNumber);

        // Draws circles last to draw over edges.
        for (let [number, {x, y}] of nodeMap.entries()) {
          handleDrawCircle(x, y, number);
        }
      }
    } 
  }, [height, width, state.busNumber, state.edgeMap, state.levels]);

  return (
    <canvas ref={ref} height={height} width={width} />
  );
}

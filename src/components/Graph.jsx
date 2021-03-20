/**
 * Graph.jsx
 * Graph component to display bus and edges.
 */

// Node Modules
import {useContext, useCallback, useEffect, useRef, useState} from 'react';

// Constants
const CIRCLE_RADIUS = 25;
const LEVEL_RADIUS = 100;
const LINE_WIDTH = 5;
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

  const handleCreateCircle = useCallback((ctx, x, y, busNumber) => {
    ctx.beginPath();
    ctx.arc(x, y, CIRCLE_RADIUS, 0, TWO_PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = LINE_WIDTH;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.fillStyle = 'black'
    ctx.fillText(busNumber, x - FILL_TEXT_OFFSET, y);
  }, []);

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
    if (current && state.busNumber) {
      const ctx = current.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      handleCreateCircle(ctx, centerX, centerY, state.busNumber);

      const busNumbersSet = state.edgeMap.get(parseInt(state.busNumber));

      if (busNumbersSet) {
        Array.from(busNumbersSet).forEach((number, index) => {
          // Determines angle in radians for graph node.
          const angle = TWO_PI * (index + 1) / busNumbersSet.size;
          const x = centerX + Math.cos(angle) * LEVEL_RADIUS;
          const y = centerY + Math.sin(angle) * LEVEL_RADIUS;
          handleCreateCircle(ctx, x, y, number);
        });
      }
    }
  }, [height, width, handleCreateCircle, state.busNumber, state.edgeMap]);

  return (
    <canvas ref={ref} height={height} width={width} />
  );
}

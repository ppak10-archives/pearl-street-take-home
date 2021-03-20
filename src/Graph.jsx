/**
 * Graph.jsx
 * Graph component to display bus and edges.
 */

// Node Modules
import {useContext, useEffect, useRef, useState} from 'react';

// Context
import Context from './context';

export default function Graph() {
  // Hooks
  const {state} = useContext(Context);
  const ref = useRef();
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);

  useEffect(() => {
    const current = ref.current;
    if (current) {
      const {height, width} = current.getBoundingClientRect();
      setHeight(height);
      setWidth(width);
    }
  })

  useEffect(() => {
    const current = ref.current;
    if (current) {
      const ctx = current.getContext('2d');
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, 0, width, height);
    }
  }, [height, width]);

  return (
    <canvas ref={ref} height={height} width={width} />
  );
}

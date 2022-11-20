import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }) {
  let containerRef = useRef(null);
  if (!containerRef.current) {
    containerRef.current = document.createElement('div');
    document.body.appendChild(containerRef.current);
  }
  useEffect(() => {
    return function cleanUp() {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);

  return createPortal(children, containerRef.current);
}

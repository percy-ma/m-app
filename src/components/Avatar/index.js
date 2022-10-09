import { useState, useEffect } from 'react';
import multiavatar from '@multiavatar/multiavatar/esm';
import './index.css';

export default function Avatar(props) {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    setSvg(multiavatar(props.name))
  
  }, [props.name])
  
  return (
    <div
      className="app-avatar"
      dangerouslySetInnerHTML={{
        __html: svg,
      }}
    ></div>
  );
}

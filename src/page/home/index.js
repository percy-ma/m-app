import { useState, useEffect } from 'react';
import './index.scss';

export default function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => {
      setTime(new Date());
    }, 100);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="content-middle">
      <div id="time">
        <div id="hour" className="time-block">
          {time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}
        </div>
        <div id="minute" className="time-block">
          {time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}
        </div>
        <div id="seconds" className="time-block">
          {time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()}
        </div>
      </div>
    </div>
  );
}

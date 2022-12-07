import './index.scss';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Message from './message';

let add;

export function MessageContainer() {
  const [notices, setNotices] = useState([]);
  const TIMEOUT = 2.5 * 1000;
  const MAXCOUNT = 10;

  const remove = (notice) => {
    const { key } = notice;
    setNotices((prevNotices) => {
      return prevNotices.filter(({ key: itemKey }) => key !== itemKey);
    });
  };

  add = (notice) => {
    setNotices((prevNotices) => [...prevNotices, notice]);

    setTimeout(() => {
      remove(notice);
    }, TIMEOUT);
  };

  useEffect(() => {
    if (notices.length > MAXCOUNT) {
      const [firstNotice] = notices;
      remove(firstNotice);
    }
  }, [notices]);

  return (
    <div className="message-container">
      <TransitionGroup className="message-group">
        {notices.map(({ text, key, type }) => (
          <CSSTransition timeout={200} in classNames="slide-in-top" key={key}>
            <Message type={type} text={text} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

let el = document.querySelector('#message-wrapper');
if (!el) {
  el = document.createElement('div');
  el.className = 'message-wrapper';
  el.id = 'message-wrapper';
  document.body.append(el);
}
const root = ReactDOM.createRoot(el);
root.render(<MessageContainer />);

let seed = 0;
const now = Date.now();
const getId = () => {
  const id = seed;
  seed += 1;
  return `MESSAGE_${now}_${id}`;
};
const api = {
  info: (text) => {
    add({
      text,
      key: getId(),
      type: 'info',
    });
  },
  success: (text) => {
    add({
      text,
      key: getId(),
      type: 'success',
    });
  },
  warning: (text) => {
    add({
      text,
      key: getId(),
      type: 'warning',
    });
  },
  error: (text) => {
    add({
      text,
      key: getId(),
      type: 'danger',
    });
  },
};

export default api;

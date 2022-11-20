import './index.scss';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

let show, hide;

export function Loading() {
  const [visible, setVisible] = useState(false);

  show = () => {
    setVisible(true);
  };

  hide = () => {
    setVisible(false);
  };

  return (
    <>
      <div className={visible ? 'loading-box' : 'loading-box hide'}>
        <div className="loading"></div>
      </div>
    </>
  );
}

let el = document.querySelector('#loading-container');
if (!el) {
  el = document.createElement('div');
  el.className = 'loading-container';
  el.id = 'loading-container';
  document.body.append(el);
}
const root = ReactDOM.createRoot(el);
root.render(<Loading />);

const loading = {
  show: () => {
    show();
  },
  hide: () => {
    hide();
  },
};

export default loading;

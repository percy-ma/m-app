import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss'

let timer;
export default function Spin(props) {
  const [visible, setVisible] = useState(props.visible);

  useEffect(() => {
    if (props.delay) {
      timer && clearTimeout(timer);
      if (props.visible) {
        timer = setTimeout(() => setVisible(true), props.delay);
      } else {
        setVisible(false);
      }
    } else {
      setVisible(props.visible);
    }
  }, [props.visible]);

  return <div className={visible ? 'spin-box' : 'spin-box hide'}>
    <div className='loading'></div>
  </div>;
}

Spin.propTypes = {
  visible: PropTypes.bool,
  delay: PropTypes.number,
};

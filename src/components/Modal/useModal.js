import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Modal from './index';

const useModal = (content, okFun) => {
  const now = Date.now();

  const hide = () => {
    document.body.removeChild(document.getElementById(`modal-wrapper-${now}`));
  };
  const onOk = () => {
    okFun && okFun()
  }
  const show = () => {
    let el = document.createElement('div');
    el.className = 'modal-wrapper';
    el.id = `modal-wrapper-${now}`;
    document.body.append(el);
    const root = ReactDOM.createRoot(el);
    root.render(
      <Modal portal={false} visible={true} onOk={()=>onOk()} onCancel={()=>{hide()}}>
        {content}
      </Modal>
    );
  };

  return { show, hide };
};

export default useModal;

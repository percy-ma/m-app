import ReactDOM from 'react-dom/client';
import Modal from './index';

const useModal = (content, okFun) => {
  const now = Date.now();

  const hideModal = () => {
    document.body.removeChild(document.getElementById(`modal-wrapper-${now}`));
  };
  const onOk = () => {
    okFun && okFun()
  }
  const showModal = () => {
    let el = document.createElement('div');
    el.className = 'modal-wrapper';
    el.id = `modal-wrapper-${now}`;
    document.body.append(el);
    const root = ReactDOM.createRoot(el);
    root.render(
      <Modal portal={false} visible={true} onOk={()=>onOk()} onCancel={()=>{hideModal()}}>
        {content}
      </Modal>
    );
  };

  return { showModal, hideModal };
};

export default useModal;

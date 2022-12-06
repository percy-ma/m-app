import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Portal from '../Portal';
import useModal from './useModal';
import './index.scss';

function Modal(props) {
  const {
    className = '',
    children,
    visible = false,
    onOk,
    onCancel,
    okBtn,
    cancelBtn,
    showExitBtn = true,
    portal = true,
  } = props;

  const ModalContent = useCallback((props) => {
    return (
      <div className={`modal ${className} ${props.visible ? 'open' : ''}`}>
        <div className="modal-overlay"></div>
        <div className="modal-box">
          <div>
            {showExitBtn && (
              <div className="modal-close" onClick={onCancel}>
                x
              </div>
            )}
            <div className="modal-content">{children}</div>
            <div className="modal-button">
              {okBtn && <button onClick={onOk}>{okBtn}</button>}
              {cancelBtn && <button onClick={onCancel}>{cancelBtn}</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }, []);
  return (
    <>
      {portal ? (
        <Portal>
          <ModalContent visible={visible} />
        </Portal>
      ) : (
        <ModalContent />
      )}
    </>
  );
}

Modal.useModal = useModal;

Modal.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  okBtn: PropTypes.string,
  cancelBtn: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  showExitBtn: PropTypes.bool,
};

export default Modal;

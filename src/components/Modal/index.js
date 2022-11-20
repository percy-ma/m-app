import PropTypes from 'prop-types';
import Portal from '../Portal';
import useModal from './useModal';
import './index.scss';

function Modal(props) {
  const {
    children,
    visible = false,
    onOk,
    onCancel,
    okBtn,
    cancelBtn,
    portal = true,
  } = props;

  const ModalContent = () => {
    return (
      <div className="modal">
        <div className="modal-overlay"></div>
        <div className="modal-box">
          <div className="modal-close" onClick={onCancel}>x</div>
          <div className="modal-content">{children}</div>
          <div className="modal-button">
            {okBtn && <button onClick={onOk}>{okBtn}</button>}
            {cancelBtn && <button onClick={onCancel}>{cancelBtn}</button>}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {visible &&
        (portal ? (
          <Portal>
            <ModalContent />
          </Portal>
        ) : (
          <ModalContent />
        ))}
    </>
  );
}

Modal.useModal = useModal;

Modal.propTypes = {
  visible: PropTypes.bool,
  okBtn: PropTypes.string,
  cancelBtn: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Modal;

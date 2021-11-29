import close from "../../assets/images/close.svg";
import "./Modal.css";

const Modal = ({ children, handleClose }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-close' onClick={handleClose}>
          <img src={close} alt='close button' />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

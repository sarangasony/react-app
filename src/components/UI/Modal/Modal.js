import Aux from '../../../hoc/Auxj';
import BackDrop from '../Backdrop/BackDrop';
import './Modal.css';

const Modal = (props) => (
    <Aux>
        <BackDrop show={props.show} clicked={props.modalClosed} />
        <div
            className='Modal'
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
);


export default Modal;
import './Button.css';

const button = (props) => {

    let buttonClass = ['Button', props.btnType];
    return (
        <button
            className={buttonClass.join(' ')}
            onClick={props.clicked}>
            {props.children}
        </button>

    )
}

export default button;
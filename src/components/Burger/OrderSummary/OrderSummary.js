import Aux from '../../../hoc/Auxj';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {props.ingredients[igKey]}
                </li>
            )
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredinets:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Proce: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.perchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.perchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}

export default OrderSummary;
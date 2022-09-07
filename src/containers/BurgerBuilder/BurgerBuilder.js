import React, { useEffect, useState } from 'react';
import Aux from '../../hoc/Auxj';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
const BurgerBuilder = () => {
    const [ingredients, setIngredients] = useState(null);

    useEffect(() => {
        return () => {
            axios.get('/ingredients.json')
                .then( response => {
                    setIngredients(response.data)
                })
        };
    }, []);
   

    const [totalPrice, setTotalPrice] = useState(4);
    const [perchasable, setPerchasable] = useState(false);
    const [perchasing, setPerchasing] = useState(false);
    const [loading, setLoading] = useState(false);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        setPerchasable(sum > 0);
    }

    const addIngredientHandler = (type) => {
        const oldCount = ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICE[type];
        const newPrice = totalPrice + priceAddition;
        console.log(priceAddition, totalPrice, newPrice)
        setIngredients(updatedIngredients);
        setTotalPrice(newPrice);
        updatePurchaseState(updatedIngredients);
    }

    const removeIngredientHandler = (type) => {
        const oldCount = ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICE[type];
        const newPrice = totalPrice - priceDeduction;
        setIngredients(updatedIngredients);
        setTotalPrice(newPrice);
        updatePurchaseState(updatedIngredients);
    }

    const purchaseHandler = () => {
        setPerchasing(true);
    }

    const perchaseCancelHandler = () => {
        setPerchasing(false);
    }

    const perchaseContinueHanddler = () => {
        //alert('You continue!');
        setLoading(true);
        const order = {
            ingredients:  ingredients,
            price: totalPrice,
            customer: {
                name: 'Saranga',
                address: {
                    street: 'Colombo road',
                    zipCode: '11255',
                    country: 'Sri Lanka'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(respose => {
                console.log(respose);
                setLoading(false);
                setPerchasing(false);

            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setPerchasing(false);
            });
    }

    const disabledInfo = {
        ...ingredients
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = <Spinner />;
    
    if(ingredients) {
        burger = (
            <Aux>
                <Burger ingredient={ingredients} />
                <BuildControls
                    ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                disabled={disabledInfo}
                price={totalPrice}
                perchasable={perchasable}
                ordered={purchaseHandler} />
            </Aux>
        );

        orderSummary = <OrderSummary
            ingredients={ingredients}
            price = {totalPrice}
            perchaseCancelled={perchaseCancelHandler}
            perchaseContinued={perchaseContinueHanddler} />;
    }

    if(loading) {
        orderSummary =<Spinner />;
    }

    return (
        <Aux>
            <Modal show={perchasing} modalClosed={perchaseCancelHandler}>
                {orderSummary}
            </ Modal>
            {burger}
        </Aux>
    );
}

export default withErrorHandler(BurgerBuilder, axios);
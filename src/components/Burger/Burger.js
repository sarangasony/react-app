import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let transformedIngrediets = Object.keys(props.ingredient)
        .map(igKey => {
            return [...Array(props.ingredient[igKey])]
                .map((_, i) => {
                    return <BurgerIngredient type={igKey} key={igKey + i} />
                })
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);
   // console.log(props.ingredient);

    if (transformedIngrediets.length === 0) {
        transformedIngrediets = <p>Please add a ingredient !</p>
    }

    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngrediets}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;
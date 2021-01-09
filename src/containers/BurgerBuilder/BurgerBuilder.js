import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 25,
    bacon: 25
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { ....}
    // }
    state = {
        ingredients: null,
        totalPrice: 20,
        customerName: "",
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false

    }

    componentDidMount() {
        axios.get('https://bunbunburgers-1234-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            })

    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchaseable: sum > 0 });
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    customerNameHandler = (customerName) => {
        this.setState({ customerName: customerName.target.value })
    }

    purchaseContinueHandler = () => {
        //alert('Wohoo, You continued!. But dont be so happy you dont really ordered a burger :p');
        if (this.state.customerName.trim() === "") {
            alert('Come on, Why so rude? Tell me your name.');
        } else {

            this.setState({ loading: true });

            const order = {
                ingredients: this.state.ingredients,
                price: this.state.totalPrice,
                customerName: this.state.customerName
            }

            axios.post('/orders.json', order)
                .then(response => {
                    this.setState({ loading: false, purchasing: false });
                    setTimeout(() => {
                        alert('Wohoo! You did it. Thankyou.');
                    }, 1000);
                })
                .catch(error => {
                    this.setState({ loading: false, purchasing: false });
                });
            this.setState({ customerName: "" });
        }

    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;

            //{salad:true. meat:false ...}
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Sorry the App was unable to load !!</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                totalPrice={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                customerName={this.customerNameHandler}
                valueCustomerInput={this.state.customerName}
            />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );

    }

}
export default withErrorHandler(BurgerBuilder, axios);
import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
import CustomerInput from '../CustomerInput/CustomerInput';

class OrderSummary extends Component {
    //This could be a Functional Component

    // componentWillUpdate() {
    //     console.log('[orderSummary] Updated');
    // }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: "capitalize" }}>{igKey}</span> : {this.props.ingredients[igKey]}
                    </li>
                )
            });

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p> Delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price Rs. {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>You have a Great Choice, Continue to Checkout</p>
                <CustomerInput valueCustomerInput={this.props.valueCustomerInput} customerName={this.props.customerName} />
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxiliary>
        );
    }
}

export default OrderSummary;
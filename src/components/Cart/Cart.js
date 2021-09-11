import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 5.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }
    const tax =(total / 10).toFixed(2);
    const finalTotal = (total + shipping + Number(tax)).toFixed(2);
    return (
        <div>
            <h4>Order Summary:</h4>
            <p>Items Ordered:{cart.length}</p>
            <p><small>Product Price {total.toFixed(2)}</small></p>
            <p><small>Tax: {tax}</small></p>
            <p><small>Shipping Price : {shipping}</small></p>
            <p>Total Price : {finalTotal}</p>
            <br />
            <Link to="/review">
            <button className="main-button"><FontAwesomeIcon icon={faShoppingCart} /> Review Order</button>
            </Link>
        </div>
    );
};

export default Cart;
import React from 'react';
import './ReviewItem.css'
const ReviewItem = (props) => {
    // console.log(props);
    const {name, price, seller, quantity} = props.product;
    return (
        <div className="reveiw-item">
            <h4 className="product-name">N ame: {name}</h4>
            <p>Quantity: {quantity}</p>
            <br />
            <button className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;
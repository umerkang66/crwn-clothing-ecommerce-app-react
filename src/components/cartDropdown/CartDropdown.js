import React from 'react';
import './CartDropdown.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../customButton/CustomButton.js';
import CartItem from '../cartItem/CartItem.js';
import { selectCartItems } from '../../redux/reducers/cartReducer.js';
import { toggleCardHidden } from '../../redux/actions/cartActions.js';

const CartDropdown = ({ cartItems, toggleCardHidden, history }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push('/checkout');
          toggleCardHidden();
        }}
      >
        Go to Checkout
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(
  connect(mapStateToProps, { toggleCardHidden })(CartDropdown)
);

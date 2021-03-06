import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { connect } from "react-redux";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import * as actionTypes from "../../store/actions/actionTypes";
import { tempData } from "../../assets/tempData";
import * as actions from "../../store/actions/index";
import { ThemeProvider } from "styled-components";
import { Spinner, Alert } from "react-bootstrap";

export class Cart extends Component {
  componentDidMount = () => {
    // this.props.addTotals();
    this.props.ongetCartItems();
  };
  /*increment = (id) => {
    let tempCart = [...this.props.cart];
    const selectedItem = tempCart.find((item) => item._id === id);
    const index = tempCart.indexOf(selectedItem);
    const item = tempCart[index];
    item.count = item.count + 1;
    item.total = item.count * item.price;
    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = (id) => {
    let tempCart = [...this.props.cart];
    const selectedItem = tempCart.find((item) => item._id === id);
    const index = tempCart.indexOf(selectedItem);
    const item = tempCart[index];
    item.count = item.count - 1;
    if (item.count === 0) {
      this.props.removeItem(index);
      console.log(index);
    } else {
      item.total = item.count * item.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  /*removeItem = (index) => {
    console.log("item removed");
    let tempItems = [...this.props.items];
    let tempCart = [...this.props.cart];

    const id = tempCart[index]._id;

    tempCart = tempCart.filter((item) => item._id !== id);
    console.log(tempCart);
    let removedItem = tempItems[index];
    removedItem.inCart = false;
    removedItem.count = 0;
    removedItem.total = 0;

    this.setState({
      cart: tempCart,
      items: [...tempItems],
    });
  };
  addTotals = () => {
    let subTotal = 0;
    this.props.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total,
    });
  };*/

  checkout = () => {
    this.props.history.push("/checkout");
  };

  render() {
    console.log(this.props);
    var loading = null;
    if (this.props.state.loading) {
      loading = (
        <div style={{ width: "100%", margin: "10% 0", textAlign: "center" }}>
          <Spinner animation="border" variant="primary" />;
        </div>
      );
    }
    var error = null;
    if (this.props.state.error) {
      error = (
        <Alert
          style={{ margin: " 2% auto", textAlign: "center", width: "60%" }}
          variant="danger"
        >
          {this.props.state.error}
        </Alert>
      );
    }

    var cartUi = null;
    var cartSubTotal = 0;
    var cartTax = 0;
    var display = null;

    if (!this.props.isAuthenticated) {
      cartUi = <Title name="Please" title="LogIn" />;
      error = <div></div>;
    } else if (!this.props.state.loading && !this.props.state.error) {
      cartUi = <EmptyCart />;
    }

    if (this.props.state.cart.length > 0 && !this.props.state.loading) {
      const cartCount = this.props.state.cartItemCount.items;
      var tempArr = [];
      cartCount.map((element) => {
        const temp = this.props.state.cart.filter(
          (x) => x._id === element.productId
        );
        if (temp) {
          const t1 = temp[0];
          t1.itemCount = element.quantity;
          cartSubTotal = cartSubTotal + t1.price * t1.itemCount;
          console.log(t1.shippingFee);

          cartTax = cartTax + parseFloat(t1.shippingFee) * t1.itemCount;
          tempArr.push(t1);
        }
      });
      cartUi = (
        <section>
          <Title name="your" title="cart" />
          <CartColumns />
          <CartList
            cart={tempArr}
            // cartItemCount={this.props.state.cartItemCount}
            // increment={this.props.increment}
            // decrement={this.props.decrement}
            increment={this.props.onUpdateCartItem}
            decrement={this.props.onUpdateCartItem}
            removeItem={this.props.removeItem}
            updateCartError={this.props.updateCartError}
            deleteSingleItem={this.props.onDeleteSingleItem}
            deleteSingleItemError={this.props.deleteSingleItemError}
            deleteSingleItemLoading={this.props.deleteSingleItemLoading}
          />
          <CartTotals
            // state={this.props.state}
            cart={tempArr}
            cartSubTotal={cartSubTotal}
            cartItems={this.props.state.cart}
            cartTax={cartTax}
            clearCart={this.props.onclearCartItems}
            history={this.props.history}
            checkout={this.checkout}
          />
        </section>
      );
    }

    if (!this.props.isAuthenticated) {
    }
    return (
      <div>
        {loading}
        {error}
        {cartUi}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // state: state.shop,
    state: state.cart,
    updateCartError: state.cart.updateCartError,
    deleteSingleItemError: state.cart.removeSingleItemError,
    deleteSingleItemLoading: state.cart.removeSingleItemLoading,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch({ type: actionTypes.ADD_TO_CART, id: id }),
    clearCart: () => dispatch({ type: actionTypes.CLEAR_CART }),
    removeItem: (id) => dispatch({ type: actionTypes.REMOVE_ITEM, id: id }),
    increment: (id) => dispatch({ type: actionTypes.INCREMENT, id: id }),
    decrement: (id) => dispatch({ type: actionTypes.DECREMENT, id: id }),
    // setTotal: (cartSubTotal, cartTax) =>
    //   dispatch(actions.setTotal(cartSubTotal, cartTax)),
    ongetCartItems: () => dispatch(actions.getCartItem()),
    onUpdateCartItem: (prodId, amount) =>
      dispatch(actions.updateCartItem(prodId, amount)),
    onDeleteSingleItem: (id, itemCount) =>
      dispatch(actions.deleteSingleItem(id, itemCount)),
    onclearCartItems: (cartItems) =>
      dispatch(actions.clearCartItems(cartItems)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

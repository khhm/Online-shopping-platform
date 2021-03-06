import * as actionTypes from "./actionTypes";
import axios from "axios";
import { tempData, tempData2 } from "../../assets/tempData";

export const getProductSuccess = (items) => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    items: items,
  };
};

export const getProductFail = (error) => {
  return {
    type: actionTypes.GET_PRODUCTS_FAIL,
    error: error,
  };
};

export const getProductStart = () => {
  return {
    type: actionTypes.GET_PRODUCTS_START,
  };
};

export const getAllProducts = (path) => {
  console.log(path);

  return (dispatch) => {
    dispatch(getProductStart());
    axios
      .get("/shop/get-all-products", {
        params: {
          category: path,
        },
      })
      .then((items) => {
        dispatch(getProductSuccess(items.data));
      })
      .catch((err) => {
        dispatch(getProductFail(err));
      });
  };
};
////////////////////////////////////////////////////////////////////////////////////////////////
export const getSearchProductSuccess = (products) => {
  return {
    type: actionTypes.GET_SEARCH_PRODUCTS_SUCCESS,
    items: products,
  };
};

export const getSearchProductFail = (error) => {
  return {
    type: actionTypes.GET_SEARCH_PRODUCTS_FAIL,
    error: error,
  };
};

export const getSearchProductStart = () => {
  return {
    type: actionTypes.GET_SEARCH_PRODUCTS_START,
  };
};

export const getSearchProducts = (keyword) => {
  return (dispatch) => {
    dispatch(getSearchProductStart());
    axios
      .post("/shop/search", {
        keyword: keyword,
      })
      .then((products) => {
        dispatch(getSearchProductSuccess(products.data));
      })
      .catch((err) => {
        dispatch(getSearchProductFail(err));
      });
  };
};

export const addToCart = (id) => {
  return {
    type: actionTypes.ADD_TO_CART,
    id: id,
  };
};

export const increment = (id) => {
  return {
    type: actionTypes.INCREMENT,
    id: id,
  };
};

export const decrement = (id) => {
  return {
    type: actionTypes.DECREMENT,
    id: id,
  };
};

export const removeItem = (id) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    id: id,
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};

export const addTotals = () => {
  return {
    type: actionTypes.ADD_TOTALS,
  };
};

export const getItem = (id) => {
  return {
    type: actionTypes.GET_ITEM,
    id: id,
  };
};

//////////////////checkout////////////////////
export const getCheckoutFail = (error) => {
  return {
    type: actionTypes.GET_CHECKOUT_ITEM_FAIL,
    error: error.message,
  };
};

export const getcheckoutSuccess = (item) => {
  return {
    type: actionTypes.GET_CHECKOUT_ITEM_SUCCESS,
    item: item,
  };
};

export const getCheckoutStart = () => {
  return {
    type: actionTypes.GET_CHECKOUT_ITEM_START,
  };
};

export const getSingleItem = (id) => {
  return (dispatch) => {
    dispatch(getCheckoutStart());
    axios
      .get("/shop/get-single-product", {
        params: {
          id: id,
        },
      })
      .then((item) => {
        dispatch(getcheckoutSuccess(item));
      })
      .catch((err) => {
        dispatch(getCheckoutFail(err));
      });
  };
};

////////////get detail page////////////////////////
export const getDetailItemFail = (error) => {
  return {
    type: actionTypes.GET_DETAIL_SINGLE_ITEM_FAIL,
    error: error.message,
  };
};

export const getDetailItemSuccess = (item) => {
  return {
    type: actionTypes.GET_DETAIL_SINGLE_ITEM_SUCCESS,
    item: item,
  };
};

export const getDetailItemStart = () => {
  return {
    type: actionTypes.GET_DETAIL_SINGLE_ITEM_START,
  };
};

export const getDetailSingleItem = (id) => {
  return (dispatch) => {
    dispatch(getDetailItemStart());
    axios
      .get("/shop/get-single-product", {
        params: {
          id: id,
        },
      })
      .then((item) => {
        dispatch(getDetailItemSuccess(item.data));
      })
      .catch((err) => {
        dispatch(getDetailItemFail(err));
      });
  };
};

export const postOrderStart = () => {
  return {
    type: actionTypes.ORDER_START,
  };
};

export const postOrderSuccess = (result) => {
  console.log(result);
  return {
    type: actionTypes.ORDER_SUCCESS,
    result: result,
  };
};

export const postOrderFail = (err) => {
  return {
    type: actionTypes.ORDER_FAIL,
    err: err.message,
  };
};

export const postOrder = (order) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(postOrderStart());
    axios
      .post(
        "/order/post-order",
        {
          order: order,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((result) => {
        dispatch(postOrderSuccess(result.data));
      })
      .catch((err) => {
        dispatch(postOrderFail(err));
        console.log("post-error")
      });
  };
};

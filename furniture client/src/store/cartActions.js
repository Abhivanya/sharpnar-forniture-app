import { cartActions } from "./cartSlice";

// Fetch cart items from Firebase
export const getCartItems = () => {
  return async (dispatch) => {
    const { email } = JSON.parse(localStorage.getItem("forniture-app"));
    const emailId = email.replace(".", "_");

    try {
      const response = await fetch(
        `https://furniture-app-5c355-default-rtdb.firebaseio.com/${emailId}/cart.json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const res = await response.json();
      if (res) {
        dispatch(cartActions.replaceCart(res));
      }
    } catch (err) {
      console.error("Error fetching cart items:", err.message);
    }
  };
};

// Add or update a cart item
const helper = async (url, method, data) => {
  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add/update cart item");
    }

    const res = await response.json();
    return res;
  } catch (err) {
    console.error("Error in addToCart:", err.message);
    throw err;
  }
};

// Add new cart item or update existing one
export const addCartItem = (cartItems, newCartItem) => {
  return async (dispatch) => {
    const { email } = JSON.parse(localStorage.getItem("forniture-app"));
    const emailId = email.replace(".", "_");

    try {
      const itemExist = Object.entries(cartItems).find(
        ([key, item]) => item.id === newCartItem.id
      );

      if (itemExist) {
        const existingItemId = itemExist[0];
        const updatedData = {
          ...itemExist[1],
          cartQuantity: itemExist[1].cartQuantity + 1,
        };

        await helper(
          `https://furniture-app-5c355-default-rtdb.firebaseio.com/${emailId}/cart/${existingItemId}.json`,
          "PATCH",
          updatedData
        );
      } else {
        await helper(
          `https://furniture-app-5c355-default-rtdb.firebaseio.com/${emailId}/cart.json`,
          "POST",
          { ...newCartItem, cartQuantity: 1 }
        );
      }

      dispatch(getCartItems());
    } catch (err) {
      console.error("Error adding/updating cart item:", err.message);
    }
  };
};

export const removeCartItem = (cartItems, itemId) => {
  return async (dispatch) => {
    const { email } = JSON.parse(localStorage.getItem("forniture-app"));
    const emailId = email.replace(".", "_");

    try {
      const itemExist = Object.entries(cartItems).find(
        ([key, item]) => item.id === itemId
      );

      if (!itemExist) {
        throw new Error("Item does not exist in the cart");
      }

      const existingItemId = itemExist[0];
      const existingItem = itemExist[1];

      if (existingItem.cartQuantity === 1) {
        await helper(
          `https://furniture-app-5c355-default-rtdb.firebaseio.com/${emailId}/cart/${existingItemId}.json`,
          "DELETE",
          null
        );
      } else {
        const updatedData = {
          ...existingItem,
          cartQuantity: existingItem.cartQuantity - 1,
        };

        await helper(
          `https://furniture-app-5c355-default-rtdb.firebaseio.com/${emailId}/cart/${existingItemId}.json`,
          "PATCH",
          updatedData
        );
      }

      dispatch(getCartItems());
    } catch (err) {
      console.error("Error removing/updating cart item:", err.message);
    }
  };
};

export const clearCartItems = () => {
  return (dispatch) => {
    const { email } = JSON.parse(localStorage.getItem("forniture-app"));
    const emailId = email.replace(".", "_");

    const emptyCart = async () => {
      try {
        const response = await fetch(
          `https://furniture-app-5c355-default-rtdb.firebaseio.com/${emailId}/cart.json`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const res = await response.json();
      } catch (err) {
        console.error("Error Cleaning cart items:", err.message);
      }
    };
    emptyCart();
    dispatch(cartActions.cleanCart());
  };
};

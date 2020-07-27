import {
  ADD_TO_CART,
  UPDATE_CART,
  DELETE_ITEM_CART,
} from "../../shared/constants/action-type";

const initState = {
  items: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return addItem(state, action.payload);
    case UPDATE_CART:
      return updateCart(state, action.payload);
    case DELETE_ITEM_CART:
      const newCarts = state.items.filter(
        (item) => item._id !== action.payload.id
      );
      return { ...state, items: newCarts };
    default:
      return state;
  }
}

function addItem(state, payload) {
  const items = state.items;

  let isProductExists = false;

  items.map((item) => {
    if (!isProductExists && payload._id === item._id) {
      item.qty += payload.qty;
      isProductExists = true;
    }

    return item;
  });

  const newItems = isProductExists ? items : [...items, payload];

  return { ...state, items: newItems };
}

function updateCart(state, payload) {
  console.log("updateCart -> payload", payload);
  const { id, qty } = payload;
  const carts = state.items;

  const newCarts = carts.map((item) => {
    if (item._id === id) {
      item.qty = qty;
    }

    return item;
  });

  return { ...state, items: newCarts };
}

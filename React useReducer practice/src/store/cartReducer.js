import initialCart from "../data/initialCart";

export const ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR",
};

export const initialState = {
  items: initialCart,
};

export function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case ACTIONS.DECREMENT:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };

    case ACTIONS.REMOVE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case ACTIONS.CLEAR:
      return { ...state, items: [] };

    default:
      return state;
  }
}

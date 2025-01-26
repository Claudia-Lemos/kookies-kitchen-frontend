import { createSelector } from 'reselect';

export const selectCartItems = (state) => state.cart.items;

// Memoized selector to get cart items specific to an email
export const selectMemoizedCartItems = createSelector(
  [selectCartItems, (state, email) => email],
  (cartItems, email) => {
    if (!email) return []; // Return empty array if no email is provided
    return cartItems.filter(item => item.email === email); // Filter the items based on email
  }
);

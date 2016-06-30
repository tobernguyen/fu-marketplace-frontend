import { createSelector } from 'reselect';

const categoriesSelector = (state) => state.categories;
const shipPlacesSelector = (state) => state.shipPlaces;
const currentUserSelector = (state) => state.currentUser;

export const getCategories = createSelector(
  categoriesSelector,
  (categories) => {
    return categories
  }
);

export const getShipPlaces = createSelector(
  shipPlacesSelector,
  (shipPlaces) => {
    return shipPlaces
  }
);

export const getUser = createSelector(
  currentUserSelector,
  (currentUser) => {
    return currentUser
  }
);

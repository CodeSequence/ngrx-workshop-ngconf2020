import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";

export interface State {
  books: fromBooks.State;
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.reducer
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Books Selectors
 */
export const selectBooksState = (state: State) => state.books;
export const selectAllBooks = createSelector(
  selectBooksState,
  fromBooks.selectAll
);
export const selectActiveBook = createSelector(
  selectBooksState,
  fromBooks.selectActiveBook
);
export const selectBooksEarningsTotals = createSelector(
  selectBooksState,
  fromBooks.selectEarningsTotals
);

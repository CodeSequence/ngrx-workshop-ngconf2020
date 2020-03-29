import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";

export interface State {}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = [];

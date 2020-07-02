import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import { bookmarkReducer } from 'src/app/reducers/bookmark.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
    bookmarks: bookmarkReducer
};

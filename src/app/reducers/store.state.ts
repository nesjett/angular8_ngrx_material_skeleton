import {
  ActionReducerMap,
} from '@ngrx/store';

import { bookmarkReducer } from 'src/app/reducers/bookmark.reducer';


export interface State {

}

export const reducers: ActionReducerMap<State> = {
    bookmarks: bookmarkReducer
};

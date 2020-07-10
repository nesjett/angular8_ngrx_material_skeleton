import { createReducer, on, createAction, props } from '@ngrx/store';
import { add, remove, clearAll } from 'src/app/actions/bookmark.actions';

// Reducers
import removeOne from 'src/app/reducers/bookmark/remove.reducer';
import addNew from 'src/app/reducers/bookmark/add.reducer';
import clearState from 'src/app/reducers/bookmark/clear.reducer';


// Types
import { Group } from '../types/group';
 

/***
 * Default state
 */
export const initialState: Array<Group> = [
    {
        name: "Work",
        bookmarks: [{
            id: 2,
            name: 'Some page I liked',
            url: 'https://google.com',
            group: 'Work'
        }]
    }, 
    {
        name: "Leisure",
        bookmarks: [{
            id: 1,
            name: 'Another bookmark',
            url: 'https://bing.com',
            group: 'Leisure'
        }]
    }
];





/***
 * Reducer definitions
 */
const _bookmarkReducer = createReducer(initialState,
  on(add, addNew),
  on(remove, removeOne),
  on(clearAll, clearState),
);


 
export function bookmarkReducer(state, action) {
  return _bookmarkReducer(state, action);
}
import { createReducer, on } from '@ngrx/store';

// Actions
import { add, remove, clearAll } from 'src/app/actions/bookmark.actions';

// Types
import { Group } from '../types/group';

// Reducer methods
import { addNew } from './bookmark/new-bookmark';
import { removeOne } from './bookmark/delete-bookmark';
import { clearState } from './bookmark/clear-bookmarks';
 


/**
 * NOTE: There are NOT too many details about the application goals.
 * Attending the minimun requirements, I decided that is more beneficial
 * loosing time during the addition/removal actions rather than during the 
 * listing time.
 * 
 * The factors taken into account for that conclusion are looking for the best UX
 * in huge ammounts of data (bookmarks) that may be stored, for example, in 
 * browsers local storage.
 * 
 * Users may feel better by waiting a little bit of time (in case there is a noticeable
 * lag) during action proccesses (and we can show some short of animation...) than when
 * they want to rapidly access to one of their bookmarks.
 * 
 * Still this solution (having grouped bookmarks) rather than ordering
 * them during render time would be faster in big amounts of data, avoiding one extra loop
 * to categorize them for every rehydration.
 * 
 * - Nestor
 */

/***
 * NOTE 2: A good option to speed up search and delete actions could be to implement an
 * index. the comment below is a possible solution to this case.
 */

/*
interface indexData {
    groupIdx: number, // position in groups array
    bookmarkIdx: number // position in bookmarks id for this group
}

 interface storeState {
    groups: Array<Group>, // actual store data
    urlIndex: Array<[string, indexData]> // speed up the search proccess by having an index
 }

 export const initialState: storeState = {
    groups: [
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
            bookmarks: []
        }
    ],
    urlIndex: []
};
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
        bookmarks: []
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
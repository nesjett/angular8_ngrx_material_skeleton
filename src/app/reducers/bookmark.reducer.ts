import { createReducer, on, createAction, props } from '@ngrx/store';

// Types
import { Group } from '../types/group';
import { Bookmark } from '../types/bookmark';
 

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
 * Action definitions
 */
export const add = createAction('[Bookmark form component] Added new bookmark', props<Bookmark>());

export const remove = createAction('[Bookmark list component] Removed one bookmark', props<{id: number, group: string}>());

export const clearAll = createAction('[Bookmark list component] Cleared all bookmarks');



/***
 * NOTE: If we need to do some shorting, this is the best place
 * for doing so, but I think this goes beyond the goals of this test.
 */
const addNew = (state, bookmark) => {
    const groupIdx: number = state.findIndex(group => { // Find the array position if exists
        return group.name.toLowerCase() === bookmark.group.toLowerCase();
    });

    if( groupIdx >= 0 ) { // Group already exists, add new bookmark

        const newGroup = {
            name: state[groupIdx].name,
            bookmarks: [...state[groupIdx].bookmarks, bookmark]
        }

        return state.map( (group: Group, i) => (i !== groupIdx) ? group : newGroup); // Override existing group by newly created ref

    } else { // Otherwise, create a new group

        const newGroup: Group = {
            name: bookmark.group,
            bookmarks: [bookmark]
        }

        return [newGroup, ...state]; 
    }
}


const removeOne = (state: Group[], data: {id: number, group: string}) => {
    // IMPORTANT! Having implemented the proposal the readme would speed up this proccess a lot in data intensive environments.

    
    let groupIdx = state.findIndex(group => { // Find the array position if exists
        return group.name.toLowerCase() === data.group.toLowerCase();
    });

    if( groupIdx < 0 ) // Group don't exists
        return state;

    let nbrElems = state[groupIdx].bookmarks.length; // How many elemenets are in this group?
    let bookmarkIdx = state[groupIdx].bookmarks.findIndex(bookmark => { // Find the array position if exists
        return bookmark.id === data.id;
    });

    if ( bookmarkIdx < 0 ) // Bookmark don't exists
        return state;


    if( nbrElems === 1 ) { // The last element is the one we are trying to remove. So remove the whole group.
        return [...state.slice(0, groupIdx), ...state.slice(groupIdx + 1)];
    } else {
        const newGroup: Group = { // Rebuild the group with the new data
            name: state[groupIdx].name,
            bookmarks: [...state[groupIdx].bookmarks.slice(0, bookmarkIdx), ...state[groupIdx].bookmarks.slice(bookmarkIdx + 1)]
        }
       return [...state.slice(0, groupIdx), newGroup, ...state.slice(groupIdx + 1)]; // Recombine sliced state with the new group, KEEPING the same position it had before

    }
}


const clearState = (state) => {
    return [];
}



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
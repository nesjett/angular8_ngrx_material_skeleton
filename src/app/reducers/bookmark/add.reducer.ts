import { Group } from 'src/app/types/group';

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

export default addNew;
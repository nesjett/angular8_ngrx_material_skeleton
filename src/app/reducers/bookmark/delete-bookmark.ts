import { Group } from 'src/app/types/group';


export const removeOne = (state: Group[], data: {id: number, group: string}) => {
    // IMPORTANT! Having implemented the proposal in line 32 of bookmark.reducer.ts would speed up this proccess a lot in data intensive environments.

    
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
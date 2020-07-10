import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../types/bookmark';



/***
 * Action definitions
 */
export const add = createAction('[Bookmark form component] Added new bookmark', props<Bookmark>());

export const remove = createAction('[Bookmark list component] Removed one bookmark', props<{id: number, group: string}>());

export const clearAll = createAction('[Bookmark list component] Cleared all bookmarks');
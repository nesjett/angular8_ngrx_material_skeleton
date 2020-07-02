import { Component } from '@angular/core';
import { Observable } from 'rxjs';


// NgRx
import { Store } from '@ngrx/store';

// Actions
import { remove, clearAll } from 'src/app/reducers/bookmark.reducer';

// Types
import { Group } from 'src/app/types/group';


// Material
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Section {
    name: string;
    updated: Date;
}

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent {
    state$: Observable<Group[]>;

    constructor(
        private store: Store<{ bookmarks: Group[] }>,
        private _snackBar: MatSnackBar) {
        this.state$ = store.select('bookmarks');
    }

    navigateToUrl(url: string){
        window.open(url, "_blank");
    }

    deleteBookmark(event: any, id: number, group: string) {
        event.stopPropagation(); // Mandatory to avoid opening the url

        this.store.dispatch(remove({id, group})); 
        this._snackBar.open('Bookmark removed', '', {duration: 3500});
	}
        

    // Should ask for user confirmation, read: https://material.angular.io/components/dialog
    clearAllBookmarks() {
        this.store.dispatch(clearAll()); 
    }

}

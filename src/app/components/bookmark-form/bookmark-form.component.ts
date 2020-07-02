import { Component, OnInit, Injectable } from '@angular/core';

// NgRx
import { Store, select } from '@ngrx/store';
import { add } from 'src/app/reducers/bookmark.reducer';
import { Bookmark } from 'src/app/types/bookmark';

// Forms
import { FormGroup, FormBuilder, Validators   } from '@angular/forms';

// Material
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss']
})

export class BookmarkFormComponent implements OnInit {
	creationForm: FormGroup;
	submitted: boolean = false;
	error: string = '';


    constructor(
        private store: Store<{ bookmarks: Array<Bookmark> }>,
                private formBuilder: FormBuilder,
                private _snackBar: MatSnackBar) { 
    }

    createForm() {
        return this.formBuilder.group({
            bName: ['', [Validators.required, Validators.minLength(3)]],
            bUrl: ['', [Validators.required]],
            bGroup: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    ngOnInit() {
        this.creationForm = this.createForm();
    }
	
	get f() { return this.creationForm.controls; }


	// Form submit callback
    tryToCreate(e: any) {
        this.submitted = true;

        // 1 Form validation
        if (this.creationForm.invalid) {
            return;
        }

        // 2 Create new bookmark from provided data
        const tmpBook: Bookmark = {
            id: Date.now(), // This should be sent to server, after creation server should give back a valid id. For now, just generate an id from time
            name: this.creationForm.value.bName,
            url: this.creationForm.value.bUrl,
            group: this.creationForm.value.bGroup
        };

            // 3 Call NgRx action
        this.store.dispatch(add(tmpBook)); 
            
        // 4 Show feedback on success
        this.submitted = false;
        this._snackBar.open('Bookmark added!', '', {duration: 3500});

        // 5 Reset some inputs, leave group input in case we want to add more there.
        e.currentTarget.reset();
        this.creationForm.reset();
    }

	onReset() {
        this.creationForm.reset();
        this.creationForm.markAsPristine();
	}

}

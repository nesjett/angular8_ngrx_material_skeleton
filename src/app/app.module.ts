import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// App components
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';


// Material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


// NgRx
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/store.state';


@NgModule({
  declarations: [
    AppComponent,
    BookmarkListComponent,
    BookmarkFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

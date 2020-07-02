To acces the source code, change to branch ["source"](https://github.com/nesjett/angular8_ngrx_material_skeleton/tree/source)  

A live version of the site can be found at [Github pages](https://nesjett.github.io/angular8_ngrx_material_skeleton/)

# Angular 8 with NgRx

The project has been designed and developed as a "minimal" usage example, making use of the best practices and taking into account performance, UI and UX (without making the system too complex)

The software makes use of interfaces for object definitions, NgRx reducers and action definitios for the store, Angular Material elements and Native Angular forms with validation.

For performance and UX comments and conclusions, please, refer to [NOTE 1 & NOTE 2](https://licensebuttons.net/l/by/3.0/88x31.png)


# Screenshots
#### Angular form validation
![Form validation](https://github.com/nesjett/angular8_ngrx_material_skeleton/blob/master/assets/screenshots/form-validation.png?raw=true)

#### Custom group creation
Users can create their own groups. In the order they want, markers will group acordingly.
![Bookmark creation](https://github.com/nesjett/angular8_ngrx_material_skeleton/blob/master/assets/screenshots/new.png?raw=true)

#### Feedback elements on bookmark creation/deletion
![Action feedback](https://github.com/nesjett/angular8_ngrx_material_skeleton/blob/master/assets/screenshots/action-feedback.png?raw=true)

#### Open bookmark in new window + bookmark delete button
![Delete UI](https://github.com/nesjett/angular8_ngrx_material_skeleton/blob/master/assets/screenshots/bookmark-deletion-ui.png?raw=true)




# Remarks

### NOTE about UX and optimization
 There are NOT too many details about the application goals.
 Attending the minimun requirements, I decided that is more beneficial
 loosing time during the addition/removal actions rather than during the 
 listing time.
 
 The factors taken into account for that conclusion are looking for the best UX
 in huge ammounts of data (bookmarks) that may be stored. In this case I considered
 that speed during bookmark listing is more important than when performing an action.
 
 Still this solution (having grouped bookmarks) rather than ordering
 them during render time would be faster in big amounts of data, avoiding one extra loop
 to categorize them for every rehydration.



 ### NOTE 2 about optimization
 A good option to speed up search and delete actions could be to implement an index. The code block below is a possible solution to this case.
 

 ```javascript
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
            bookmarks: []
        }, 
        {
            name: "Leisure",
            bookmarks: []
        }
    ],
    urlIndex: []
};
 ```





# Usage instructions

## To run the project in development:
### 1- Run
```
npm install
```

### 2- Run
```
ng serve
```

## To test the production project
### Option 1: Try it online at [Github pages](https://nesjett.github.io/angular8_ngrx_material_skeleton/)

### Option 2: Go to master branch, and dowload the compiled, production version


# Authorship
This software has been developed by Nestor Sabater as an usage example of Angular 8 + NgRx + Angular Material.

The software is distributed under CC BY  
![CC BY](https://licensebuttons.net/l/by/3.0/88x31.png)
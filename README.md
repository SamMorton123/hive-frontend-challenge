## How to run the code
(assumes you have node installed)
1. Clone the repo using: > git clone https://github.com/SamMorton123/hive-frontend-challenge
2. run: > npm install
3. finally, run: > npm start
    This should start up the site I threw together to display the dropdown component. It should open in
    a new browser window at localhost:3000

## What code should you look at?
I started the project with React starter, so there's some code in the repo that isn't relevant to the assignment. The code that I wrote for this can be found in:
    - App.js
    - App.css
    - Dropdown.js
    - DropdownItem.js
    - dropdown.css

## Some implementation notes
I tried to write the Dropdown API with reusability in mind. The API itself accepts 4 props. `givenData` expects an array of items to display under the dropdown. `onDataChange` is a flexible prop that accepts a method and runs it every time the user changes the items that are selected under the dropdown. The intention of this is so that a developer could access the user's selection from the dropdown upstream. `multiselect` prop just toggles on or off whether the user can select multiple options. Finally, `size` expect "small", "medium", or "large". I understand this isn't the most flexible thing ever, but I ran out of time to do something better.

The dropdown implements all the requested features in the prompt. In the sample website that is run when you run "npm start", I include 6 dropdowns showcasing the different size options, with 2 different datasets for each size.

### Some caveats
I wanted to implement better styling and also a test suite, but unfortunately I ran out of time to implement those. I take testing very seriously and wanted to demonstrate that. Lastly, when you scroll down in my dropdown and select an option, you are automatically scrolled back to the top, which isn't the greatest UX. I didn't have time to fix this, but I thought I'd note it here.
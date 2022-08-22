// working with supabase:
import { checkAuth, signOutUser } from './fetch-utils.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const addCatForm = document.getElementById('add-cat-form');

// local state:
const cats = [];

// display functions:

// events:
addCatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(addCatForm);

    console.log({
        name: formData.get('name'),
    });

    // TODO: clear form after save
});

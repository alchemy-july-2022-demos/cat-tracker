import { checkAuth, signOutUser, addCat } from './fetch-utils.js';

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const addCatForm = document.getElementById('add-cat-form');

// local state:
const cats = [];

// display functions:

// events:
addCatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addCatForm);

    const response = await addCat({
        name: formData.get('name'),
    });

    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
    } else {
        const cat = response.data;
        cats.push(cat);
        // TODO: re-display list
        console.log(cats);

        // TODO: clear form after save
        addCatForm.reset();
    }
});

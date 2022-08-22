import { checkAuth, signOutUser, addCat, getCats } from './fetch-utils.js';

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const addCatForm = document.getElementById('add-cat-form');

// local state:
let cats = [];

// load page
async function loadPage() {
    const response = await getCats();
    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error.message);
    } else {
        cats = response.data;
        displayCats();
    }
}

loadPage();

// display functions:
function displayCats() {
    console.log('would display list of cats...', cats);
}

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
        displayCats();

        // clear form after save
        addCatForm.reset();
    }
});

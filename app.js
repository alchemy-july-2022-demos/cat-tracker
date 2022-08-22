import { checkAuth, signOutUser, addCat, getCats, deleteCat, updateCat } from './fetch-utils.js';
import { renderCatList } from './render-utils.js';

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const addCatForm = document.getElementById('add-cat-form');
const catListContainer = document.getElementById('cat-list-container');

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

async function handleDelete(cat) {
    const message = `Are you sure you want to bury "${cat.name}"?`;
    if (!confirm(message)) return;

    const response = await deleteCat(cat.id);
    if (!response.error) {
        // 1 modify the array
        const index = cats.indexOf(cat);
        if (index !== -1) {
            cats.splice(index, 1);
        }

        // 2 re-display the list
        displayCats();
    }
}

async function handleUpdate(cat) {
    const update = {
        lives: cat.lives - 1,
    };
    const response = await updateCat(cat.id, update);
    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
    } else {
        const updated = response.data;
        // 1 modify the array
        const index = cats.indexOf(cat);
        if (index !== -1) {
            cats[index] = updated;
            // this does same thing
            // cats.splice(index, 1, updated);
        }

        // 2 re-display the list
        displayCats();
    }
}

// display functions:
function displayCats() {
    const list = renderCatList(cats, handleDelete, handleUpdate);
    catListContainer.innerHTML = '';
    catListContainer.append(list);
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

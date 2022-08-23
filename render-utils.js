export function renderCatList(cats, handleDelete, handleUpdate) {
    const ul = document.createElement('ul');
    ul.classList.add('cat-list');

    for (const cat of cats) {
        const li = document.createElement('li');
        li.classList.add('cat-item');

        const h3 = document.createElement('h3');
        h3.textContent = cat.name;

        const span = document.createElement('span');
        span.textContent = `${cat.lives} ${cat.lives === 1 ? 'life' : 'lives'}`;

        li.append(h3, span);

        if (cat.lives > 0) {
            const updateButton = document.createElement('button');
            updateButton.classList.add('update-button');
            updateButton.textContent = '💀 take life';

            updateButton.addEventListener('click', () => {
                handleUpdate(cat);
            });

            li.append(updateButton);
        } else {
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('update-button');
            deleteButton.textContent = '⚰️ reap cat';

            deleteButton.addEventListener('click', () => {
                // GOOD: we know what "cat" this button corresponds to
                // BAD: we need to manage state in app.js, not this
                // render function
                handleDelete(cat);
            });

            li.append(deleteButton);
        }

        ul.append(li);
    }

    return ul;
}

//Variable Declarations
const saveButton = document.querySelector('#save-btn');
const bio = document.querySelector('#bio');
const image = document.querySelector('#imageUrl');

//Save button
saveButton.addEventListener('click', async (e) => {
    const res = await fetch(window.location.href, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({bio: bio.value, imgUrl: image.value})
    });
    const json = await res.json(); 

    window.location.href = `/users/${json.userId}`;
});
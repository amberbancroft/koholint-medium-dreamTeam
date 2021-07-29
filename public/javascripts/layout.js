const logoutButton = document.querySelector('#logout-button')
if(logoutButton){
    logoutButton.addEventListener('click', (e) => {
        localStorage.clear();
    })
} //clearing storage on logout blockLike

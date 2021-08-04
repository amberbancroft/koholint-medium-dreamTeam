let logoutButton = document.querySelector('#logout-button')
if(logoutButton){
    logoutButton.addEventListener('click', (e) => {
        localStorage.clear();
    })
} //clearing storage on logout blockLike

// For demo signin button on signin page
const demoSigninBtn = document.querySelector(".sign-in-demo")
if(demoSigninBtn){
    demoSigninBtn.addEventListener('click', e => {
        e.preventDefault();
        window.location.href = "/users/demo"
    })
}

// Button on error page to return to previous page
const goBackBtn = document.querySelector('.go-back')
if(goBackBtn){
    goBackBtn.addEventListener('click', e => {
        history.back();
    })
}
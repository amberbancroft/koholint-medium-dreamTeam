const followButton = document.querySelector('.green-btn')
followButton.addEventListener('click', (e) => {
    e.preventDefault();

    fetch(`/users/${followButton.dataset.value}`, {
        method: "PATCH",
    }).then(function(followButton) {
        console.log(followButton)
        document.querySelector(".green-btn").innerHTML = "Following"
    }).catch((error) => {
        console.error(error)
    })
})




// Click follow button, inverted colors, hover over and it says Unfollow
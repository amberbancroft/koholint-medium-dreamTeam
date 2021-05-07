const followButton = document.querySelector('.green-btn-follow')
followButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (followButton.innerHTML === "Follow") {
        fetch(`/users/${followButton.dataset.value}`, {
            method: "PATCH",
        }).then(function(followButton) {
            document.querySelector(".green-btn-follow").innerHTML = "Following"
        }).catch((error) => {
            console.error(error)
        })
    } else {
        fetch(`/users/${followButton.dataset.value}`, {
            method: "DELETE",
        }).then(function(followButton) {
            document.querySelector(".green-btn-follow").innerHTML = "Follow"
        }).catch((error) => {
            console.error(error)
        })
    }
})




// Click follow button, inverted colors, hover over and it says Unfollow
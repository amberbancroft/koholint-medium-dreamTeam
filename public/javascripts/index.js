const followButtons = document.querySelectorAll('.green-btn-follow')
followButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        console.log("clicked");
        if (btn.innerText === "Follow") {
            fetch(`/users/${btn.dataset.value}`, {
                method: "PATCH",
            }).then(function(res) {
                btn.innerText = "Following"
            }).catch((error) => {
                console.error(error)
            })
        } else {
            fetch(`/users/${btn.dataset.value}`, {
                method: "DELETE",
            }).then(function(res) {
                btn.innerText = "Follow"
            }).catch((error) => {
                console.error(error)
            })
        }
    });
})

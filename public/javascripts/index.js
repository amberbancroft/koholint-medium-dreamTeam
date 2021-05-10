console.log("hi")
const followButtons = document.querySelectorAll('.green-btn-follow')
followButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (btn.innerHTML === "Follow") {
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
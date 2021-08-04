const followButton = document.querySelectorAll('.green-btn-follow');

followButton.forEach((element)=>
element.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.innerText === "Follow") {
            fetch(`/users/${element.dataset.value}/followers`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({followId: e.target.dataset.follow}),
            }).then(function(res) {
                element.innerText = "Following"
            }).catch((error) => {
                console.error(error)
            })
        } else {
            fetch(`/users/${element.dataset.value}/followers`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({followId: e.target.dataset.follow}),
            }).then(function(res) {
                element.innerText = "Follow"
            }).catch((error) => {
                console.error(error)
            })
        }
    }))


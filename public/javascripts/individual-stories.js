//If comment is clicked, reveal comment box
console.log("hello world");
const commentBox = document.querySelector("#comment-box");
const commentButton = document.querySelector(".story-comment")
commentButton.addEventListener("click", e => {
    commentBox.classList.toggle("hidden");
    commentButton.classList.toggle("fa-lg");
});
document.querySelector(".comment-exit > i").addEventListener("click", e => {
    commentBox.classList.toggle("hidden");
    commentButton.classList.toggle("fa-lg");
});

document.querySelector(".comment-form").addEventListener("submit", e => {
    e.preventDefault();
})




//Becky changed this code to grab the heart icon instead of the button
const like = document.querySelector('#like-button');
like.addEventListener('click', (e) => {
    e.target.classList.add("fa-lg");
    setTimeout(()=> {
    e.target.classList.remove("fa-lg");
    }, 100)
    fetch(`/${like.dataset.value}`, {
        method: "PATCH",
    }).then(function(res) {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json();
    })
    .then(function(like){
        const likeCounter = document.querySelector(".story-likes");
        likeCounter.innerHTML = like.likeCount;
    })
    .catch((error)=>{
        console.error(error)
    })
})

//If comment is clicked, reveal comment box
const commentBox = document.querySelector("#comment-box");
document.querySelector(".story-comment").addEventListener("click", e => {
    commentBox.classList.toggle("hidden");
});

// document.querySelector("#comment-box > ")
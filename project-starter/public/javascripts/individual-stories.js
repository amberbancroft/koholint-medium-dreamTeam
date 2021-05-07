//If comment is clicked, reveal comment box
console.log("hello world");
const commentBox = document.querySelector("#comment-box");
document.querySelector(".story-comment").addEventListener("click", e => {
    commentBox.classList.toggle("hidden");
});
// document.querySelector("#comment-box > ")




// const like = document.querySelector('.story-likes');
// like.addEventListener('click', () => {
//     fetch('/:id(\\d+)', {
//         method: "PATCH",
//     })
// }).then(function(res) {
//     if (!res.ok) {
//         throw Error(res.statusText); 
//     }
//     return res.json();
// })
// .then()
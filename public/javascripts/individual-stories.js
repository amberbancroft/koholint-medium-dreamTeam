//If comment is clicked, reveal comment box
console.log("hello world");
const commentBox = document.querySelector("#comment-box");
const commentsDisplay = document.querySelector(".comments-display");
const commentButton = document.querySelector(".story-comment")
const commentContentBox = document.querySelector(".comment-display");
commentButton.addEventListener("click", e => {
    commentBox.classList.toggle("hidden");
    commentButton.classList.toggle("fa-lg");
});
document.querySelector(".comment-exit > i").addEventListener("click", e => {
    commentBox.classList.toggle("hidden");
    commentButton.classList.toggle("fa-lg");
});
//If Respond button is hit, grab the value in the input and make POST request 
const renderComment = (userName, createdAt, content, likes) => {
    const newComment = document.createElement("div");
    const newCommentUserContainer = document.createElement("div");

    newComment.classList.add("single-comment-box");
    newCommentUserContainer.classList.add("single-comment-box__user");

    const newCommentUser = document.createElement("p");
    newCommentUser.innerText = userName;
    const newCommentTimestamp = document.createElement("p");
    newCommentTimestamp.innerText = createdAt
    const newCommentContent = document.createElement("p");
    newCommentContent.innerText = content;
    const newCommentLikeButton = document.createElement("i");
    newCommentLikeButton.classList.add("far", "fa-heart");

    newCommentUserContainer.append(newCommentUser, newCommentTimestamp);
    newComment.append(newCommentUserContainer, newCommentContent);

    commentsDisplay.append(newComment);
}
document.querySelector(".comment-form").addEventListener("submit", async e => {
    e.preventDefault();
    //use ajax to render this comment
//will need to update pug to also render the posted comments when a GET to /:storyId is made
//have express query for comments and render if they exist 
    const formData = new FormData(e.currentTarget);
    const content = formData.get("comment-content");
    const storyId = e.currentTarget.dataset.value
    try {
        const res = await (await fetch(`comments/${storyId}`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ content, storyId })
        })).json();
        //if authorized, render comment
        if(res.authorized){
            const {content, userName, createdAt, likes} = res;
            console.log(content, userName, createdAt, likes);
            renderComment(userName, createdAt, content, likes);
        } else {
            alert("Please sign in to leave comments.");
        }
        //else, render message to sign in - alert for now
    } catch (e) {
        console.error(e);
    }
    commentContentBox.value = "";
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

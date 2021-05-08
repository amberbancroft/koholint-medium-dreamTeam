//If comment is clicked, reveal comment box
const commentBox = document.querySelector("#comment-box");
const commentsDisplay = document.querySelector(".comments-display");
const commentButton = document.querySelector(".story-comment")
const commentContentBox = document.querySelector("#comment-content");

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
    newCommentTimestamp.classList.add("posted-comment-timestamp");
    const newCommentContent = document.createElement("p");
    newCommentContent.classList.add("posted-comment-content");
    newCommentContent.innerText = content;
    const newCommentLikeButton = document.createElement("i"); //haven't appended yet
    newCommentLikeButton.classList.add("far", "fa-heart");
    const newCommentMenuButton = document.createElement("i")
    newCommentMenuButton.classList.add("fas", "fa-ellipsis-h");
    // TODO ********* Add logic to render menu if comment's Userid matches loggedin User id ****
    newCommentUserContainer.append(newCommentUser, newCommentTimestamp);
    newComment.append(newCommentUserContainer, newCommentContent, newCommentMenuButton);

    commentsDisplay.append(newComment);
}

const addEditandDeleteListener = (edit, delete) => {

}

document.querySelector(".comment-form").addEventListener("submit", async e => {
    e.preventDefault();
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

const menuButtons = document.querySelectorAll(".single-comment-box .fa-ellipsis-h");
if(menuButtons.length){
    menuButtons.forEach(menuButton => {
        menuButton.addEventListener("click", e => {
            //remove class from menu div to reveal edit and delete buttons
            // console.dir(e.target);
            // console.dir(e.target.parentElement);
            const menu = e.target.parentElement.childNodes[2];
            menu.classList.toggle("hidden");
        })
    })
}


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

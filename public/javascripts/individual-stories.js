//If comment is clicked, reveal comment box
const commentBox = document.querySelector("#comment-box");
const commentsDisplay = document.querySelector(".comments-display");
const commentButton = document.querySelector(".story-comment")
const commentContentBox = document.querySelector("#comment-content");
const menuButtons = document.querySelectorAll(".single-comment-box .fa-ellipsis-h");
const deleteAndEditMenus = document.querySelectorAll(".edit-delete-comment");

const addEditDeleteListener = (editButton, deleteButton, commentId) => {
    /*When edit is clicked, render a textbox and save button*/
    editButton.addEventListener('click', async e => {
        const res = await (await fetch(`/comments/${commentId}`,{
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content: '------------ comment content here ------------'})
        })).json();
    });

    deleteButton.addEventListener('click', async e => {
        console.log("BEFORE DELETE, DELETING COMMENT", commentId);
        const commentBox = document.querySelector(`div[data-comment-id="${commentId}"]`)
        commentBox.parentNode.removeChild(commentBox);
        //actually delete it in the database now
        await fetch(`/comments/${commentId}`,{
            method: "DELETE",
        });
        console.log("AFTER DELETE");
    
    });
}
const addMenuEventListener = (menuButton) => {
    menuButton.addEventListener("click", e => {
        console.dir(e.target);
        // console.dir(e.target.parentElement);
        const menu = e.target.parentElement.childNodes[2];
        menu.classList.toggle("hidden");
    })
}   
const renderComment = (userName, createdAt, content, likes, commentId) => {
    const newComment = document.createElement("div");
    const newCommentUserContainer = document.createElement("div");
    newComment.classList.add("single-comment-box");
    newComment.dataset.commentId = commentId; //add unique ID for this comment
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
    addMenuEventListener(newCommentMenuButton);
    const newCommentMenu = document.createElement('div');
    newCommentMenu.classList.add("edit-delete-comment", "hidden");
    const newCommentEdit = document.createElement("i");
    newCommentEdit.classList.add("fas", "fa-edit");
    const newCommentDelete = document.createElement("i");
    newCommentDelete.classList.add("fas", "fa-trash-alt");
    addEditDeleteListener(newCommentEdit, newCommentDelete, commentId); 
    newCommentMenu.append(newCommentEdit, newCommentDelete);
    newCommentUserContainer.append(newCommentUser, newCommentTimestamp);
    newComment.append(newCommentUserContainer, newCommentContent, newCommentMenu, newCommentMenuButton);
    commentsDisplay.append(newComment);
}

//**************To Add Event Listeners to page UPON LOADING******************/
if(menuButtons.length){
    menuButtons.forEach(menuButton => {
        addMenuEventListener(menuButton);
    })
}
//Listener for rendering comment box
commentButton.addEventListener("click", e => {
    commentBox.classList.toggle("hidden");
    commentButton.classList.toggle("fa-lg");
});
document.querySelector(".comment-exit > i").addEventListener("click", e => {
    commentBox.classList.toggle("hidden");
    commentButton.classList.toggle("fa-lg");
});

//Listener for adding comments - POST
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
            const {content, userName, createdAt, likes, commentId} = res;
            console.log(content, userName, createdAt, likes, commentId);
            renderComment(userName, createdAt, content, likes, commentId);
        } else {
            alert("Please sign in to leave comments.");
        }
        //else, render message to sign in - alert for now
    } catch (e) {
        console.error(e);
    }
    commentContentBox.value = "";
})
//Listener for editing and deleting comments - PUT/DELETE
deleteAndEditMenus.forEach(menu => {
    const editBtn = menu.childNodes[0];
    const deleteBtn = menu.childNodes[1];
    const commentId = menu.dataset.commentId;
    addEditDeleteListener(editBtn, deleteBtn, commentId);
})

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

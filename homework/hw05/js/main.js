import {getAccessToken} from './utilities.js';
const rootURL = 'https://photo-app-secured.herokuapp.com';

// START OF BOOKMARK FUNCTIONS

const redrawBookmark = async (currentPost, i, length) => {
    const endpoint = `${rootURL}/api/posts/${currentPost}`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'luke', 'luke_password')
        }
    })
    const data = await response.json();
    const htmlString = bookmarkToHTML(data, i, length);
    
    targetElementAndReplace(`bookmark_${currentPost}`, htmlString);
}

window.createBookmark = async (currentPost, i, length) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/bookmarks/`;
    const postData = {
        "post_id": currentPost // replace with the actual post ID
    };

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'luke', 'luke_password')
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    redrawBookmark(currentPost, i, length);
}

window.deleteBookmark = async (currentPost, currentBookmark, i, length) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/bookmarks/${currentBookmark}`;

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'luke', 'luke_password')
        }
    })

    const data = await response.json();
    redrawBookmark(currentPost, i, length);
}

const getBookmark = (currentPost, i, length) => {
    console.log("this is the current post");
    console.log(currentPost);
    if (currentPost.current_user_bookmark_id) {
        return `<div class="bookmark" id="bookmark_${currentPost.id}"><button class="icon-properties" onclick="deleteBookmark(${currentPost.id}, ${currentPost.current_user_bookmark_id}, ${i}, ${length})" aria-checked="true" aria-label="bookmark ${i + 1} of ${length}"><i class="fas fa-bookmark"></i></button></div>`;
    }
    return `<div class="bookmark" id="bookmark_${currentPost.id}"><button class="icon-properties" onclick="createBookmark(${currentPost.id}, ${i}, ${length})" aria-checked="false" aria-label="bookmark ${i + 1} of ${length}"><i class="far fa-bookmark"></i></button></div>`;
}

const bookmarkToHTML = (currentPost, i, length) => {
    return `${getBookmark(currentPost, i, length)}`;
}

// END OF BOOKMARK FUNCTIONS

// START OF LIKE FUNCTIONS

const redrawLike = async (currentPost, i, length) => {
    const endpoint = `${rootURL}/api/posts/${currentPost}`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'luke', 'luke_password')
        }
    })
    const data = await response.json();
    const htmlString = likeToHTML(data, i, length);
    targetElementAndReplace(`heart_${currentPost}`, htmlString);
}


const redrawLikeCount = async (currentPost) => {
    const endpoint = `${rootURL}/api/posts/${currentPost}`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'luke', 'luke_password')
        }
    })
    const data = await response.json();
    const htmlString = likeCountToHTML(data);
    
    targetElementAndReplace(`card-likes_${currentPost}`, htmlString);
}

window.createLike = async (currentPost, i, length) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/posts/likes/`;
    const postData = {
        "post_id": currentPost // replace with the actual post ID
    };

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'luke', 'luke_password')
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    redrawLike(currentPost, i, length);
    redrawLikeCount(currentPost);
}

window.deleteLike = async (currentPost, currentLike, i, length) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/posts/likes/${currentLike}`;

    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'luke', 'luke_password')
        }
    })

    const data = await response.json();
    redrawLike(currentPost, i, length);
    redrawLikeCount(currentPost);
}

const likeCountToHTML = (currentPost) => {
    return `${getLikeCount(currentPost)}`;
}

const getLikeCount = (currentPost) => {
    return `<div id="card-likes_${currentPost.id}" class="card-likes">${currentPost.likes.length} likes</div>`;
}

const getLike = (currentPost, i, length) => {
    if (currentPost.current_user_like_id) {
        return `<div class="heart" id="heart_${currentPost.id}"><button class="icon-properties" onclick="deleteLike(${currentPost.id}, ${currentPost.current_user_like_id}, ${i}, ${length})" aria-checked="true" aria-label="like ${i + 1} of ${length}"><i class="fas fa-heart liked_post"></i></button></div>`;
    }
    return `<div class="heart" id="heart_${currentPost.id}"><button class="icon-properties" onclick="createLike(${currentPost.id}, ${i}, ${length})" aria-checked="false" aria-label="like ${i + 1} of ${length}"><i class="far fa-heart fa-regular"></i></button></div>`;
}

const likeToHTML = (currentPost, i, length) => {
    return `${getLike(currentPost, i, length)}`;
}


// END OF LIKE FUNCTIONS

// START OF FOLLOW FUNCTIONS

const redrawFollow = async (currentSuggestion, i, length) => {
    const token = await getAccessToken(rootURL, 'luke', 'luke_password');
    const endpoint2 = `${rootURL}/api/following`;
    const response2 = await fetch(endpoint2, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    
    const data2 = await response2.json();
    var suggestion = document.getElementById("follow_" + currentSuggestion).parentElement;
    var account = suggestion.getElementsByClassName("account-username")
    var currentFollower = null
    for(let i = 0; i < data2.length; i++){
        if(data2[i].following.first_name.toLowerCase() == account[0].innerHTML){
            currentFollower = data2[i]
        }
    }
    
    var test = ``
    if(currentFollower != null){
        test = getFollow(currentSuggestion, currentFollower, i, length)
    }else{
        test = getFollow(currentSuggestion, null, i, length)
    }

     targetElementAndReplace(`follow_${currentSuggestion}`, test);
}

window.createFollow = async (currentSuggestion, i, length) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/following/`;

    const postData = {
        "user_id": currentSuggestion // replace with the actual post ID
    };

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'luke', 'luke_password')
        },
        body: JSON.stringify(postData)
    })

    const data = await response.json();
    redrawFollow(currentSuggestion, i, length)
}

window.deleteFollow = async (currentSuggestion, currentFollow, i, length) => {
    const endpoint = `${rootURL}/api/following/${currentFollow}`;
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'luke', 'luke_password')
        }
    })
    const data = await response.json();
    redrawFollow(currentSuggestion, i, length);
}

const getFollow = (currentSuggestion, currentFollow, i, length) => {

    if (currentFollow != null && currentSuggestion == currentFollow.following.id) {
        return `<div class="follow" id="follow_${currentSuggestion}"><button id="follow_${currentSuggestion}" onclick="deleteFollow(${currentSuggestion}, ${currentFollow.id}, ${i}, ${length})" class="follow-link" aria-checked="true" aria-label="follow ${i + 1} of ${length}">unfollow</button></div>`;
    }
    return `<div class="follow" id="follow_${currentSuggestion}"><button id="follow_${currentSuggestion}" onclick="createFollow(${currentSuggestion}, ${i}, ${length})" class="follow-link" aria-checked="false" aria-label="follow ${i + 1} of ${length}">follow</button></div>`;
}

const followToHTML = (currentSuggestion, currentFollow, i, length) => {
    return `${getFollow(currentSuggestion, currentFollow, i, length)}`;
}

// END OF FOLLOW FUNCTIONS



// START OF COMMENT FUNCTIONS

const redrawComment = async(currentPost) => {
    const token = await getAccessToken(rootURL, 'luke', 'luke_password');
    const endpoint = `${rootURL}/api/posts`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();

    let hi 
    for(let i = 0; i < data.length; i++){
        if(data[i].id == currentPost){
            hi = data[i]
        }
    }

    let commentsGreaterThanOne = (hi.comments.length > 1 ? true : false);
    // if(commentsGreaterThanOne){

    // }

    targetElementAndReplace(`comment_username2_${currentPost}`, getComment(hi));
    targetElementAndReplace(`view-all-comments-btn-${currentPost}`, getCommentCount(hi, commentsGreaterThanOne))
}

window.createPostComment = async (currentPost) => {
    let text = document.getElementById("comment_text_"+currentPost).value

    const endpoint = `${rootURL}/api/comments/`;
    const postData = {
        "post_id": currentPost,
        "text": text
    };
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'luke', 'luke_password')
        },
        body: JSON.stringify(postData)
    })
    
    const data = await response.json();
    redrawComment(currentPost);
}

const getComment = (currentPost) => {
    console.log("currentPost in getComment " + currentPost);
    return `<div id="comment_username2_${currentPost.id}" class="comment_username2">
                ${currentPost.comments[currentPost.comments.length - 1].user.username}
                <span class="comment-text">
                        ${currentPost.comments[currentPost.comments.length - 1].text}
                </span>
                <div class="days-ago2">
                    ${currentPost.comments[currentPost.comments.length - 1].display_time.toUpperCase()}
                </div>
            </div>`;
}

const getCommentCount = (currentPost, commentsGreaterThanOne) => {
    let commentsGreaterThanOneHTML = ``
    let firstComment
    if(commentsGreaterThanOne){
        commentsGreaterThanOneHTML = `<span id="view-all-comments-btn-${currentPost.id}"><a href="#" id="view-all-comments-btn" class="view-all-comments-btn-${currentPost.id}" onClick="(function(){
            var cardComments = document.getElementById('card-comments-${currentPost.id}'); 
            cardComments.style.display = 'block';
            const triggerButton = document.querySelector('#modal_close_${currentPost.id}');
            triggerButton.focus();
        })(); return false;">View all ${currentPost.comments.length} comments</a></span>`
    }else{
        commentsGreaterThanOneHTML = `<span id="view-all-comments-btn-${currentPost.id}"><a href="#" id="view-all-comments-btn"; return false;"></a></span>`
    }

    return commentsGreaterThanOneHTML
}

const commentCountToHTML = (currentPost, commentsGreaterThanOne) => {
    return `${getCommentCount(currentPost, commentsGreaterThanOne)}`;
}


const commentToHTML = (currentPost) => {
    // console.log("heres the current post: " + currentPost)
    return `${getComment(currentPost)}`;
}

// END OF COMMENT FUNCTIONS

// FOR ARIA FUNCTIONS

const getPostNum = async (currentPost) => {
    const token = await getAccessToken(rootURL, 'luke', 'luke_password');
    const endpoint = `${rootURL}/api/posts`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();

    const postId = data.id;
    console.log(postId + "post id");
    return postId;

} 

// END OF ARIA FUNCTIONS


const targetElementAndReplace = (selector, newHTML) => { 
	const div = document.createElement('div'); 
	div.innerHTML = newHTML;
	const newEl = div.firstElementChild; 
    const oldEl = document.getElementById(selector);
    oldEl.parentElement.replaceChild(newEl, oldEl);
}

const showUserProfile = async (token) => {
    const endpoint = `${rootURL}/api/profile`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('User Profile:', data); 
    const userDiv = document.getElementById('user-profile');
    userDiv.innerHTML =         `
        <img src="${data.image_url}" alt="profile picture" class="user-pic">
        <div class="username-rec"><b>${data.username}</b></div>
    `;
};

const showSuggestions = async (token) => {
    const endpoint = `${rootURL}/api/suggestions`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();

    const endpoint2 = `${rootURL}/api/following`;
    const response2 = await fetch(endpoint2, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })

    
    const data2 = await response2.json();
    
    console.log('Suggestions:', data);
    console.log('Following: ', data2);

    let suggestionResults = ``
    for(let i = 0; i < data.length; i++){
        let currentSuggestion = data[i];
        let currentFollow = data2[i];
        suggestionResults +=  
            `
            <div class="account">
                <img src="${currentSuggestion.image_url}" alt="account1" class="account-pic">
                <div class="account-info">
                    <div class="account-username">${currentSuggestion.username}</div>
                    <div class="suggested-for-you">Suggested for you</div>
                </div>
                ${followToHTML(currentSuggestion.id, currentFollow, i, data.length)}
            </div>
            `
    }    
    const resultsDiv = document.getElementById('suggested-accounts');
    resultsDiv.innerHTML = suggestionResults;
}

const showStories = async (token) => {
    const endpoint = `${rootURL}/api/stories`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Stories:', data);
    let storiesResults = ``
    for(let i = 0; i < data.length; i++){
        let currentStory = data[i];
        storiesResults +=  
            `
            <div class="story">
                <img src="${currentStory.user.image_url}" class="story-pic">
                <div class ="storyname">
                    <a href="#" class="storyname">${currentStory.user.username}</a>
                </div>
            </div>
            `
    }    
    const resultsDiv = document.getElementById('story-panel');
    resultsDiv.innerHTML = storiesResults;
}

const showPosts = async (token) => {
    const endpoint = `${rootURL}/api/posts`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    console.log('Posts:', data);


    let postResults = ``
    for(let i = 0; i < data.length; i++){
        let currentPost = data[i];
        let currentCommentHTML = ``
        let commentsGreaterThanOne = (currentPost.comments.length > 1 ? true : false);
        let firstComment = ``;

        for(let j = 0; j < currentPost.comments.length; j++){
            let currentComment = currentPost.comments[j];
            currentCommentHTML += 
            `  <div class="card-comment">
                    <div class="comment-user-pic-div">
                        <img src="${currentComment.user.image_url}" class="comment-user-pic"/>
                    </div>
                    <span class="comment_username">
                        ${currentComment.user.username} 
                        <span class="comment-text">${currentComment.text}</span>
                        <div class="days-ago">${currentComment.display_time}</div>
                    </span>
                    <div class="heart-side">
                        <a href="#" class="icon-properties">
                            <i class="far fa-heart fa-regular"></i>
                        </a>
                    </div>
               </div>
            `

            if(commentsGreaterThanOne == false){
                firstComment = `<div class="comment_username2">
                                    ${currentComment.user.username}
                                    <span class="comment-text">
                                         ${currentComment.text}
                                    </span>
                                    <div class="days-ago2">${currentPost.display_time.toUpperCase()}</div>
                                </div>
                                `
            }
        }

        postResults +=  
            `
            <div class="card">
                <div class="card-header">
                    <div class="username">${currentPost.user.username}</div>
                        <div class="dots">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                    <img src="${currentPost.image_url}" alt="post picture" class="post-pic">
                    <div class="card-actions">
                        ${likeToHTML(currentPost, i, data.length)}
                        <div class="comment">
                            <a href="#" class="icon-properties"><i class="fas fa-comment"></i></a>
                        </div>
                        <div class="plane">
                            <a href="#" class="icon-properties"><i class="far fa-paper-plane"></i></a>
                        </div>    
                        ${bookmarkToHTML(currentPost, i, data.length)}
                    </div>
                    ${likeCountToHTML(currentPost)}
                        <div class="card-caption">
                            <span class="comment_username">
                                ${currentPost.user.username}
                                <span class ="comment-text">
                                ${currentPost.caption}  
                                </span>
                                <div class="days-ago2">${currentPost.display_time.toUpperCase()}</div>
                            </span> 
                            
                            <!--                        <a href="#" class="more-link">more</a> -->
                        </div>
                        ${commentCountToHTML(currentPost, commentsGreaterThanOne)}
                        ${commentsGreaterThanOne ? 
                            `${commentToHTML(currentPost)}`
                        : `<div id="comment_username2_${currentPost.id}" class="comment_username2"></div>`}
                        <div id="card-comments-${currentPost.id}" class="modal" role="dialog"> 
                            <a href="#" id="modal_close_${currentPost.id}" onClick="(function(){
                                var cardComments = document.getElementById('card-comments-${currentPost.id}'); 
                                cardComments.style.display = 'none';
                                const closeControl = document.querySelector('.view-all-comments-btn-${currentPost.id}');
                                closeControl.focus();
                            })(); return false;"><span class="close">&times;</span></a>
                            <div class="modal-content">
                                <div class="modal-image-div">
                                    <img src="${currentPost.image_url}" alt="post picture" class="modal-image">
                                </div>
                                <div class="modal_poster_info_and_comments">
                                    <div class="modal_poster_info">
                                        <div class="user_pic">
                                            <img class="account-pic" src="${currentPost.user.image_url}" />
                                        </div>
                                        <div class="username">
                                            ${currentPost.user.username}
                                        </div>
                                    </div>
                                    <div class="all-comments">
                                        ${currentCommentHTML}
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="card-add-comment">
                        <div class="smile">
                            <a href="#" class="icon-properties"><i class="far fa-smile"></i></a>
                        </div>
                        <input id="comment_text_${currentPost.id}" type="text" placeholder="Add a comment..." >
                        <div id="post-link_${currentPost.id}"><button onclick="createPostComment(${currentPost.id})" class="post-link">Post</button></div>
                    </div>
                </div>
            `    
    }    
    // <div class="bookmark" id="bookmark_${currentPost.id}"><a class="icon-properties" onclick="createBookmark(${currentPost.id})"><i class="far fa-bookmark"></i></a></div>
    // <div id="post-link_${currentPost.id}"><a href="#" onclick="createComment(${currentPost.id})">Post</a></div>
    const resultsDiv = document.getElementById('card-block');
    resultsDiv.innerHTML = postResults;
}

const initPage = async () => {
    // first log in (we will build on this after Spring Break):
    const token = await getAccessToken(rootURL, 'luke', 'luke_password');
    console.log(token)
    
    // then use the access token provided to access data on the user's behalf
    showUserProfile(token);
    showSuggestions(token);
    showStories(token);
    showPosts(token);
}

initPage();

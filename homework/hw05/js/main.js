import {getAccessToken} from './utilities.js';
const rootURL = 'https://photo-app-secured.herokuapp.com';

// START OF BOOKMARK FUNCTIONS

const redrawBookmark = async (currentPost) => {
    const endpoint = `${rootURL}/api/posts/${currentPost}`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'webdev', 'password')
        }
    })
    const data = await response.json();
    const htmlString = bookmarkToHTML(data);
    
    targetElementAndReplace(`bookmark_${currentPost}`, htmlString);
}

window.createBookmark = async (currentPost) => {
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
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'webdev', 'password')
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    redrawBookmark(currentPost);
}

window.deleteBookmark = async (currentPost, currentBookmark) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/bookmarks/${currentBookmark}`;

    // Create the bookmark:
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'webdev', 'password')
        }
    })

    const data = await response.json();
    redrawBookmark(currentPost);
}

const getBookmark = (currentPost) => {
    if (currentPost.current_user_bookmark_id) {
        return `<div class="bookmark" id="bookmark_${currentPost.id}"><a class="icon-properties" onclick="deleteBookmark(${currentPost.id}, ${currentPost.current_user_bookmark_id})"><i class="fas fa-bookmark"></i></a></div>`;
    }
    return `<div class="bookmark" id="bookmark_${currentPost.id}"><a class="icon-properties" onclick="createBookmark(${currentPost.id})"><i class="far fa-bookmark"></i></a></div>`;
}

const bookmarkToHTML = currentPost => {
    return `${getBookmark(currentPost)}`;
}

// END OF BOOKMARK FUNCTIONS

// START OF LIKE FUNCTIONS

const redrawLike = async (currentPost) => {
    const endpoint = `${rootURL}/api/posts/${currentPost}`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'webdev', 'password')
        }
    })
    const data = await response.json();
    const htmlString = likeToHTML(data);
    
    targetElementAndReplace(`heart_${currentPost}`, htmlString);
}

window.createLike = async (currentPost) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/posts/likes/`;
    const postData = {
        "post_id": currentPost // replace with the actual post ID
    };

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'webdev', 'password')
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    redrawLike(currentPost);
}

window.deleteLike = async (currentPost, currentLike) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/posts/likes/${currentLike}`;

    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'webdev', 'password')
        }
    })

    const data = await response.json();
    redrawLike(currentPost);
}

const getLike = (currentPost) => {
    if (currentPost.current_user_like_id) {
        return `<div class="heart" id="heart_${currentPost.id}"><a class="icon-properties" onclick="deleteLike(${currentPost.id}, ${currentPost.current_user_like_id})"><i class="fas fa-heart liked_post"></i></a></div>`;
    }
    return `<div class="heart" id="heart_${currentPost.id}"><a class="icon-properties" onclick="createLike(${currentPost.id})"><i class="far fa-heart fa-regular"></i></a></div>`;
}

const likeToHTML = currentPost => {
    return `${getLike(currentPost)}`;
}

// END OF LIKE FUNCTIONS

// START OF FOLLOW FUNCTIONS

const redrawFollow = async (currentSuggestion) => {
    const endpoint = `${rootURL}/api/following/${currentSuggestion}`;
    console.log("current here " + currentSuggestion);
    console.log(currentSuggestion);
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'webdev', 'password')
        }
    })
    const data = await response.json();
    const htmlString = followToHTML(data);
    targetElementAndReplace(`follow_${currentSuggestion}`, htmlString);
}

window.createFollow = async (currentSuggestion) => {
    // define the endpoint:
    const endpoint = `${rootURL}/api/following`;
    const postData = {
        "post_id": currentSuggestion // replace with the actual post ID
    };

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'webdev', 'password')
        },
        body: JSON.stringify(postData)
    })
    const data = await response.json();
    // console.log("data: " + currentPost);
    redrawFollow(currentSuggestion);
}

window.deleteFollow = async (currentSuggestion, currentFollow) => {
    // define the endpoint:
    console.log("currentFollow: " + currentFollow)
    const endpoint = `${rootURL}/api/following/${currentFollow}`;
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'webdev', 'password')
        }
    })
    const data = await response.json();
    console.log(data);
    // console.log("data: " + data);
    redrawFollow(currentSuggestion);
}

window.isFollowing = async() => {
    const endpoint = `${rootURL}/api/following`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await getAccessToken(rootURL, 'webdev', 'password')
        },
    })
    const data = await response.json();
    console.log(data);
    return data;
}

const getFollow = (currentSuggestion) => {
    // console.log("currentSuggestion: " + currentSuggestion.id);
    // console.log("following: " + currentSuggestion.following);
    console.log("current id " + currentSuggestion.id);
    console.log("is follow id " + isFollowing().id);
    if (currentSuggestion.id == isFollowing().id) {
        console.log("id: " + currentSuggestion.id);
        return `<div class="follow" id="follow_${currentSuggestion.id}"><a id="follow_${currentSuggestion.id}" onclick="deleteFollow(${currentSuggestion.id, isFollowing().following})" class="follow-link">follow</a></div>`;
    }
    return `<div class="follow" id="follow_${currentSuggestion.id}"><a id="follow_${currentSuggestion.id}" onclick="createFollow(${currentSuggestion.id})" class="follow-link">unfollow</a></div>`;
}

const followToHTML = currentSuggestion => {
    return `${getFollow(currentSuggestion)}`;
}


// END OF FOLLOW FUNCTIONS

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
    const userDiv = document.getElementById('user-profile')
    userDiv.innerHTML =         `
        <img src="${data.image_url}" alt="profile picture" class="user-pic">
        <div class="username-rec"><b>${data.username}</b></div>
    `
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
    console.log('Suggestions:', data);

    let suggestionResults = ``
    for(let i = 0; i < data.length; i++){
        let currentSuggestion = data[i];
        suggestionResults +=  
            `
            <div class="account">
                <img src="${currentSuggestion.image_url}" alt="account1" class="account-pic">
                <div class="account-info">
                    <div class="account-username">${currentSuggestion.username}</div>
                    <div class="suggested-for-you">Suggested for you</div>
                </div>
                ${followToHTML(currentSuggestion)}
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
                        ${likeToHTML(currentPost)}
                        <div class="comment">
                            <a href="#" class="icon-properties"><i class="fas fa-comment"></i></a>
                        </div>
                        <div class="plane">
                            <a href="#" class="icon-properties"><i class="far fa-paper-plane"></i></a>
                        </div>    
                        ${bookmarkToHTML(currentPost)}
                    </div>
                    <div class="card-likes">${currentPost.likes.length} likes</div>
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
                        ${commentsGreaterThanOne ? `<a href="#" id="view-all-comments-btn" class="view-all-comments-btn-${i}" onClick="(function(){
                            var cardComments = document.getElementById('card-comments-${i}'); 
                            cardComments.style.display = 'block';
                            const triggerButton = document.querySelector('#modal_close_${i}');
                            triggerButton.focus();
                        })(); return false;">View all ${currentPost.comments.length} comments </a>` 
                        : firstComment}
                        ${commentsGreaterThanOne ? 
                            `<div class="comment_username2">
                                ${currentPost.comments[0].user.username}
                                <span class="comment-text">
                                        ${currentPost.comments[0].text}
                                </span>
                                <div class="days-ago2">
                                    ${currentPost.comments[0].display_time.toUpperCase()}
                                </div>
                            </div>`
                        : `<div></div>`}
                        <div id="card-comments-${i}" class="modal" role="dialog"> 
                            <a href="#" id="modal_close_${i}" onClick="(function(){
                                var cardComments = document.getElementById('card-comments-${i}'); 
                                cardComments.style.display = 'none';
                                const closeControl = document.querySelector('.view-all-comments-btn-${i}');
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
                        <input type="text" placeholder="Add a comment...">
                        <a href="#" class="post-link">Post</a>
                    </div>
                </div>
            `    
    }    
    const resultsDiv = document.getElementById('card-block');
    resultsDiv.innerHTML = postResults;
}

const initPage = async () => {
    // first log in (we will build on this after Spring Break):
    const token = await getAccessToken(rootURL, 'webdev', 'password');

    // then use the access token provided to access data on the user's behalf
    showUserProfile(token);
    showSuggestions(token);
    showStories(token);
    showPosts(token);
}

initPage();

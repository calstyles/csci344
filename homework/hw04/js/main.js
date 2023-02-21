import {getAccessToken} from './utilities.js';
const rootURL = 'https://photo-app-secured.herokuapp.com';

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
//    console.log('Suggestions:', data);

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
                <a href="#" class="follow-link">follow</a>
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
                    ${currentComment.user.username} <span class="comment-text">${currentComment.text}</span>
                    <div class="days-ago">${currentComment.display_time}</div>
                </span>
                <div class="heart-side"><i class="far fa-heart fa-regular"></i></div>
               </div>
            `

            if(commentsGreaterThanOne == false){
                firstComment = `<div class="card-comment">
                    <span class="comment_username">
                        ${currentComment.user.username}
                    </span>
                    
                    <span class="comment-text">
                        ${currentComment.text}
                    </span>
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
                        <div class="heart">
                            <i ${currentPost.current_user_like_id == null ? `class="far fa-heart fa-regular"` : `class="fas fa-heart liked_post"`}></i>
                        </div>
                        <div class="comment">
                            <i class="fas fa-comment"></i>
                        </div>
                        <div class="plane">
                            <i class="far fa-paper-plane"></i>
                        </div>    
                        <div class="bookmark">
                            <i ${currentPost.current_user_bookmark_id == null ? `class="far fa-bookmark"` : `class="fas fa-bookmark"`}></i>
                        </div>
                    </div>
                <div class="card-likes">${currentPost.likes.length} likes</div>
                    <div class="card-caption">
                        <span class="username">${currentPost.user.username}</span>
                        <span class="caption-text">${currentPost.caption}</span>
                        <a href="#" class="more-link">more</a>
                    </div>
                    ${commentsGreaterThanOne ? `<a href="#" id="view_all_comments" onClick="(function(){
                        var cardComments = document.getElementById('card-comments-${i}'); 
                        cardComments.style.display = 'block';
                    })(); return false;">View all ${currentPost.comments.length} comments </a>` 
                    : firstComment}
                <div id="card-comments-${i}" class="modal"> 
                    <a href="#" id="modal_close" onClick="(function(){
                        var cardComments = document.getElementById('card-comments-${i}'); 
                        cardComments.style.display = 'none';
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
                                    <div class="username">${currentPost.user.username}</div>
                                </div>
                                <div class="all-comments">
                                    ${currentCommentHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="card-add-comment">
                    <div class="smile">
                        <i class="far fa-smile"></i>
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

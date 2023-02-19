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

    let results = ``
    for(let i = 0; i < data.length; i++){
        let currentSuggestion = data[i];
        results +=  
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
    resultsDiv.innerHTML = results;
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
    let results = ``
    for(let i = 0; i < data.length; i++){
        let currentStory = data[i];
        results +=  
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
    resultsDiv.innerHTML = results;
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
    let results = ``
    for(let i = 0; i < data.length; i++){
        let currentPost = data[i];
        results +=  
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
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="comment">
                            <i class="fas fa-comment"></i>
                        </div>
                        <div class="plane">
                            <i class="far fa-paper-plane"></i>
                        </div>    
                        <div class="bookmark">
                            <i class="fas fa-bookmark"></i>
                        </div>
                    </div>
                <div class="card-likes">${currentPost.likes.length}</div>
                    <div class="card-caption">
                        <span class="username">${currentPost.user.username}</span>
                        <span class="caption-text">${currentPost.caption}</span>
                        <a href="#" class="more-link">more</a>
                    </div>
                <div class="card-comments"> 
                    <div class="card-comment">
                        <span class="username">dogge</span>
                        <span class="comment-text">Nice pic!</span>
                    </div>
                    <div class="card-comment">
                        <span class="username">numbahDeux</span>
                        <span class="comment-text">Wow, this is beautiful!</span>
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
    resultsDiv.innerHTML = results;
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

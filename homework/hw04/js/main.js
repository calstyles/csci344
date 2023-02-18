import {getAccessToken} from './utilities.js';
const rootURL = 'https://photo-app-secured.herokuapp.com';

const showUserProfile = async (token) => {0
    const endpoint = `${rootURL}/api/profile`;
    const headers = new Headers({'Content-Type': 'application/json'}, {'Authorization' : `Bearer ${token}`});
    const response = await fetch(endpoint, headers);
    const data = await response.json();
    console.log('User Profile:', data);

    const userPic = document.querySelector('.user-pic');
    const usernameRec = document.querySelector('.username-rec');
    const usernameProfile = document.querySelector('.username-profile');

    userPic.src = data.profile_pic;
    usernameRec.textContent = data.username;
    usernameProfile.textContent = data.username;
};

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
}

const showPosts = async (token) => {
    console.log('code to show posts');
}

const initPage = async () => {
    // first log in (we will build on this after Spring Break):
    const token = await getAccessToken(rootURL, 'webdev', 'password');

    // then use the access token provided to access data on the user's behalf
    showStories(token);
    showPosts(token);
    showUserProfile(token);
}

initPage();

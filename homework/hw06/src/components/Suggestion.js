import React from 'react';
import {getHeaders} from '../utils';
import { useState, useEffect } from "react";

    
export default function Suggestion({suggestion, token}) { 
    const [isFollowing, setIsFollowing] = useState(null);


    async function requerySuggestion(){
        let isFollowing = false;
        const response = await fetch('/api/following', {
            headers: getHeaders(token)
        });
        const data = await response.json();
        // console.log("follow are here");
        // console.log(data);
        
        for(let i = 0; i < data.length; i++){
            if(suggestion == data[i]){
                isFollowing = true;
            }
        }
        setIsFollowing(isFollowing);
    }  

    async function followUser(){
        const endpoint = "https://photo-app-secured.herokuapp.com/api/following";
        const postData = {
            "user_id": suggestion.id
        };

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(postData)
        })
        const data = await response.json();
        requerySuggestion();
    }

    async function unfollowUser(){
        const endpoint = "https://photo-app-secured.herokuapp.com/api/following/" + suggestion.id;
        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        const data = await response.json();
        requerySuggestion();
    }

    console.log(isFollowing);

    if(!isFollowing){
        return (
            <div className="suggestion">
                <img className="user-pic" src={suggestion.image_url} key={"suggestion_image_" + suggestion.id}></img>
                <div className='suggestion-words'>
                    <div className="suggestion-info">
                        <div key={"suggestion_username_" + suggestion.id}>{suggestion.username}</div>
                        <div className="suggested-for-you">Suggested for you</div>
                    </div>
                    <div className="followButton">
                        <button type="submit" className="icon-properties" onClick={followUser}>follow</button>
                    </div>
                </div>
            </div>
        ); 
    }

    requerySuggestion();
    return (
        <div className="suggested-accounts">
            <img className="user-pic" src={suggestion.image_url} key={"suggestion_image_" + suggestion.id}></img>
            <div className="suggestion-info">
                <div key={"suggestion_username_" + suggestion.id}>{suggestion.username}</div>
                <div className="suggested-for-you">Suggested for you</div>
                <div className="followButton">
                    <button type="submit" className="icon-properties" onClick={unfollowUser}>unfollow</button>
                </div>
            </div>    
        </div>
    );        
}
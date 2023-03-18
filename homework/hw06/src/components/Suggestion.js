import React from 'react';
import {getHeaders} from '../utils';
import { useState, useEffect } from "react";

    
export default function Suggestion({ suggestion, token }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [currentFollow, setCurrentFollow] = useState(null);
  
    async function requerySuggestion() {
      const response = await fetch('/api/following', {
        headers: getHeaders(token),
      });
      const data = await response.json();
      const isFollowing = data.some((user) => user.id === suggestion.id);
      setIsFollowing(isFollowing);
    }
  
    useEffect(() => {
      requerySuggestion();
    }, []);
  
    async function followUser() {
      const endpoint = 'https://photo-app-secured.herokuapp.com/api/following';
      const postData = {
        user_id: suggestion.id,
      };
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      console.log(data);
      
      setCurrentFollow(data.following.id);
      setIsFollowing(true);
    }
  
    async function unfollowUser() {
        console.log(currentFollow);
        const endpoint = 'https://photo-app-secured.herokuapp.com/api/following/' + currentFollow;
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            },
        });
        const data = await response.json();
        console.log(data);
        setIsFollowing(false);
        setCurrentFollow(null);
    }
  
    return (
        <div className="suggestion">
            <img className="user-pic" src={suggestion.image_url} key={'suggestion_image_' + suggestion.id}/>
            <div className="suggestion-words">
                <div className="suggestion-info">
                    <div key={'suggestion_username_' + suggestion.id}>
                        {suggestion.username}
                    </div>
                    <div className="suggested-for-you">Suggested for you</div>
                </div>
                <div className="followButton">
                    {isFollowing && suggestion.id == currentFollow? (
                        <button type="submit" className="icon-properties" onClick={unfollowUser}>unfollow</button>
                        ) : (
                        <button type="submit" className="icon-properties" onClick={followUser}>follow</button>
                    )}
                </div>
            </div>
      </div>
    );
  }
import React, { useState, useEffect } from 'react';
import LikeButton from './LikeButton';
import {getHeaders} from '../utils';

export default function Post({post, token}) { 
    const [currentLikeId, setCurrentLikeId] = useState(post.current_user_like_id);

    async function requeryPost(){
        const response = await fetch("https://photo-app-secured.herokuapp.com/api/posts/" + post.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        setCurrentLikeId(data.current_user_like_id);
    }
    
    return (
        <div className="card">   
            <div key={"post_username_" + post.id}>{post.user.username}</div>
            <img src={post.image_url} key={"post_image_" + post.id}></img>
            <div key={"post_caption_" + post.id}>{post.caption}</div>
            <LikeButton post={post} currentLikeId={currentLikeId} requeryPost={requeryPost} token={token}/>
        </div>
    );     
}
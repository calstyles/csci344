import React from 'react';
import LikeButton from './LikeButton';
import {getHeaders} from '../utils';
import { useState, useEffect } from "react";


export default function Post({post, token}) { 
    async function requeryPost(){
        // console.log("requery posts");
        const response = await fetch("https://photo-app-secured.herokuapp.com/api/posts/" + post.id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        console.log(data);
    }
    
    return (
        <div className="card">   
            <div key={"post_username_" + post.id}>{post.user.username}</div>
            <img src={post.image_url} key={"post_image_" + post.id}></img>
            <div key={"post_caption_" + post.id}>{post.caption}</div>
            <LikeButton post={post} requeryPost={requeryPost} token={token}/>
        </div>
    );     
}
import React from 'react';
import {getHeaders} from '../utils';
import requeryPost from './Post'
import { useState, useEffect } from "react";

export default function AddComment({post, requeryPost, token}) {


    async function postComment(currentPost) {
        console.log("comment-text_" + currentPost);

        let text = document.getElementsByClassName("comment-text_" + currentPost)[0].value;
        const endpoint = 'https://photo-app-secured.herokuapp.com/api/comments/';

        const postData = {
            "post_id" : currentPost,
            "text" : text
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
        requeryPost(post);
    }

    return(
        <div className="card-add-comment">
            <div className="smile">
                <a href="#" className="icon-properties">
                    <i className="far fa-smile" />
                </a>
            </div>

            <input className={"comment-text_" + post.id} type="text" placeholder="Add a comment..." onKeyDown={(event) => {if (event.keyCode === 13) {postComment(post.id)}}} />
            <div className="postButton">
                <button type="submit" className={"post-link_" + post.id} onClick={() => postComment(post.id)}>Post</button>
            </div>
        </div>
                
    );
}
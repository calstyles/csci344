import React from 'react';
import Post from './Post';
import {getHeaders} from '../utils';
import { useState, useEffect } from "react";


export default function Posts({token}) { 
    const [posts, setPosts] = useState(null); 
    const [postsLength, setPostsLength] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('/api/posts', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setPosts(data);
            setPostsLength(data.length);
        }
        fetchPosts();
    }, [token]);

    if (!posts) {
        return '';
    }
    return (
        posts.map((post, index) => {
            return (
                <Post post={post} token={token} index={index} length={postsLength} key={"post_" + post.id}/>
            )
        })
    );     
}
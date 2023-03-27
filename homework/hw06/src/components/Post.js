import React, { useState, useEffect } from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
import {getHeaders} from '../utils';

export default function Post({post, token}) { 
    const [currentLikeId, setCurrentLikeId] = useState(post.current_user_like_id);
    const [currentBookmarkId, setCurrentBookmarkId] = useState(post.current_user_bookmark_id);
    const [currentLikeLength, setCurrentLikeLength] = useState(post.likes.length);
    const [comments, setComments] = useState(post.comments);

    async function requeryPost(){
        const response = await fetch("https://photo-app-secured.herokuapp.com/api/posts/" + post.id, {
            headers: getHeaders(token)
        });
        const data = await response.json();
        setCurrentLikeId(data.current_user_like_id);
        setCurrentBookmarkId(data.current_user_bookmark_id);
        setCurrentLikeLength(data.likes.length);     
        setComments(data.comments);
    }

    return (
        <div className="card">
            <div key={"post_username_" + post.id}>{post.user.username}</div>
            <img src={post.image_url} key={"post_image_" + post.id}></img>
            <div key={"post_caption_" + post.id}>{post.caption}</div>
            <LikeButton post={post} currentLikeId={currentLikeId} requeryPost={requeryPost} token={token} key={"likeButton_" + post.id} />
            <div>{currentLikeLength} likes</div>
            <BookmarkButton post={post} currentBookmarkId={currentBookmarkId} requeryPost={requeryPost} token={token} key={"bookmarkButton_" + post.id} />
            <div className="comments">
                {comments.map((comment) => (
                    <div key={comment.id} dangerouslySetInnerHTML={{ __html: comment.text }} />
                ))}
            </div>
            <AddComment post={post} requeryPost={requeryPost} token={token} key={"post_" + post.id} />
        </div>
    );
}
import React, { useState } from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
import { getHeaders } from '../utils';

export default function Post({ post, token, index, length }) {
    const [currentLikeId, setCurrentLikeId] = useState(post.current_user_like_id);
    const [currentBookmarkId, setCurrentBookmarkId] = useState(post.current_user_bookmark_id);
    const [currentLikeLength, setCurrentLikeLength] = useState(post.likes.length);
    const [showAllComments, setShowAllComments] = useState(false);
    const [comments, setComments] = useState(post.comments);

    async function requeryPost() {
        const response = await fetch('https://photo-app-secured.herokuapp.com/api/posts/' + post.id, {
            headers: getHeaders(token),
          }
        );
        const data = await response.json();
        setCurrentLikeId(data.current_user_like_id);
        setCurrentBookmarkId(data.current_user_bookmark_id);
        setCurrentLikeLength(data.likes.length);
        setComments(data.comments);
    }

    const likeLabel = `like ${index + 1} of ${length}`;
    const bookmarkLabel = `bookmark ${index + 1} of ${length}`;

    const handleViewCommentsClick = () => {
        setShowAllComments(true);
    };

    const handleCloseModalClick = () => {
        setShowAllComments(false);
    };

    return (
        <div className="card">
            <div key={'post_username_' + post.id}>{post.user.username}</div>
            <img src={post.image_url} className="post-pic" key={'post_image_' + post.id}></img>
            <div key={'post_caption_' + post.id}>{post.caption}</div>
            {post.display_time.toUpperCase()}
            <div className='card-actions'>
                <div className='heart'>
                    <LikeButton post={post} currentLikeId={currentLikeId} requeryPost={requeryPost} token={token} ariaLabel={likeLabel} key={'like_' + post.id}/>
                </div>
                <div className="comment">
                    <button href="#" className="icon-properties"><i className="fas fa-comment"></i></button>
                </div>
                <div className="plane">
                    <button href="#" className="icon-properties"><i className="far fa-paper-plane"></i></button>
                </div>
                <div className='bookmark'>
                    <BookmarkButton post={post} currentBookmarkId={currentBookmarkId} requeryPost={requeryPost} setCurrentBookmarkId={setCurrentBookmarkId} token={token} ariaLabel={bookmarkLabel} key={'bookmarkButton_' + post.id}/>
                </div>
            </div>
            <div className='card-likes'>{currentLikeLength} likes</div>
            {comments.map((comment, i) => {
                if (i === comments.length - 1) {
                    return (
                        <div key={'comment_' + comment.id}>
                            <div>{comment.user.username}</div>
                            <div>{comment.text}</div>
                            <div>{comment.display_time}</div>
                        </div>
                    );
                }
            })}
            {comments.length > 1 && !showAllComments && (
              <button onClick={handleViewCommentsClick}>View all {comments.length} comments</button>
            )}
            {showAllComments && (
              <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-image-div"><img src={post.image_url} key={"modal-img-" + post.id}></img></div>
                                <div className='all-comments'>
                                    {comments.map((comment) => (
                                        <div key={'comment_' + comment.id}>
                                            <div>{comment.user.username}</div>
                                            <div>{comment.text}</div>
                                            <div>{comment.display_time}</div>
                                        </div>
                                    ))}
                                </div>
                            <button onClick={handleCloseModalClick}><span className="close">&times;</span></button>
                        </div>
                    </div>
              </div>
            )}
            <AddComment post={post} requeryPost={requeryPost} token={token} key={"post_" + post.id} />
        </div>
    );
}
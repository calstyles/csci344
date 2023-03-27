import React from 'react';

export default function LikeButton({post, currentLikeId, requeryPost, token, ariaLabel}) { 
    async function likePost(){
        const endpoint = "https://photo-app-secured.herokuapp.com/api/posts/likes/";
        const postData = {
            "post_id": post.id // replace with the actual post ID
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
        requeryPost();
    }

    async function unLikePost(){
        const endpoint = "https://photo-app-secured.herokuapp.com/api/posts/likes/" + currentLikeId;
        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        const data = await response.json();
        requeryPost();
    }

    if(currentLikeId != null){
        return (
            <button type="button" className="icon-properties" onClick={unLikePost}><i className="fas fa-heart fa-regular" aria-checked="true" aria-label={ariaLabel} role="switch"></i></button>
        ); 
    }

    return (
            <button type="button" className="icon-properties" onClick={likePost}><i className="far fa-heart liked_post" aria-checked="false" aria-label={ariaLabel} role="switch"></i></button>
    );        
}
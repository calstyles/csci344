import React from 'react';

export default function LikeButton({post, requeryPost, token}) { 
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
        const endpoint = "https://photo-app-secured.herokuapp.com/api/posts/likes/" + post.current_user_like_id;
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



    if(post.current_user_like_id != null){
        return (
            <div className="heart">
                <a className="icon-properties"><i className="far fa-heart liked_post" onClick={unLikePost}></i></a>
            </div>
        ); 
    }
    
    return (
        <div className="heart">
            <a className="icon-properties"><i className="fas fa-heart fa-regular" onClick={likePost}></i></a>
        </div>
    );        

}
import React from 'react';

export default function LikeButton({post, requeryPost, token}) { 
   //: `class="fas fa-heart liked_post"`}

    async function likePost(){
        console.log("like post");
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

    return (
        <div className="heart">
            <a className="icon-properties"><i className="far fa-heart fa-regular" onClick={likePost}></i></a>
        </div>
    ); 

}
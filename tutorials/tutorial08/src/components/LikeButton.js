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

        // console.log("likePost");
        // console.log(data);
        requeryPost();
    }

    async function unLikePost(likeID){
        // console.log("likeID");
        // console.log(likeID);
        // console.log("post");
        // console.log(post);
        const endpoint = "https://photo-app-secured.herokuapp.com/api/posts/likes/" + likeID;
        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
    
        const data = await response.json();
        // console.log("unLikePost");
        // console.log(data);
        requeryPost();
    }
    
    if(post.current_user_like_id){
        // console.log("post that ran like button");
        // console.log(post);
        // console.log("post ID");
        // console.log(post.current_user_like_id);
        return (
            <div className="heart">
                <a className="icon-properties"><i className="fas fa-heart liked_post" onClick={unLikePost(post.current_user_like_id)}></i></a>
            </div>
        );         
    }
    // console.log("post that ran unlike button");
    // console.log(post);
    return (
        <div className="heart">
            <a className="icon-properties"><i className="far fa-heart fa-regular" onClick={likePost}></i></a>
        </div>
    ); 

}
import React from 'react';

export default function LikeButton({post, requeryPost, token}) { 
   //: `class="fas fa-heart liked_post"`}

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

        // console.log("likePost");
        // console.log(data);
        requeryPost();
    }

    async function unLikePost(){
        // console.log("likeID");
        // console.log(likeID);
        // console.log("post");
        // console.log(post);
        console.log(post.current_user_like_id);
        const endpoint = "https://photo-app-secured.herokuapp.com/api/posts/likes/" + post.current_user_like_id;
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
    
    // console.log("All posts");
    // console.log(post);



    if(post.current_user_like_id != null){
        // console.log("post that has like button");
        // console.log(post);
        console.log("post like ID");
        console.log(post.current_user_like_id);
        console.log("unLikePost call");
        console.log(unLikePost);
        return (
            <div className="heart">
                <a className="icon-properties"><i className="far fa-heart fa-regular" onClick={unLikePost}></i></a>
            </div>
        ); 
    }
    console.log("post that has unlike button");
    console.log(post);
    console.log(unLikePost);
    
    return (
        <div className="heart">
            <a className="icon-properties"><i className="fas fa-heart liked_post" onClick={likePost}></i></a>
        </div>
    );        

}
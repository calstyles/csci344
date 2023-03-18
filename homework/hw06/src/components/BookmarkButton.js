import React from 'react';

export default function BookmarkButton({post, currentBookmarkId, requeryPost, token}) { 
    async function bookmarkPost(){
        const endpoint = "https://photo-app-secured.herokuapp.com/api/bookmarks";
        const postData = {
            "post_id": post.id
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

    async function unBookmarkPost(){
        const endpoint = "https://photo-app-secured.herokuapp.com/api/bookmarks/" + currentBookmarkId;
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

    if (currentBookmarkId != null) {
        return(
            <div className="bookmark">
                <button className="icon-properties" onClick={unBookmarkPost}><i className="fas fa-bookmark"></i></button>
            </div>
        );
    }
    return(
        <div className="bookmark">
            <button className="icon-properties" onClick={bookmarkPost}><i className="far fa-bookmark"></i></button>
        </div>
    );
}
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
        //     return `<div class="bookmark" id="bookmark_${currentPost.id}"><button class="icon-properties" onclick="deleteBookmark(${currentPost.id}, ${currentPost.current_user_bookmark_id}, ${i}, ${length})" aria-checked="true" aria-label="bookmark ${i + 1} of ${length}"><i class="fas fa-bookmark"></i></button></div>`;
        // }
        // return `<div class="bookmark" id="bookmark_${currentPost.id}"><button class="icon-properties" onclick="createBookmark(${currentPost.id}, ${i}, ${length})" aria-checked="false" aria-label="bookmark ${i + 1} of ${length}"><i class="far fa-bookmark"></i></button></div>`;

    if (currentBookmarkId != null) {
        console.log("like has been called");
        return(
            <div className="bookmark">
                <button className="icon-properties"><i class="fas fa-bookmark" onClick={unBookmarkPost}></i></button>
            </div>
        );
    }
    return(
        <div class="bookmark">
            <button class="icon-properties"><i class="far fa-bookmark" onClick={bookmarkPost}></i></button>
        </div>
    );
}
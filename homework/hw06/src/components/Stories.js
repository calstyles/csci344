import React from 'react';
import {getHeaders} from '../utils';
import { useState, useEffect } from "react";

export default function Stories({token}) { 
    const[stories, setStories] = useState(null);

    useEffect(() => {
        async function fetchStories(){
                const response = await fetch('https://photo-app-secured.herokuapp.com/api/stories', {
                    headers: getHeaders(token)
                });
                const data = await response.json();
                setStories(data);
        }
        fetchStories();
    }, [token]);

    if (stories==null) {
        return '';
    }
    return (
        stories.map(story=>{
            return (
                    <div className='story-panel'>
                        <div><img src={story.user.image_url} className="story-image"></img></div>
                        <a className="story-username">{story.user.username}</a>
                    </div>
            )
        })
    ); 
}
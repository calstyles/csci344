import React from 'react';
import {getHeaders} from '../utils';
import { useState, useEffect } from "react";

export default function Profile({token}) { 
    const[profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile(){
                const response = await fetch('https://photo-app-secured.herokuapp.com/api/profile', {
                    headers: getHeaders(token)
                });
                const data = await response.json();
                setProfile(data);
        }
        fetchProfile();
    }, [token]);

    if (profile==null) {
        return '';
    }else{
        return (
            <div id="profile" className="profile">
                <img src={profile.image_url} key={"profile_image_" + profile.id} className="profile"></img>
                <div className='current-user'>{profile.username}</div>
            </div>
        );     
    }
}
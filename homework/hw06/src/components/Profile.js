import React from 'react';
import {getHeaders} from '../utils';
import { useState, useEffect } from "react";

export default function Profile(token) { 
    const[profile, setProfile] = useState(null);

    useEffect(() => {
        console.log(profile);
        async function fetchProfile(){
                const response = await fetch('/api/profile', {
                    headers: getHeaders(token)
                });
                console.log("response");
                console.log(response);
                const data = await response.json();
                console.log("data");
                console.log(data);
                setProfile(data);
            
        }
        fetchProfile();
    }, [token]);
    console.log(profile);
    return (
        <div>
            {profile}
        </div>
    );     
}
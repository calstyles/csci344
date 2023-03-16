import React from 'react';
import {getHeaders} from '../utils';
import { useState, useEffect } from "react";

export default function Profile(token) { 
    const[profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile(){
            const response = await fetch("https://photo-app-secured.herokuapp.com/api/profile/", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            console.log(response);
            const data = await response.json();
            setProfile(data);
        }
        fetchProfile();
    }, [token]);

    return (
        <div>
            {profile}
        </div>
    );     
}
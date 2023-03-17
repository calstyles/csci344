import React from 'react';
import {getHeaders} from '../utils';
import { useState, useEffect } from "react";

export default function Post({suggestion, token}) { 

    async function requeryPost(){
        const response = await fetch('/api/suggestions', {
            headers: getHeaders(token)
        });
        const data = await response.json();
    }

    return(
        <div></div>
    );
}
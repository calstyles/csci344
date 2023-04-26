import React from 'react';
import Suggestion from './Suggestion';
import {getHeaders} from '../utils';
import { useState, useEffect } from "react";

export default function Suggestions({token}) { 

    const [suggestions, setSuggestions] = useState(null); 

    useEffect(() => {
        async function fetchSuggestions() {
            const response = await fetch('/api/suggestions', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setSuggestions(data);
        }
        fetchSuggestions();
    }, [token]);

    if (!suggestions) {
        return '';
    }
    return (
        suggestions.map((suggestion, index )=> {
            return (
                <Suggestion suggestion={suggestion} token={token} index={index + 1} length={suggestions.length} key={"suggestion_" + suggestion.id}/>
            )
        })
    );
}
import React from 'react';
import NavLinks from './components/NavLinks';
import Profile from './components/Profile';
import Stories from './components/Stories';
import Suggestions from './components/Suggestions';
import Posts from './components/Posts';

export default function App ({token}) { 
    console.log('access token:', token);
    
    return (
        <div>
            
            {/* Navbar */}
            <nav className="main-nav">
                <h1>Photo App</h1>
                <NavLinks token={token} />
            </nav>
           
           {/* Right Panel */}
            <aside>
                <header>
                    Profile Goes Here...
                    <Profile />
                </header>
                <div className="suggestions">
                    <div>
                        Suggestions go here...
                        <Suggestions />
                    </div>
                </div>
            </aside>

            <main>

                {/* Stories */}
                <header className="stories">
                    Stories go here...
                    <Stories />
                </header>

                {/* Posts */}
                <div id="posts">
                    Posts go here...
                    <Posts />
                </div>

            </main>

        </div>
    );
    
}
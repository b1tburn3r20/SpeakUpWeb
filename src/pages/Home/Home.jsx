import React from 'react';
import './Home.css'; // Import your custom stylesheet for the Home page

export default function Home() {
    return (
        <div className="home-container">
            <section className="hero-section">
                <h1 className="hero-heading">Welcome to SpeakUp</h1>
                <p className="mission-statement">
                    SpeakUp is an empowering platform that keeps you informed on bills being passed in office
                    and allows you to directly engage with legislators, making your voice heard in the legislative process.
                    Join SpeakUp and be an active participant in shaping the laws that impact your community and beyond.
                </p>
            </section>
            {/* Add more sections or components for your home page content */}
        </div>
    );
}
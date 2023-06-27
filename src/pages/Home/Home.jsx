import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div className="home-container" data-aos="fade-down" data-aos-duration="1500">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-heading">Welcome to SpeakUp: Your Voice, Amplified!</h1>
                    <p className="mission-statement">
                        Navigate the legislative landscape with SpeakUp. Stay informed about bills and policy changes, engage with lawmakers, and be part of the conversation shaping your community and beyond. Are you ready to make an impact?
                    </p>
                </div>
                <div className="cta-section">
                    <h2 className="cta-heading">Why Wait? Start Making a Difference Today!</h2>
                    <p className="cta-text">
                        Join SpeakUp and unlock a world of possibilities:
                    </p>
                    <ul className="cta-list">
                        <li><strong>Stay Informed:</strong> Gain insight into bills and policies affecting your community</li>
                        <li><strong>Be Proactive:</strong> Contact your representatives directly and take action</li>
                        <li><strong>Build Connections:</strong> Engage in meaningful discussions and network with like-minded individuals</li>
                        <li><strong>Impact Legislation:</strong> Your voice can guide the legislative process</li>
                    </ul>
                    <Link to="/signup" className="cta-button">Take The First Step with SpeakUp</Link>
                </div>
            </section>

            <section className="features-section">
                <h2 className="features-heading">Features</h2>
                <ul className="features-list">
                    <li>Real-time legislative updates</li>
                    <li>Easy to navigate interface</li>
                    <li>Direct messaging to your legislators</li>
                    <li>In-depth discussions with your community</li>
                </ul>
            </section>
            <section className="testimonial-section">
                <h2 className="testimonial-heading">What Our Users Say</h2>
                <div className="testimonial-card">
                    <p className="testimonial-text">
                        "SpeakUp has transformed how I interact with the legislative process. I feel empowered and informed like never before."
                    </p>
                    <p className="testimonial-author">- John Doe, active user</p>
                </div>
            </section>
            <section className="join-section">
                <h2 className="join-heading">Join the SpeakUp community today!</h2>
                <Link to="/signup" className="cta-button">Join Now</Link>
            </section>
        </div>
    );
}

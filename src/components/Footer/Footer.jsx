// src/components/Footer/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer" data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget mauris mauris.
                        Donec vel elit id dui efficitur consectetur.
                    </p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/bills">Bills</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>
                        123 Main Street, City,
                        <br />
                        State, ZIP
                        <br />
                        info@example.com
                        <br />
                        (123) 456-7890
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} SpeakUp All Rights Reserved.</p>
            </div>
        </footer>
    );
}

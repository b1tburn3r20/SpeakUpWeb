// src/components/Card/Card.js

import './Card.css';

export default function Card({ name, summary }) {
    return (
        <div className="card">
            <h2 className="card-name">{name}</h2>
            <p className="card-summary">{summary}</p>
        </div>
    );
}

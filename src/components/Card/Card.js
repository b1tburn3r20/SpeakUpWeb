import './Card.css';

export default function Card({ bill_name, summary, tags, helps, hurts, showHelpsAndHurts = true, userVote }) {
    const cardClasses = `card ${userVote === 'veto' ? 'userVetoed' : ''}`;

    return (
        <div className={cardClasses} data-aos="zoom-in">
            {userVote && <div className='alreadyVoted'>You voted {userVote} on this Bill</div>}
            <h2 className="card-name">{bill_name}</h2>
            <p className="card-summary">{summary}</p>
            <div className="card-tags">
                {tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                ))}
            </div>
            {showHelpsAndHurts && (
                <div className="card-helps-hurts">
                    <div className="grouping-cards grouping-cards-negative">
                        <div className="grouping-cards-header">Negatives</div>
                        <div className="card-helps-hurts-content">
                            <p className="card-hurts">{hurts}</p>
                        </div>
                    </div>
                    <div className="grouping-cards grouping-cards-positive">
                        <div className="grouping-cards-header">Positives</div>
                        <div className="card-helps-hurts-content">
                            <p className="card-helps">{helps}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

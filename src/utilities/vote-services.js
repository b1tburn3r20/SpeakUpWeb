// utilities/votes-service.js

export async function castVote(userId, billId, decision) {
    const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, billId, decision }),
    });
    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Failed to cast vote');
    }
}
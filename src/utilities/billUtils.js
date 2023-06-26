export function getRandomBillId(billsData) {
    const randomIndex = Math.floor(Math.random() * billsData.length);
    return billsData[randomIndex]._id;
}

export function handleClickVote(bills, setRandomBillId) {
    const newRandomBillId = getRandomBillId(bills);
    setRandomBillId(newRandomBillId);
}

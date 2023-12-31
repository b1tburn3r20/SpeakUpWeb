import sendRequest from "./send-request";
import { getToken } from './users-service';

const BASE_URL = "/api/bills"

export function getRandomBillId(billsData) {
    const randomIndex = Math.floor(Math.random() * billsData.length);
    return billsData[randomIndex]._id;
}

export function handleClickVote(bills, setRandomBillId) {
    const newRandomBillId = getRandomBillId(bills);
    setRandomBillId(newRandomBillId);
}

export function getAllBills() {
    return sendRequest(`${BASE_URL}/upcoming-bills`, 'GET')
}
export function getBillStats(billId) {
    return sendRequest(`${BASE_URL}/${billId}`, 'GET')
}
export function getBillsStats() {
    return sendRequest(`${BASE_URL}/bill-statistics`, 'GET');
}
export function getUserBills() {
    return sendRequest(`${BASE_URL}/my-votes`, 'GET')
}
export function getAllBillsWithUserVotes(userId) {
    return sendRequest(`${BASE_URL}/upcoming-bills?userId=${userId}`, 'GET')
}
export function getBillUserStats(billId) {
    return sendRequest(`${BASE_URL}/${billId}/users/count`, 'GET')
}

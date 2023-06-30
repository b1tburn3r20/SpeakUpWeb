import { get } from "mongoose";
import sendRequest from "./send-request";


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
    return sendRequest(BASE_URL + '/upcoming-bills', 'GET')
}
export function getUserBills() {
    return sendRequest('/api/user/my-votes', 'GET')
}



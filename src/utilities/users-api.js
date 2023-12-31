import sendRequest from './send-request';
const BASE_URL = '/api/users';

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export function profilePic(formData) {
  return sendRequest(`${BASE_URL}/profilepic`, 'POST', formData, true)
}
export function deleteUser() {
  return sendRequest(`${BASE_URL}/profile`, 'DELETE');
}
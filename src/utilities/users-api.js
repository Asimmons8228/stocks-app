import sendRequest from "./send-request";

// The base URL for user-related API endpoints
const BASE_URL = '/api/users';

/**
 * Sends a POST request to the user signup endpoint.
 * @param {Object} userData - User data for signup.
 * @returns {Promise} - A Promise that resolves to the server response.
 */
export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

/**
 * Sends a POST request to the user login endpoint.
 * @param {Object} credentials - User login credentials.
 * @returns {Promise} - A Promise that resolves to the server response.
 */
export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

/**
 * Sends a request to check the validity of the user token.
 * @returns {Promise} - A Promise that resolves to the server response.
 */
export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
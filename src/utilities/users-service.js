import * as usersAPI from './users-api';

/**
 * Signs up a new user by calling the signUp function from the users API,
 * stores the obtained token in local storage, and returns the user data.
 * @param {Object} userData - User data for signup.
 * @returns {Object} - User data.
 */
export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem('token', token);
  return getUser();
}

/**
 * Logs in a user by calling the login function from the users API,
 * stores the obtained token in local storage, and returns the user data.
 * @param {Object} credentials - User login credentials.
 * @returns {Object} - User data.
 */
export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

/**
 * Logs out the user by removing the token from local storage.
 */
export function logOut() {
  localStorage.removeItem('token');
}

/**
 * Retrieves the token from local storage, decodes it, and checks if it is still valid.
 * If valid, returns the token; otherwise, removes the token from local storage and returns null.
 * @returns {string|null} - User token.
 */
export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

/**
 * Retrieves the user data from the decoded token.
 * @returns {Object|null} - User data.
 */
export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

/**
 * Checks the validity of the user token by calling the checkToken function from the users API.
 * @returns {Promise<Date>} - A Promise that resolves to the expiration date of the token.
 */
export function checkToken() {
  return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr));
}

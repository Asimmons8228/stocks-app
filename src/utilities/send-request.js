/**
 * Sends an HTTP request to the specified URL with optional method and payload.
 * @param {string} url - The URL to send the request to.
 * @param {string} method - The HTTP method for the request (default is 'GET').
 * @param {Object} payload - The payload to include in the request body for methods like POST.
 * @returns {Promise} - A Promise that resolves to the parsed JSON response if the request is successful.
 * @throws {Error} - Throws an error if the response status is not okay.
 */
export default async function sendRequest(url, method = 'GET', payload = null) {
  // Create the basic options object with the specified method
  const options = { method };

  // If a payload is provided, set headers and add the payload to the request body
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }

  // Retrieve the user token from local storage
  const token = getToken();

  // If a token exists, add the Authorization header to the request
  if (token) {
    options.headers ||= {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  // Send the fetch request to the specified URL with the configured options
  const res = await fetch(url, options);

  // Check if the response status is okay; throw an error if not
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}

import sendRequest from "./sendRequest";

const BASE_URL = '/api/auth';

export async function signUp(userData) {
  const res = await sendRequest(BASE_URL + '/signup', 'POST', userData);
  const token = typeof res === 'string' ? res : res.token;    console.log("Token received:", token); 
  localStorage.setItem('token', token);
  console.log("JWT format check:", token.split('.').length);
  return getUser();
}

export async function logIn(credentials) {
  const token = await sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  localStorage.setItem('token', token);
  console.log("JWT format check:", token.split('.').length);
  return getUser();
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
      
    }
    return token;
    
  } catch (err) {
    console.error("Invalid token in localStorage", err);
    localStorage.removeItem('token');
    return null;
  }
}

export function getUser() {
  const token = getToken();
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split('.')[1])).user;
  } catch (err) {
    console.error("Failed to decode user from token", err);
    return null;
  }
}

export function logOut() {
  localStorage.removeItem('token');
}
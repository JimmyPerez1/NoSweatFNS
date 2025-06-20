import { getToken } from './authService';

export default async function sendRequest(
  url,
  method = 'GET',
  payload = null
) {
  const options = { method };

  if (payload instanceof FormData) {
    options.body = payload;
  } else if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {

    options.headers ||= {};

    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);

  if (res.ok) return res.json();

  const err = await res.json();

  throw new Error(err.message);
}
import sendRequest from './sendRequest';
const BASE_URL = '/api/servicerequests';

export function createRequest(data) {
  return sendRequest(BASE_URL, 'POST', data);
}

export function getRequests() {
  return sendRequest(BASE_URL);
}

export function getRequestById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function updateRequest(id, requestData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', requestData);
}

export function deleteRequest(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}
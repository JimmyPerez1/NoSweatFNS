import sendRequest from './sendRequest';

const BASE_URL = '/api/profile';

export async function getById(profileId) {
  return sendRequest(`${BASE_URL}/${profileId}`);
}

export async function updateProfile(profileId, data) {
  return sendRequest(`${BASE_URL}/${profileId}`, 'PUT', data);
}

export function getAllProfiles() {
  return sendRequest(`${BASE_URL}`);
}

export function deleteProfile(profileId) {
  return sendRequest(`${BASE_URL}/${profileId}`, 'DELETE');
}
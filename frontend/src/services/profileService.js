import sendRequest from './sendRequest';

const BASE_URL = '/api/profile';

export async function getById(profileId) {
  return sendRequest(`${BASE_URL}/${profileId}`);
}
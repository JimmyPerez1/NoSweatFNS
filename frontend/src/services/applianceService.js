import sendRequest from './sendRequest';
const BASE_URL = '/api/appliances';

export function getAppliances() {
  return sendRequest(BASE_URL);
}
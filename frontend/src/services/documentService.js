import { supabase } from './supabase';
import sendRequest from '../services/sendRequest'

const BASE_URL= '/api/documents'

export async function create(documentData) {
  return sendRequest(BASE_URL, 'POST', documentData);
}

export async function uploadDocument(file, folder = 'misc', docType, workOrderNumber) {
  const ext = file.name.split('.').pop();
  const safeDocType = docType.replace(/\s+/g, '');
  const fileName = `${safeDocType}-WO-${workOrderNumber}.${ext}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('documents')
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const { data: publicUrlData } = supabase
    .storage
    .from('documents')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

export async function handleUpload(e, docType, workOrderNumber, profileId) {
  const file = e.target.files[0];
  const folder = docType.toLowerCase() + 's';

  const url = await uploadDocument(file, folder, docType, workOrderNumber);

  await create({
    type: docType,
    url,
    profile: profileId,
  });
}
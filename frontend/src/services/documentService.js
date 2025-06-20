import { supabase } from "./supabase";
import sendRequest from "../services/sendRequest";

const BASE_URL = "/api/documents";

export async function signIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "nosweatfns@gmail.com",
    password: "123456",
  });

  if (error) {
    console.error("Login failed:", error.message);
    alert("Login failed.");
  } else {
    console.log("Signed in as:", data.user.email);
  }
}

export async function create(documentData) {
  return sendRequest(BASE_URL, "POST", documentData);
}

export async function uploadDocument(file, folder = "misc", docType, workOrderNumber){
  const ext = file.name.split(".").pop();
  const safeDocType = docType.replace(/\s+/g, "");
  const fileName = `${safeDocType}-${workOrderNumber}.${ext}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from("nosweat-documents")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from("nosweat-documents")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

export async function handleUpload(e, docType, workOrderNumber, profileId) {
  const file = e.target.files[0];
  const folder = docType.toLowerCase() + "s";

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    alert("You must be logged in to upload documents.");
    return;
  }

  try {
    const url = await uploadDocument(file, folder, docType, workOrderNumber);

    await create({
      name: file.name,
      type: docType,
      url,
      profile: profileId,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    alert("There was a problem uploading your file.");
  }
}

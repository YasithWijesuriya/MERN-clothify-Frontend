const BASE_URL = "http://localhost:3000"; // Add this at the top

export const putGalleryImage = async ({file}) => {
  try {
    // First check if server is available
    const res = await fetch(`${BASE_URL}/api/gallery/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({fileType: file.type}),
    });

    // Check if response is ok and is JSON
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Server response:', errorText);
      throw new Error(`Server error: ${res.status}`);
    }

    // Parse JSON response
    const data = await res.json();
    console.log("Server response:", data);

    if (!data.url || !data.publicUrl) {
      throw new Error("Invalid server response format");
    }

    const {url, publicUrl} = data;

    // Ensure URLs are absolute
    const fullPublicUrl = publicUrl.startsWith('http') 
      ? publicUrl 
      : `${BASE_URL}${publicUrl}`;

    const fullUploadUrl = url.startsWith('http') 
      ? url 
      : `${BASE_URL}${url}`;

    // Upload to the signed URL
    const upload = await fetch(fullUploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!upload.ok) {
      throw new Error(`Upload failed with status: ${upload.status}`);
    }

    return fullPublicUrl;
  } catch (error) {
    console.error("Detailed upload error:", error);
    throw new Error(`Gallery image upload failed: ${error.message}`);
  }
};
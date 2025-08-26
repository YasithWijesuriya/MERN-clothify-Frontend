const BASE_URL = import.meta.env.VITE_API_URL; // Add this at the top

// Safely build API URLs without duplicating segments like "/api/api"
function buildApiUrl(path) {
  const base = BASE_URL || "";
  const hasApiInBase = /\/(api)(\/|$)/.test(new URL(base, base.startsWith("http") ? undefined : "http://local").pathname);
  const cleanedBase = base.replace(/\/$/, "");
  const cleanedPath = path.replace(/^\//, "");
  // If base already contains /api, don't prepend another /api
  if (hasApiInBase && cleanedPath.startsWith("api/")) {
    return `${cleanedBase}/${cleanedPath.replace(/^api\//, "")}`;
  }
  return `${cleanedBase}/${cleanedPath}`;
}

export const putGalleryImage = async ({file}) => {
  try {
    const endpoint = buildApiUrl("/api/gallery/images");

    // First check if server is available
    const res = await fetch(endpoint, {
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
      : `${BASE_URL.replace(/\/$/, '')}${publicUrl.startsWith('/') ? '' : '/'}${publicUrl}`;

    const fullUploadUrl = url.startsWith('http') 
      ? url 
      : `${BASE_URL.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;

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
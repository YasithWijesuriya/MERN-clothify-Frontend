export const putImage = async ({file})=>{
  const res = await fetch(`http://localhost:3000/api/products/images`, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({fileType: file.type}),
  });

  const data = await res.json();
  console.log("server response", data);
  const {url,publicUrl} = data;
  /*const url = data.url;
    const publicUrl = data.publicUrl;
    url සහ publicUrl එක destructuring කරන shorthand එක 
    extract කරපු විදිය මෙහෙමයි.
    */
  console.log(url, publicUrl);

  const upload = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
  if (!upload.ok) {
    throw new Error("File upload failed");
  }
  return publicUrl;
};
import SHA1 from 'crypto-js/sha1';

export const uploadToCloudinary = async (file) => {
  try {
    let data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "LXS_Image_Files_Preset");
    data.append("cloud_name", "dbrfeb7mg");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbrfeb7mg/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadedImageURL = res.json();
    return uploadedImageURL;
  } catch (error) {
    console.log("Cloudinary Upload Error:", error.message);
  }
};

export const deleteFromCloudinary = async (public_id) => {
  try {
    const timestamp = Math.floor(new Date().getTime() / 1000);

    const signature = SHA1(`public_id=${public_id}&timestamp=${timestamp}${import.meta.env.VITE_CLOUDINARY_SECRET_KEY}`).toString();

    const body = new FormData();
    body.append("public_id", public_id);
    body.append("timestamp", timestamp);
    body.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    body.append("signature", signature);

    await fetch(
      "https://api.cloudinary.com/v1_1/dbrfeb7mg/image/destroy",
      {
        method: "POST",
        body: body,
      }
    );

  } catch (error) {
    console.log("Cloudinary Delete Error:", error.message);
  }
};

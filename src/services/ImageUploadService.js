import axios from "axios";


async function ImageUploadService(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDE_NAME);
    const url = import.meta.env.VITE_CLOUDINARY_URL;

    try {
       const response = await axios.post(url,data);
       return response.data.url;
    } catch (error) {
        throw error;
    }

}

export default ImageUploadService
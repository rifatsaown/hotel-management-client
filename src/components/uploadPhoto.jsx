import axios from "axios";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Key;

const uploadPhoto = async (file) => {
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const formData = new FormData();
    formData.append("image", file);

   return await axios.post(img_hosting_url, formData)
}

export default uploadPhoto;
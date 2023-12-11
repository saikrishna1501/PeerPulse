import axios from "axios";

const cloudName = "domq1wmfd";
const uploadPreset = "kpwuzbzl";

const uploadFile = async (file: any, targetFolder: string) => {
    try {
        const timestamp = new Date().getTime();
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          formData,
          {
            params: {
                upload_preset: uploadPreset,
                folder: targetFolder,
                public_id: file.name + timestamp
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          }
        );
    
        console.log('Uploaded:', response.data);
        return response.data.url;
      } catch (error) {
        console.error('Upload failed:', JSON.stringify(error));
      }
}

export default uploadFile;
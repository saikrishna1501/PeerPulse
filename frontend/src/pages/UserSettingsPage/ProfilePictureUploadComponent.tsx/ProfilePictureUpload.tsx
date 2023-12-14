import { useState } from "react";
import defaultProfilePictureLink from '../../../assets/images/profile-picture.png';
import { useTheme } from '@mui/material/styles';
import uploadFile from "../../../services/ImageUploadService";

type Props = {
    src: string | undefined,
    formUpdateHandler: any,
    name: string
}

function ProfilePictureUpload({ src, formUpdateHandler, name }: Props) {
    const [isHovered, setIsHovered] = useState(false);
   
    src = src ? `url(${src})` : `url(${defaultProfilePictureLink})`;
    let profilePictureSx = {
        borderRadius: "50%",
        width: 100, 
        height: 100, 
        backgroundImage: src,
        backgroundSize: "cover",
        cursor: "pointer",
        // border: `3px solid ${theme.palette.primary.main}`,
        border: `2px solid #f2f2f2`,
        boxShadow: isHovered ? `0 0 10px rgba(255, 255, 255, 0.7)` : 'none',
        transition: 'transform 0.3s ease', // Adding a smooth transition
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    }

    const onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if(file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const isAllowedType = allowedTypes.includes(file.type);
            if(isAllowedType) {
                const url = await uploadFile(file, "profile-pictures");
                formUpdateHandler(url);
            }
            else {
                alert("file must be of type " + allowedTypes);
            }
        }
    }

    return (
        <>
            <input
                id="file-upload-button"
                type="file"
                style={{display: "none"}}
                onChange={onChangeHandler}
                name={name}
                accept=".jpg,.png,.jpeg"
            />
            <label htmlFor="file-upload-button" 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
            <div
                style={profilePictureSx}
            />
                {/* <Button color="primary" variant="outlined" sx={profilePictureSx}></Button> */}
            </label>
        </>
    )
}

export default ProfilePictureUpload;
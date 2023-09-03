import { updateProfile } from "firebase/auth";

const updateNamePhoto = (user , displayName , photoURL) => {
    updateProfile(user,{
    displayName,
    photoURL
  });
}

export default updateNamePhoto;
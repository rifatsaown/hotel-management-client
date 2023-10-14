import { updateProfile } from "firebase/auth";

const updateNamePhoto = (user , displayName , photoURL) => {
    return updateProfile(user,{
    displayName,
    photoURL
  });
}

export default updateNamePhoto;
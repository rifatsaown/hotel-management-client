import { toast } from "react-hot-toast";

const handleErrorLogin = (error, type) => {
  if (error.code === "auth/wrong-password") {
    toast.error("Wrong password");
  } else if (error.code === "auth/user-not-found") {
    toast.error("User not found");
  } else if (error.code === "auth/email-already-in-use") {
    toast.error("Email is already registerd");
  } else {
    toast.error(type + " failed");
  }
};

export default handleErrorLogin;

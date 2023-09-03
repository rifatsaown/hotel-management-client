import { toast } from "react-hot-toast";

const handleErrorLogin = (error) => {
  if (error.code === "auth/wrong-password") {
    toast.error("Wrong password");
  } else if (error.code === "auth/configuration-not-found") {
    toast.error("User not found");
  } else {
    toast.error("Login failed");
  }
};

export default handleErrorLogin;

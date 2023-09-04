const addUserToDb = async (name, email) => {
  const user = {
    name,
    email,
  };
  return await fetch("https://galaxies-hotel.onrender.com/user/addUserToDb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${localStorage.getItem("JWT-token")}`,
    },
    body: JSON.stringify(user),
  });
};

export default addUserToDb;

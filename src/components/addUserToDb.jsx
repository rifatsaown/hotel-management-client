const addUserToDb = async (name, email) => {
  const user = {
    name,
    email,
  };
  return await fetch("http://localhost:5000/user/addUserToDb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${localStorage.getItem("JWT-token")}`,
    },
    body: JSON.stringify(user),
  })
};

export default addUserToDb;
import jwt from "jsonwebtoken";

const genToken = async (id) => {
  return await jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });
};

export default genToken;

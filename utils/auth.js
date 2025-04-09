import bcrypt from "bcryptjs";
const generateHashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 12);
  return hashPassword;
};

const verifyPassword = async (password, hashPassword) => {
  const isValid = await bcrypt.compare(password, hashPassword);
  return isValid;
};

export { generateHashPassword, verifyPassword };

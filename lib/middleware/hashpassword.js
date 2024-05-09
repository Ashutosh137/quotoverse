import bcrypt from "bcrypt";

export async function hashpassword(password) {
  return await bcrypt.hashSync(password, 10);
}

export async function comparePassword(password, hash) {
  return await bcrypt.compareSync(password, hash);
}

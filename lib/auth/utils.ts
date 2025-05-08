import bcrypt from "bcrypt";

export async function verifyPassword(input: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(input, hashed);
}
import bcrypt from 'bcrypt';
import { type } from 'os';

type hashReturn = Promise<string> | void;

export const hashPassword = async (
  plainPassword: string,
): Promise<hashReturn> => {
  const hashPassword = await bcrypt.hash(plainPassword, 12);
  return hashPassword;
};

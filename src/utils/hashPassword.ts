import * as bcrypt from "bcrypt";

type hashReturn = Promise<string> | void;

export const hashPassword = async (plainPassword: string): Promise<hashReturn> => {
  const hashPassword = await bcrypt.hash(plainPassword, 12);

  return hashPassword;
};

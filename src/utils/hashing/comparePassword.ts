import * as bcrypt from 'bcrypt';

export const comparePassword = async (
  incomingPassword: string,
  existingPassword: string,
): Promise<boolean> => {
  const result = await bcrypt.compare(incomingPassword, existingPassword);

  return result;
};

export type User = {
  _id: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  coverProfilePictures?: string[];
  isTwoFactorEnabled?: boolean;
  confirmEmail?: string;
};
